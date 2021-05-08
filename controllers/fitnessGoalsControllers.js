const fitnessGoalsDAO = require('../models/fitnessGoalsModel'); 
const db = new fitnessGoalsDAO('goals.db'); 

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
    console.log('extracted data:', req.body.name, req.body.goals, req.body.date, req.body.duration, req.body.completed);
    db.addEntry(req.body.name, req.body.goals, req.body.date, req.body.duration, req.body.completed)
    res.redirect('/');
}

//Controller which deletes entries and redirects back to the home page
exports.remove_new_entry = async function(req, res) {
    const id = req.params._id;
    await db.deleteGoal(id);
    res.redirect(req.baseUrl + '/');
}


//Controller which shows the updated entries
exports.show_updated_entry = function(req, res){
    res.render('update', {
        'title': 'Update Entry'
    });
}

//Controller which updates the entries
exports.post_updated_entry= function(req, res){
    console.log('id in update entry', req.params.id);
    db.updateEntry(req.params.id, req.body.name, req.body.goals, req.body.date, req.body.duration, req.body.completed);
    res.redirect('/');
}

//Controller to show the finished goals
exports.finished_page = function(req, res) {
    db.getFinishedEntries().then((list) => {
        res.render('finished', {
            'title': 'Fitness Goals',
            'entries': list
        })
        console.log('fitnessGoals_finished uses all messages');
        console.log(list);
    }).catch((err)=>{
        console.log('promise rejcted', err)
    })}

//Controller to show the uncomplete goals
exports.uncomplete_page = function(req, res) {
    db.getUncompleteEntries().then((list) => {
        res.render('uncomplete', {
            'title': 'Fitness Goals',
            'entries': list
        })
        console.log('fitnessGoals_uncomplete uses all messages');
        console.log(list);
    }).catch((err)=>{
        console.log('promise rejcted', err)
    })}