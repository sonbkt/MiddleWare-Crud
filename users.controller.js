const ObjectId = require('mongodb').ObjectId;
module.exports.addForm = function(req, res) {
   res.render('users/user-add.njk.html');
}
module.exports.add     = function(req, res) {
  req.app.connection.collection('users').save(req.body, (err, result) => {
    console.log("Save to database");
    res.redirect('/users');
   })
}
module.exports.list = function(req, res) {
  req.app.connection.collection('users').find().toArray()
  .then((users) => {
    res.render('users/user-list.njk.html' ,{users : users});
  })
}
module.exports.detail = function(req, res) {
  req.app.connection.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
    res.render('users/user-detail.njk.html', {user : user});
  })
}
module.exports.delete = function(req, res) {
  req.app.connection.collection('users').deleteOne({
    _id : new ObjectId(req.params.id)
  }).then(() => {
    res.redirect('/users');
  })
}
module.exports.updateForm = function(req, res) {
  req.app.connection.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
      res.render('users/user-update.njk.html', {user : user});
  })
}
module.exports.update = function(req, res) {
    req.app.connection.collection('users')
    .updateOne({
      _id : new ObjectId(req.params.id)
    }, {
      $set : {name : req.body.name, age  : req.body.age}
    }).then((result) => {
      res.redirect('/users');
    })
}
