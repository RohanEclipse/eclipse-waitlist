import { adminDb } from "../../../firebaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

    // Parse code from query - handle malformed query strings where = is encoded as %3D
    let code = req.query.code;
    
    // If query parsing failed (Next.js has issues when = is URL encoded as %3D)
    if (!code && req.url) {
      try {
        // Decode the URL first, then parse
        const decodedUrl = decodeURIComponent(req.url);
        const urlObj = new URL(decodedUrl, `http://${req.headers.host || 'localhost'}`);
        code = urlObj.searchParams.get('code');
      } catch (e) {
        // Fallback: regex parse on decoded URL
        const decodedUrl = decodeURIComponent(req.url);
        const urlMatch = decodedUrl.match(/[?&]code=([^&]*)/);
        if (urlMatch) {
          code = urlMatch[1];
        }
      }
    }
    
    code = String(code || "").trim().toUpperCase();
    if (!code) return res.status(200).json({ valid: false, usesRemaining: 0 });

    const snap = await adminDb.collection("invites").doc(code).get();
    if (!snap.exists) return res.status(200).json({ valid: false, usesRemaining: 0 });

    const data = snap.data() || {};
    const enabled = !!data.enabled;
    const usesRemaining = Number(data.usesRemaining || 0);

    return res.status(200).json({ valid: enabled && usesRemaining > 0, usesRemaining });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ valid: false, usesRemaining: 0 });
  }
}
