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
        init() {
            this.db.insert({
            goal: 'Go for a Run',
            goalDetail: 'Go for a run for an hour',
            published: '2020-02-16',
            author: 'Jack'
            });
            //for later debugging
            console.log('db entry Jack inserted');
            }

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


        //Gets all the entries 
        getPetersEntries(){
            return new Promise((resolve,reject)=> {
                this.db.find({author: 'Peter'}, function(err, entries){
                    if(err){
                        reject(err);
                        console.log('getPetersEntried promise rejected');
                    }else {
                        resolve(entries);
                        console.log('getPetersEntried promise resolved');
                    }
                })
            })
        }

        //Used to add entries into the datbase and logs into console when used
        addEntry(auth, goals, goalDesc) {
            var entry = {
            author: auth,
            goal: goals,
            goalDetail: goalDesc,
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

        //Used to delete entries from the database
        deleteEntry(author){
            this.db.remove({author: 'Jack'}, {}, function(err, docsRem){
                if (err){
                    console.log('error deleting document Jack');
                }else{
                    console.log(docsRem, 'document(s) removed from the database');
                }
            })
        }
                
} 
module.exports = FitnessGoals; 
