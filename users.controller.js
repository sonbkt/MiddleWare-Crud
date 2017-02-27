const ObjectId = require('mongodb').ObjectId;
module.exports.addForm = function(req, res) {
   res.render('users/user-add.njk.html');
}
module.exports.add     = function(req, res) {
  req.app.connection.collection('users').save(req.body, (err, result) => {
    console.log("Save to database");
    res.redirect('/users/add');
   })
}
module.exports.list = function(req, res) {
  req.app.connection.collection('users').find().toArray()
  .then((users) => {
    res.render('users/user-list.njk.html' ,{users : users});
  })
}
module.exports.delete = function(req, res) {
  req.app.connection.collection('users').deleteOne({
    _id : new ObjectId(req.params.id)
  }).then(() => {
    res.redirect('/users');
  })
}
