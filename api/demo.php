<?php
// Demo form -> Resend, for Hostinger. Vercel uses demo.js; keep the two in step.
// Settings live in resend-config.php, one level ABOVE public_html so it is never served:
//   <?php return ['api_key' => '...', 'from' => 'Worldie <hello@yourdomain.com>', 'to' => 'you@yourdomain.com'];

header('Content-Type: application/json');

function reply(int $status, bool $ok): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, false);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originUrl = parse_url($origin);
    $originHost = ($originUrl['host'] ?? '') . (isset($originUrl['port']) ? ':' . $originUrl['port'] : '');
    if ($originHost !== ($_SERVER['HTTP_HOST'] ?? '')) reply(403, false);
}

$body = json_decode(file_get_contents('php://input', false, null, 0, 20000), true);
if (!is_array($body)) reply(400, false);

// Honeypot: real visitors never fill this hidden field, so pretend it worked
if (!empty($body['website'])) reply(200, true);

$limits = ['name' => 120, 'email' => 200, 'business' => 200, 'type' => 120, 'locations' => 10, 'country' => 100, 'systems' => 500, 'help' => 4000];
$labels = [
    'name' => 'Name',
    'email' => 'Work email',
    'business' => 'Business name',
    'type' => 'Business type',
    'locations' => 'Number of locations',
    'country' => 'Country',
    'systems' => 'Current systems or channels',
    'help' => 'What would you like Worldie to help with?',
];
$required = ['name', 'email', 'business', 'type', 'locations', 'country'];

$data = [];
foreach ($limits as $key => $limit) {
    $value = isset($body[$key]) && is_string($body[$key]) ? trim($body[$key]) : '';
    if (mb_strlen($value) > $limit) reply(400, false);
    $data[$key] = $value;
}
foreach ($required as $key) {
    if ($data[$key] === '') reply(400, false);
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) reply(400, false);

$configPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/resend-config.php';
$config = is_file($configPath) ? include $configPath : null;
if (!is_array($config) || empty($config['api_key']) || empty($config['from']) || empty($config['to'])) {
    error_log('Demo form: resend-config.php is missing or incomplete');
    reply(500, false);
}

$text = [];
$html = '';
foreach ($labels as $key => $label) {
    if ($data[$key] === '') continue;
    $text[] = $label . ': ' . $data[$key];
    $html .= '<p><strong>' . $label . '</strong><br>' . nl2br(htmlspecialchars($data[$key], ENT_QUOTES, 'UTF-8')) . '</p>';
}

$payload = json_encode([
    'from' => $config['from'],
    'to' => array_map('trim', explode(',', $config['to'])),
    'reply_to' => $data['email'],
    'subject' => preg_replace('/[\r\n]+/', ' ', 'New demo request: ' . $data['business']),
    'text' => implode("\n\n", $text),
    'html' => $html,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $config['api_key'], 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

if ($status < 200 || $status >= 300) {
    error_log('Demo form: Resend returned ' . $status);
    reply(502, false);
}
reply(200, true);
