const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./routes/index');

app.use ( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'origin, x-http-method-override, accept, content-type, authorization, x-pingother, if-match, if-modified-since, if-none-match, if-unmodified-since, x-requested-with');
  res.header('Access-Control-Expose-Headers', 'tag, link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes');
  next();
});
 app.use(bodyParser.urlencoded({ extended: true}));

// settings
app.set('Port', process.env.PORT || 3000);
prefix = process.env.PREFIX || '';

// midelware
app.use(express.json()); //con esta linea de el API sera capas de comprender y recibir objetos Json


// hooks
// require( './hooks', app);

// hello world ;)
app.get(prefix, ( req, res ) =>{
  res.send('hello world');
});
// routers
app.use('/api', api);
// startinf the server
app.listen(app.get('Port'), () =>{
  console.log('server start in port:', app.get('Port'));
});
