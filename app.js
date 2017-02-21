const express = require('express');
const app     = express();
const router  = require('./router');


router.get('/', (req, res) => {
  res.send("Now you see me");
})

app.use(router);
app.listen(3000);
