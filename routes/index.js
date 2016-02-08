var express = require('express');
var router = express.Router();
var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    Code = mongodb.Code;

/* GET home page. */
router.get('/api/interview_by_year', function(req, res, next) {
    MongoClient.connect('mongodb://localhost/test')
        .then(function(db){
            return db.collection('interview').group(new Code(function(doc){
                return {year: doc.Date ? new Date(doc.Date).getFullYear() : 0}
            }), {}, {count: 0}, new Code(function(doc, result){
                result.count++;
            }))
        })
        .then(res.json.bind(res))
        .catch(function(err){
            console.log(err);
            next(err);
        })
});

module.exports = router;
