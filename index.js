const MongoClient = require('mongodb').MongoClient;
// const sourceURL = "mongodb://localhost:27018/MyDb";
// const targetURL = "mongodb://localhost:3001/me";

const targetURL = "mongodb://localhost:27018/MyDb";
const sourceURL = "mongodb://localhost:3001/me";

MongoClient.connect(sourceURL, (err, sourceDB) => {
    if(err) throw err;

    MongoClient.connect(targetURL, (err, targetDB) => {
        if(err) throw err;

        sourceDB.collection('logs', (err, sourceDBCollection) => {
            sourceDBCollection.find({}).toArray()
            .then( result => {
                result.forEach( log => {
                    delete log._id;
                    targetDB.collection('logs').insert(log);
                })
            })
            .then( () => {
                sourceDBCollection.remove({});
                })
            .then( () => {
                sourceDB.close();
                targetDB.close();
            })
            .catch( err=> {
                sourceDB.close();
                targetDB.close();
                console.log(err);
            });
        });
    });
});
