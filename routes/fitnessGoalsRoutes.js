const express = require('express');
const controller = require('../controllers/fitnessGoalsControllers');
const router = express.Router();
const auth = require('../auth/auth');
const {ensureLoggedIn} = require('connect-ensure-login');





//Route to home page
router.get('/', controller.landing_page)

//Route to main page when app is opened
router.get('/goalspage', controller.goals_page);

//Route to the fitnessGoals page which displays entries
router.get('/fitnessGoals', controller.entries_list);

//Route in the add entry page shows the entries in the console
router.get('/new', ensureLoggedIn('/login'), controller.show_new_entries); 


//Route to post the new entries generated by the input in the add entry page
router.post('/new', ensureLoggedIn('/login'), controller.post_new_entry); 

//Route to delete entry when the button is clicked
router.get('/remove/:_id', ensureLoggedIn('/login'), controller.remove_new_entry);

//Route that redirects to the about.html file when /about is put in
router.get('/about', function(req, res) {
 res.redirect('/about.html');
})

//Route to show an updated entry
router.get('/update/:id', ensureLoggedIn('/login'), controller.show_updated_entry);

//Route to post the updated entries
router.post('/update/:id', ensureLoggedIn('/login'), controller.post_updated_entry);

//Route to go to complete goals
router.get('/finished', controller.finished_page);

//Route to go to uncomplete goals
router.get('/uncomplete', controller.uncomplete_page);

//Route to register page
router.get('/register', controller.show_register_page);

//Route to post new users
router.post('/register', controller.post_new_user); 

//Route to show the login page
router.get('/login', controller.show_login_page);

//Route to post the login page
router.post('/login', auth.authorize('/login'), controller.post_login); 

//Route to the logout
router.get('/logout', controller.logout); 

//Route used 404 when unrecognized route
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
   })
   


// //Route to port 500 to show an internal server error
// router.use(function(err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send('Internal Server Error.');
//     })
    

module.exports = router;