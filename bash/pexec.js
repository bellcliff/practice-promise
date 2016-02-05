var fileio = require('./pread'),
    dbio = require('./pdb'),
    parseio = require('./pparse'),
    path = require('path'),
    Q = require('q');
var readfiles = fileio.readfiles,
    readdir = fileio.readdir,
    parseFile = parseio.parseFile,
    dbinsert = dbio;

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
    .then(dbinsert)
    .then(console.log.bind(console))
    .catch(console.log.bind(console));


