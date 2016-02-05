var fs = require('fs');

// traval files in dir
var readdir = function(dirname) {
    fs.readdir(dirname, function(err, files) {
        // TODO
        if (err) {
            throw err
        }
        // what should we do if the file is a directory
        files.forEach(function(file) {
            // TODO, handle directory
            var filename = dirname + "/" + file;
            if (!filename.endsWith('.txt')) return;
            fs.readFile(filename, 'utf8', parseFile);
        })
    })
}

var parseFile = function(err, cnt) {
    //TODO fix later
    if (err) {
        throw err
    }
    var lines = cnt.split(/\r\n/);
    console.log(lines.length);
    var interviews = [];
    var interview;
    lines.forEach(function(line) {
        /**
         * handle all lines in one method,
         * which means we need keep a status
         * the status means the line is at
         *   head, interview info or interview questions
         */
        if (line.startsWith('--') || line.startsWith('==')) {
            if (interview !== undefined) {
                interviews.push(interview);
            }
            interview = {};
        } else if (line.startsWith('Client')) {
            interview.Client = line.split(':')[1];
        } else if (line.startsWith('Type')) {
            interview.Type = line.split(':')[1];
        } else if (line.startsWith('Candidate')) {
            interview.Candidate = line.split(':')[1];
        } else if (line.startsWith('Date')) {
            interview.Date = line.split(':')[1];
        }
    });
    if (interview !== undefined) interviews.push(interview);
    console.log('count of interview', interviews.length, interviews[0]);
}

readdir(__dirname);
