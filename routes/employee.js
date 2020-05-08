const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Employee = require('../model/employee');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const employees = await Employee.find().sort({ date: -1 })
  res.status(200).json(employees)
})

router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('email', 'Enter valid email').isEmail()
]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone } = req.body;
    try {
      const newEmployee = new Employee({
        name,
        email,
        phone
      });
      await newEmployee.save();
      res.status(200).json(newEmployee)
    } catch (err) {
      res.status(500).json({ msg: 'Server error' })
    }
  });

router.delete('/:empId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.empId);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    };
    await Employee.findByIdAndRemove(req.params.empId);
    res.json({ msg: 'Employee removed' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})


module.exports = router;