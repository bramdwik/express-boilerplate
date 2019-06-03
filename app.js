/* global express */
'use strict'

global.__root = __dirname;
global.express = require('express');

const http = require('http');

const app = express();

const middlewares = require('./app/config/middlewares');
const routerConfig = require('./app/config/routes');
const eventConfig = require('./app/config/events');

routerConfig(app, () => {
  middlewares(app);
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  const port = eventConfig.normalizePort(process.env.PORT || '3000');

  app.set('port', port);
  const server = http.createServer(app);

  server.listen(port, eventConfig.onListening.bind(server));

  server.on('error', eventConfig.onError);
});

// module.exports = app;