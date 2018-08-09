const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../data/db');
const { loginPostCheck, generateToken } = require('../../middleware/required');

const router = express.Router();

router.post('/', loginPostCheck, (req, res) => {
    const credentials = { username: req.username, password: req.password }
    db('users')
        .whereRaw('LOWER("username") = ?', credentials.username.toLowerCase()).first()
        .then(response => {
            if (!response || !bcrypt.compareSync(credentials.password, response.password)) return res.status(401).json({ error: 'You shall not pass!' });
            const token = generateToken(response);
            return res.send(token);
        })
        .catch(err => res.status(500).json({ error: "Couldn't save the user to the database." }))
})

module.exports = router;