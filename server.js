const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }))
app.use('/employee', require('./routes/employee'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));