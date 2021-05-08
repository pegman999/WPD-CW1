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


        // Gets all the entries in the datbase and displays to the console
        getAllEntries() {
            return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
            if (err) {
            reject(err);
            console.log('getAllEntries promise rejected');
            } else {
            resolve(entries);
            console.log('getAllEntries returns:');
            }
            })
            })
            } 
        
        getFinishedEntries() {
            return new Promise((resolve, reject) => {
            this.db.find({completed: 'Achieved'}, function(err, entries) {
            if (err) {
            reject(err);
            console.log('getFinishedEntries promise rejected');
            } else {
            resolve(entries);
            console.log('getFinishedEntries returns:');
            }
            })
            })
            }

        getUncompleteEntries() {
            return new Promise((resolve, reject) => {
            this.db.find({completed: 'Not achieved'}, function(err, entries) {
            if (err) {
            reject(err);
            console.log('getUncompleteEntries promise rejected');
            } else {
            resolve(entries);
            console.log('getUncompleteEntries returns:');
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
