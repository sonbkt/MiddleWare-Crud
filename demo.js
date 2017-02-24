const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express();
const isDev = app.get('env') === 'development';

app.set('views', __dirname + '/templates');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

app.get('/', (req, res) => {
    res.render('user-add');
});

app.listen(3000);

router.get('/users/:id', (req, res) => {
  db.collection('users')
		.findOne({
			_id: new ObjectId(req.params.id)
		}).then((user) => {
			// if (user) {
			// 	req.user = user;
      //   console.log(user);
			// }
      console.log(user)
			// return res.render('error.njk.html', {message: 'User required'});
		})
  // res.render('users/user-detail.njk.html', {user: req.user});
})

const express         = require('express');
const app             = express();
const expressNunjucks = require('express-nunjucks');
const router          = require('./router');
const MongoClient     = require('mongodb').MongoClient;
const ObjectId        = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/test';
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/templates');
const njk = expressNunjucks(app);
let db;
MongoClient.connect(url, (err, database) => {
  db = database;
})

router.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, users) => {
    res.render('users/user-list.njk.html', {users : users});
  })
})
router.get('/users/add', (req, res) => {
  res.render('users/user-add.njk.html');
});
router.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
  })
})
// Get user detail
router.get('/users/:id', (req, res) => {
  db.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
      console.log(user);
      res.render('users/user-detail.njk.html', {user: user});
  })
})
// Delete user
router.get('/users/delete/:id', (req, res) => {
  db.collection('users').deleteOne({
    _id : new ObjectId(req.params.id)
  }, (err, result) => {
    console.log(result);
  })
})

//Update users form
router.get('/users/update/:id', (req, res) => {
  db.collection('users').findOne({
    _id : new ObjectId(req.params.id)
  }).then((user) => {
    console.log(user);
    res.render('users/user-update.njk.html', {user : user});
  })
})
router.post('/users/update/:id', (req, res) => {
  db.collection('users')
  .updateOne({
      _id : new ObjectId(req.params.id)
  }, {
    $set : {name : req.body.name}
  }).then(() => {
    res.redirect('/users/add');
  })
})



app.use(router);
app.listen(3000);
