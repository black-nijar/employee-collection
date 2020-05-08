const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', [
  check('email', 'Enter valid email').isEmail(),
  check('password', 'Password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    };
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Please check your email or password' });
      };
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Please check your email or password' });
      };
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, 'secret', {
        expiresIn: 600
      }, (err, token) => {
        if (err) throw err;
        res.json({ token })
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
  })

module.exports = router;