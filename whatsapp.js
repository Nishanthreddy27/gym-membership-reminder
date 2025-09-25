const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(to, message) {
    try {
        const msg = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio Sandbox number
            to: `whatsapp:${to}`,
            body: message
        });
        return msg.sid;
    } catch (err) {
        console.error('WhatsApp Error:', err);
        return null;
    }
}

module.exports = sendWhatsAppMessage;
