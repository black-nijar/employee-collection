const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
app.use(express.json({ extended: false }))
app.use(cors());

app.use('/employee', require('./routes/employee'));
app.use('/user/register', require('./routes/user'));
app.use('/user/login', require('./routes/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));