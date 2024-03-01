require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    // res.render('index');
    res.send('Welcome to the Google')
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
