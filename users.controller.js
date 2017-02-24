const ObjectId = require('mongodb').ObjectId;
module.exports.addForm = function(req, res) {
   res.render('users/user-add.njk.html');
}
module.exports.add     = function(req, res) {
  req.app.connection.collection('users').save(req.body, (err, result) => {
    console.log("Save to database");
   })
}
