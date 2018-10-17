const MongoClient = require('mongodb').MongoClient;
const sourceURL = "mongodb://localhost:27018/MyDb";
const targetURL = "mongodb://localhost:3001/me";

MongoClient.connect(sourceURL, (err, sourceDB) => {
    if(err) throw err;

    MongoClient.connect(targetURL, (err, targetDB) => {
        if(err) throw err;

        sourceDB.collection('logs', (err, collection) => {
            sourceDB.collection('logs').find({}).toArray()
            .then( result => {
                result.forEach( log => {
                    delete log._id;
                    targetDB.collection('logs').insert(log);
                })
            })
            .then( () => {
                    sourceDB.collection('logs').remove({});
                })
            .catch( err=> {
                    console.log(err);
                });
        });
    });
});
