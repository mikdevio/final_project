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
app.use('/public', express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use of routers
app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`App ready on port ${PORT}`);
    console.log(path.join(__dirname, 'public'));
});

