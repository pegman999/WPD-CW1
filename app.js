//Initialising 
const express = require('express');
const router = require('./routes/fitnessGoalsRoutes'); 
const path = require('path');
const nedb = require('nedb');
const mustache = require('mustache-express');
const auth = require('./auth/auth'); 
const passport = require('passport');
const session = require('express-session');

const bodyParser = require('body-parser');

const db = new nedb();
const app = express();

const public = path.join(__dirname, 'public');


app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'Secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(public));

auth.init();


app.use('/', router);


//Allows the app to be connected on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})













