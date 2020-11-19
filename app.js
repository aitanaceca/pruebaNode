const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoute');

const dbURI = 'mongodb+srv://admin1:admin1234@nodetuts.x3mus.mongodb.net/prueba?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result => console.log(result)))
        .catch((err) => console.log('Cant conect'));

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use('/views', express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;