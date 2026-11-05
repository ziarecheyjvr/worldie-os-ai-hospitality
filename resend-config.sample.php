<?php
// Sample only. Hostinger setup:
// 1. Copy this file to resend-config.php, one level ABOVE public_html.
// 2. Replace the placeholder values below.
// Never put the real key in this sample or commit it to Git.
// Vercel doesn't use this file: set RESEND_API_KEY, RESEND_FROM and RESEND_TO there instead.
return [
    'api_key' => 're_your_api_key_here',
    'from' => 'Worldie <hello@yourdomain.com>', // must be on your verified Resend domain
    'to' => 'you@yourdomain.com', // separate several inboxes with commas
];
