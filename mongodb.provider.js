const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';

module.exports = function(req, res, next) {
  MongoClient.connect(url, (err, connection) => {
    if (err) {
      return next(err);
    }
    req.app.connection = connection;
    next();
  })
}
