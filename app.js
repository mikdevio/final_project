const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const indexRouter = require('./controllers/index.controller');
const userRouter = require('./controllers/user.controller');
const productRouter = require('./controllers/product.controller');

// Settings
const PORT = 3500;

// Express application
const app = express();

// Connection to MongoDB
main().then(() => {
    console.log("MongoDB connection Successfully");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/final_project');
}

/* App configurations */
// File paths
app.use('/public', express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use of routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);


app.listen(PORT, () => {
    console.log(`App ready on port ${PORT}`);
    console.log(path.join(__dirname, 'public'));
});


