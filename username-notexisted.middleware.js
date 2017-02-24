module.exports = function (req, res, next) {
  req.app.connection.collection('users').findOne({
    name : req.body.name
  }).then((user) => {
    if(user) {
      return res.render('error.njk.html', {message : "UserName is already existed"});
    }
     next();
  })
}
