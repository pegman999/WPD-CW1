const express = require('express');
const controller = require('../controllers/fitnessGoalsControllers');
const router = express.Router();

//Route to main page when app is opened
router.get('/', controller.landing_page);

//Route to the fitnessGoals page which displays entries
router.get('/fitnessGoals', controller.entries_list);

//Route to entries directly based of the author Jack
router.get('/jack', controller.jacks_entries);

//Route in the add entry page shows the entries in the console
router.get('/new', controller.show_new_entries);

//Route to post the new entries generated by the input in the add entry page
router.post('/new', controller.post_new_entry);

//Route that redirects to the about.html file when /about is put in
router.get('/about', function(req, res) {
 res.redirect('/about.html');
})


module.exports = router;