const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    date_sent: Date,
    type: String,
    status: String
});

module.exports = mongoose.model('Reminder', reminderSchema);

