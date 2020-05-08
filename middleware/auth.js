const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.header('token');
  if (!token) {
    return res.status(400).json({ msg: 'Auth failed'});
  };
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(500).json({ msg: 'token is not valid'})
  }
}