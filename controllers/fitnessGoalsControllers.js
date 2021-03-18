const fitnessGoalsDAO = require('../models/fitnessGoalsModel'); 
const db = new fitnessGoalsDAO(); 

//Controller for inital page of site (Take all entries from model page and displays to console)
exports.landing_page = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Fitness Goals',
            'entries': list
        })
        console.log('fitnessGoals_entries uses all messages');
        console.log(list);
    }).catch((err)=>{
        console.log('promise rejcted', err)
    })}

//Controller for the Fitness Goals page which also takes the entries in the model page   
exports.entries_list = function(req, res) {
    res.send('<h1>Fitness Goals Messages</h1>');
    db.getAllEntries().then((entries) => {
        console.log('fitnessGoals_entries uses all messages');
    })
    };



//Controller use to display the title and new entries
exports.show_new_entries = function(req, res){
    res.render('newEntry',{
        'title': 'Fitness Goals'
    })
}

//Controller which extracts data from input and adds to database then redirects to the home page with new data
exports.post_new_entry = function(req, res){
    console.log('extracted data:', req.body.author, req.body.goal, req.body.goalDetail);
    db.addEntry(req.body.author, req.body.goal, req.body.goalDetail)
    res.redirect('/');
}

//Controller which deletes entries and redirects back to the home page
exports.remove_new_entry = async function(req, res) {
    const id = req.params._id;
    await db.deleteGoal(id);
    res.redirect(req.baseUrl + '/');
}
