const express = require('express');
const app     = express();
const router  = require('./router');


router.get('/', (req, res) => {
  res.send("Hello world a");
})

app.use(router);
app.listen(3000);
