const express = require('express');
const path = require('path');
const router = require('./routes/fitnessGoalsRoutes'); 
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
const public = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/', router);
app.use(express.static(public));



app.engine('mustache', mustache());
app.set('view engine', 'mustache');

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
   })
   
   router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
   })

app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})