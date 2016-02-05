var MongoClient = require('mongodb').MongoClient;
module.exports = function(results) {
    return MongoClient.connect('mongodb://localhost')
        .then(function(db) {
            return db.collection('interview')
                .insertMany(Array.prototype.concat.apply([], results))
                .then(console.log.bind(console))
                .then(db.close.bind(db));
        });
}
