const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
  res.status(200).json({ msg: 'GET emp'})
})

router.post('/', (req, res) => {
  res.send('Employee post')
});

router.delete('/:empId', (req, res) => {
  res.send('DELETE emp')
})


module.exports = router;