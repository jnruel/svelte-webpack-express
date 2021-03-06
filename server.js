const express = require('express');
const app = express();
const path = require('path');
const got = require('got');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const middleware = require('webpack-dev-middleware');

// TODO: set this via command line argument
const devServerEnabled = true;
const url = 'http://www.anagramica.com/best/';


// Use Webpack Dev Middleware to recompile svelte components
// while server is running
if (devServerEnabled) {
  const compiler = webpack(config);

  app.use(middleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

// Without this, req.body shows up as undefined in app.post
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080, () => {
  console.log('App started and available at http://localhost:8080');
});

// POST route
app.post('/word', async(req, res) => {
  try {
    const response = await got(url + req.body.word);
    res.send(response.body);
  }
  catch(error) {
    console.log(error);
    res.send(error);
  }
});

