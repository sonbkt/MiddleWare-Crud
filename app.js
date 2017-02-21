const express         = require('express');
const app             = express();
const expressNunjucks = require('express-nunjucks');
const router          = require('./router');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/templates');
const njk = expressNunjucks(app);
let db
MongoClient.connect(url, (err, database) => {
  db = database;
  console.log('You just acess mongodb');
})
router.get('/users/add', (req, res) => {
  res.render('users/user-add.njk.html');
});
router.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
  })
})
app.use(router);
app.listen(3000);
