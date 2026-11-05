// Demo form -> Resend, for Vercel. Hostinger uses demo.php; keep the two in step.
// Needs these environment variables: RESEND_API_KEY, RESEND_FROM, RESEND_TO
const LIMITS = { name: 120, email: 200, business: 200, type: 120, locations: 10, country: 100, systems: 500, help: 4000 };
const LABELS = {
  name: "Name",
  email: "Work email",
  business: "Business name",
  type: "Business type",
  locations: "Number of locations",
  country: "Country",
  systems: "Current systems or channels",
  help: "What would you like Worldie to help with?",
};
const REQUIRED = ["name", "email", "business", "type", "locations", "country"];

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (origin) {
    let originHost = "";
    try { originHost = new URL(origin).host; } catch {}
    if (originHost !== host) return res.status(403).json({ ok: false });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot: real visitors never fill this hidden field, so pretend it worked
  if (body.website) return res.status(200).json({ ok: true });

  const data = {};
  for (const key of Object.keys(LIMITS)) {
    const value = typeof body[key] === "string" ? body[key].trim() : "";
    if (value.length > LIMITS[key]) return res.status(400).json({ ok: false });
    data[key] = value;
  }
  if (REQUIRED.some((key) => !data[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ ok: false });
  }

  const { RESEND_API_KEY, RESEND_FROM, RESEND_TO } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
    console.error("Demo form: Resend environment variables are not set");
    return res.status(500).json({ ok: false });
  }

  const filled = Object.keys(LABELS).filter((key) => data[key]);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: RESEND_TO.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `New demo request: ${data.business}`.replace(/[\r\n]+/g, " "),
      text: filled.map((key) => `${LABELS[key]}: ${data[key]}`).join("\n\n"),
      html: filled
        .map((key) => `<p><strong>${LABELS[key]}</strong><br>${escapeHtml(data[key]).replace(/\n/g, "<br>")}</p>`)
        .join(""),
    }),
  }).catch((err) => {
    console.error("Demo form: could not reach Resend", err.message);
    return null;
  });

  if (!response || !response.ok) {
    if (response) console.error("Demo form: Resend returned", response.status);
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
};
