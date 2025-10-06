import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const { phone, firstName } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Missing phone number" });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Congrats ${firstName || ""}! You made the cut—you're one of the first 3,000 to get early access to Eclipse, launching exclusively on the App Store in Chicago this Fall. We'll text you key updates and the download link as soon as we go live!`,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: `+${phone}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}