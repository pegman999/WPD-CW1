const nedb = require('nedb'); 

//Class for the fitness goals database
class FitnessGoals {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        } 

        //Used to initalize the database with its variables
        // init() {
        //     this.db.insert({
        //     goal: 'Go for a Run',
        //     goalDetail: 'Go for a run for an hour',
        //     published: '2020-02-16',
        //     author: 'Jack'
        //     });
        //     //for later debugging
        //     console.log('db entry Jack inserted');
        //     }

        //Gets all the entries in the datbase and displays to the console
        getAllEntries() {
            return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
            if (err) {
            reject(err);
            console.log('getAllEntried promise rejected');
            } else {
            resolve(entries);
            console.log('getAllEntries returns:');
            }
            })
            })
            } 


        //Used to add entries into the datbase and logs into console when used
        addEntry(name, goals, date, duration, completed) {
            var entry = {
            name: name,
            goals: goals,
            date: date,
            duration: duration,
            completed: completed,
            published: new Date().toISOString().split('T')[0]
            }
            console.log('entry created', entry);
            this.db.insert(entry, function(err, doc) {
            if (err) {
            console.log('Error inserting document', err);
            } else {
            console.log('document inserted into the database', doc);
            }
            })
            }


        //Used to get the ID of the goals that are in the database
        getGoalById(id) {
            return new Promise((resolve, reject) => {
                this.db.findOne({ _id: id }, (err, entry) => {
                    err ? reject(err) : resolve(entry)
                })
            })
        }
        
        //Used to delete entries from the database
        deleteGoal(id) {
            this.db.remove({ _id: id }, { multi: false }, (err, numOfDocsRemoved) => {
                err ? console.log('Problem with deleting goal: ${id}') : console.log('${numOfDocsRemoved} Goal removed from database')
            })
        }


        updateEntry(id, name, goals, date, duration, completed){
            
            this.db.update({_id: id}, {name: name, goals: goals, date: date, duration: duration, completed: completed, published: new Date().toISOString().split('T')[0],}, {}, function(err, goalUpdate){
                                        if(err) {
                                            console.log('error with updating goal', goalUpdate);
                                        } else {
                                            console.log('goal updated');
                                        }
                                        
                                    })
        }

                
} 
module.exports = FitnessGoals; 
