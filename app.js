const express = require('express');
const app     = express();
const router  = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/test';
const expressNunjucks = require('express-nunjucks');
app.set('views', __dirname + '/templates');
const njk = expressNunjucks(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(url, (err, database) => {
  db = database;
})

// add users form
router.get('/users/add', (req, res) => {
  res.render('users/user-add.njk.html');
});
// Add User
router.post('/users/add', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    res.redirect('/users');
    console.log("Save to database");
  })
})
// List User
router.get('/users', (req, res) => {
  db.collection('users').find().toArray().then((allusers) => {
       res.render('users/user-list.njk.html', {users : allusers});
  })
})
//User Detail
router.get('/users/:id', (req, res) => {
  db.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
    res.render('users/user-detail.njk.html', {user : user});
  })
})
// Delete Users
router.get('/users/delete/:id', (req, res) => {
  db.collection('users').deleteOne({
    _id : new ObjectId(req.params.id)
  }).then(() => {
    res.redirect('/users');
  })
})

// Update Users Form
router.get('/users/update/:id', (req, res) => {
  db.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
      res.render('users/user-update.njk.html', {user : user});
  })
})

// Update
router.post('/users/update/:id', (req, res) => {
  db.collection('users')
  .updateOne({
    _id : new ObjectId(req.params.id)
  }, {
    $set : {name : req.body.name},
    $set : {age  : req.body.age}
  }).then(() => {
    res.redirect('/users');
  })
})
app.use(router);
app.listen(3000);
