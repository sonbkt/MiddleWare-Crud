const express = require('express');
const app     = express();
const router  = require('./router.js');
const mongodb = require('./mongodb.provider.js');
const expressNunjucks = require('express-nunjucks');
app.set('views', __dirname + '/templates');
const njk = expressNunjucks(app);



app.use(mongodb);
app.use(router);
app.listen(3000);
