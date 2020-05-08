const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', [
  check('name', 'Username is required').not().isEmpty(),
  check('email', 'Enter a valid Email').isEmail(),
  check('password', 'Enter password with 6 or more char').isLength({ min: 6})
],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exist'})
    }
    user = new User ({
      name,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload,'secret', {
        expiresIn: 600
      }, (err, token) => {
        if (err) throw err;
        res.json({ token })
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error')
  }
})

module.exports = router;