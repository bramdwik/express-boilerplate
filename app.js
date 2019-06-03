/* global express */
'use strict'

global.__root = __dirname;
global.express = require('express');
global.app = express();

const http = require('http');
const async = require('async');

const middlewaresConfig = require('./app/config/middlewares');
const routersConfig = require('./app/config/routes');
const eventsConfig = require('./app/config/events');

async.waterfall([
  routersConfig,
  middlewaresConfig
], () => {
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  const port = eventsConfig.normalizePort(process.env.PORT || '3000');

  app.set('port', port);
  const server = http.createServer(app);

  server.listen(port, eventsConfig.onListening.bind(server));

  server.on('error', eventsConfig.onError);
});

// module.exports = app;