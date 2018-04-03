'use strict';

require('marko/node-require').install();
require('lasso').configure({
  plugins: [
    'lasso-marko',
    {
      plugin: 'lasso-sass',
      config: {
        outputStyle: 'compressed',
        includePaths: [
          './node_modules/govuk_frontend_toolkit/stylesheets',
          './node_modules/govuk-elements-sass/public/sass'
        ]
      }
    }
  ],
  outputDir: 'static'
});

const express = require('express');
const markoExpress = require('marko/express');

const app = express();
const port = process.env.PORT || 4000;

app.use(require('lasso/middleware').serveStatic());
app.use(markoExpress());
app.get('/single', require('./src/pages/single'));
app.get('/double', require('./src/pages/double'));
app.get('/double-in-single', require('./src/pages/double-in-single'));

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log(`Listening on port ${port}`);
});
