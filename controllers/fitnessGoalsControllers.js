const fitnessGoalsDAO = require('../models/fitnessGoalsModel'); 
const db = new fitnessGoalsDAO('goals.db'); 
const userDao = require('../models/userModel.js');
const passport = require('passport');

//Controller for landing page
exports.landing_page = function(req, res){
res.render('homepage', {
    'title': 'Fitness Goals',
})}

//Controller for to go to entries page
exports.goals_page = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Fitness Goals',
            'entries': list,
            "user": req.user
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
exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
    'title': 'Guest Book',
    'user': req.user
    })
   } 

//Controller which extracts data from input and adds to database then redirects to the home page with new data
exports.post_new_entry = function(req, res){
    console.log('extracted data:', req.body.name, req.body.goals, req.body.date, req.body.duration, req.body.completed);
    db.addEntry(req.body.name, req.body.goals, req.body.date, req.body.duration, req.body.completed)
    res.redirect('/goalspage');
}

//Controller which deletes entries and redirects back to the home page
exports.remove_new_entry = async function(req, res) {
    const id = req.params._id;
    await db.deleteGoal(id);
    res.redirect(req.baseUrl + '/goalspage');
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
    res.redirect('/goalspage');
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


//Controller to go to register page
exports.show_register_page = function(req, res){
    res.render("user/register");
    }

//Controller to post the new user
exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
    if (!user || !password) {
    res.send(401, 'no user or no password');
    return;
    }
    userDao.lookup(user, function(err, u) {
    if (u) {
    res.send(401, "User exists:", user);
    return;
    }
    userDao.create(user, password);
    res.redirect('/login');
    });
    } 

//Controller to route to the login page
exports.show_login_page = function(req, res) {
    res.render('user/login');
    };

//Controller to redirect to the homepage
exports.post_login = function(req, res) {
    console.log('serialUser wrote', req.session.passport.user);
    res.redirect('/goalspage');
    }; 


//Controller to show the user entries
exports.show_user_entries = function(req, res) {
    let user = req.params.author;
    db.getEntriesByUser(user)
    .then((entries) => {
    res.render('entries', {
    'title': 'Guest Book',
    'user': req.user,
    'entries': entries
    });
    })
    .catch((err) => {
    console.log('Error: ')
    console.log(JSON.stringify(err))
    });
    } 

//Controller to the logout page
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}; 


exports.authorize = function(redirect) {
    return passport.authenticate('local',
{ failureRedirect: redirect});
}; 
