var fs = require('fs');
var path = require('path');
var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var parseFile = require('./pparse').parseFile;

var readfile = function(dirname, file) {
    // TODO, handle directory
    var filename = path.join(dirname, file);
    if (!filename.endsWith('.txt')) return;
    return Q.nfcall(fs.readFile, filename, 'utf8');
}

var readfiles = function(dirname, files) {
    var promises = [];
    // what should we do if the file is a directory
    files.forEach(function(file) {
        promises.push(readfile(dirname, file));
    })
    return Q.all(promises);
}

// traval files in dir
var readdir = function(dirname) {
    var deferred = Q.defer();
    fs.readdir(dirname, function(err, files) {
        if (err) deferred.reject(err);
        else deferred.resolve([dirname, files]);
    });
    return deferred.promise;
}

// as the / is the dir separator for unix, 
// if we want support running on windows,
// we choose path.join
readdir(path.join(__dirname, 'data'))
    .spread(readfiles)
    .then(function(cnts){
        var ps = [];
        cnts.forEach(function(cnt){
            ps.push(parseFile(cnt))
        });
        return Q.all(ps);
    })
    .then(function(results){
        return MongoClient.connect()
            .then(function(db){
                return db.collection('interview').insertMany(results);
            });
    })
    .then(console.log.bind(console))
    .catch(console.log.bind(console));

