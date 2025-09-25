const cron = require('node-cron');
const Member = require('../models/Member');
const Reminder = require('../models/Reminder');
const sendWhatsAppMessage = require('../utils/whatsapp');

cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    const members = await Member.find();
    
    for (const member of members) {
        const diff = Math.ceil((member.membership_end_date - today) / (1000*60*60*24));
        let type = null;
        if(diff === 3) type = '3-days-before';
        if(diff === 1) type = '1-day-before';
        if(diff === 0) type = 'expiry-day';

        if(type) {
            const msg = `Hi ${member.name}, your gym membership ${type} reminder!`;
            const sid = await sendWhatsAppMessage(member.contact_number, msg);
            
            if(sid) {
                member.reminders_sent.push({ date: today, type });
                await member.save();
                await Reminder.create({ member_id: member._id, date_sent: today, type, status: 'sent' });
            }
        }
    }
});
