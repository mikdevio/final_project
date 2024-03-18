const express = require('express');
const path = require('path');

const indexRouter = require('./controllers/index.controller');
const userRouter = require('./controllers/user.controller');

// Settings
const PORT = 3500;

// Express application
const app = express();

/* App configurations */
// File paths
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));
// View render engine
app.set('view engine', 'ejs');

// Use of routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.listen(PORT, () => {
    console.log(`App ready on port ${PORT}`);
    console.log(path.join(__dirname, 'public'));
});


