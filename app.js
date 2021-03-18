//Initialising 
const express = require('express');
const path = require('path');
const router = require('./routes/fitnessGoalsRoutes'); 

//Initialising mustache and bodyParser
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const public = path.join(__dirname, 'public');

//Initial router to main page under "/"
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', router);
app.use(express.static(public));


//Engine for Mustache
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//Route used 404 when unrecognized route
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
   })
   
//Route to port 500 to show an internal server error
router.use(function(err, req, res, next) {
res.status(500);
res.type('text/plain');
res.send('Internal Server Error.');
})



//Allows the app to be connected on port 3000
app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})