const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const auth = require('../middleware/auth');

// @route   GET api/notices
// @desc    Get all notices
// @access  Public
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.json(notices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/notices
// @desc    Add new notice
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNotice = new Notice({
            title,
            content
        });

        const notice = await newNotice.save();

        // Emit event to all connected clients
        req.io.emit('newNotice', notice);

        res.json(notice);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
