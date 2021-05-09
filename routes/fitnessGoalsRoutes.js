const express = require('express');
const controller = require('../controllers/fitnessGoalsControllers');
const router = express.Router();

//Route to home page
router.get('/', controller.landing_page)

//Route to main page when app is opened
router.get('/goalspage', controller.goals_page);

//Route to the fitnessGoals page which displays entries
router.get('/fitnessGoals', controller.entries_list);

//Route in the add entry page shows the entries in the console
router.get('/new', controller.show_new_entries);

//Route to post the new entries generated by the input in the add entry page
router.post('/new', controller.post_new_entry);

//Route to delete entry when the button is clicked
router.get('/remove/:_id', controller.remove_new_entry);

//Route that redirects to the about.html file when /about is put in
router.get('/about', function(req, res) {
 res.redirect('/about.html');
})

//Route to show an updated entry
router.get('/update/:id', controller.show_updated_entry);

//Route to post the updated entries
router.post('/update/:id', controller.post_updated_entry);

//Route to go to complete goals
router.get('/finished', controller.finished_page);

//Route to go to uncomplete goals
router.get('/uncomplete', controller.uncomplete_page);

//Route to register page
router.get('/register', controller.show_register_page)

module.exports = router;