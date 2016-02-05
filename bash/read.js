var fs = require('fs');
var path = require('path');
var Q = require('q');
var parseFile = require('./parse').parseFile;

var readfile = function(dirname, file) {
    // TODO, handle directory
    var filename = path.join(dirname, file);
    if (!filename.endsWith('.txt')) return;
    fs.readFile(filename, 'utf8', parseFile);
}

var readfiles = function(err, dirname, files) {
    // TODO
    if (err) {
        throw err
    }
    // what should we do if the file is a directory
    files.forEach(function(file) {
        readfile(dirname, file);
    })
}

// traval files in dir
var readdir = function(dirname) {
    fs.readdir(dirname, function(err, files) {
        readfiles(err, dirname, files);
    });
}

// as the / is the dir separator for unix, 
// if we want support running on windows,
// we choose path.join
readdir(path.join(__dirname, 'data'));
