import express from 'express';
import path from 'path';
import open  from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicpath
}));

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  // hard coding for simplicity, pretend its a real db
  res.json([
    {"id":1, "firstName": "bob", "lastName": "dylan", "email": "bobdylan@gmail.com"},
    {"id":2, "firstName": "lionel", "lastName": "richy", "email": "lionelrichy@gmail.com"},
    {"id":3, "firstName": "bob", "lastName": "marley", "email": "bobmarley@gmail.com"}
  ]);
});

app.listen(port, function(err) {
  if(err) {
    console.log(err);
  } else  {
    open('http://localhost:' + port);
  }
});
