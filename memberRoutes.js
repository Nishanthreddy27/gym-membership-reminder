const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Get all members
router.get('/', async (req, res) => {
    const members = await Member.find();
    res.json(members);
});

// Add member
router.post('/', async (req, res) => {
    const member = new Member(req.body);
    await member.save();
    res.json(member);
});

// Edit member
router.put('/:id', async (req, res) => {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
});

// Delete member
router.delete('/:id', async (req, res) => {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
});

module.exports = router;
