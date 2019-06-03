/* global app, __root */
'use strict'

const path = require('path');
const glob = require('glob');
const routePath = './app/routes';

const routePathRelative = '../routes';

module.exports = (cb) => {
  glob(path.join(__root, routePath, '/*.js'), (err, files) => {
    for (let i = 0; i < files.length; i++) {
      const routeName = path.basename(files[i], '').replace('.js', '').replace('index', '');
      const routeFunction = require(`${routePathRelative}/${routeName}`);
      app.use(`/${routeName}`, routeFunction);
    }
    cb()
  })
}
