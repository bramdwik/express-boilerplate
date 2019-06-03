'use strict'

const mongoose = require('mongoose');

const database = {};

database.mongodb = (cb) => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', () => cb('Connection Error'));
    db.once('open', cb);
  } catch (err) {
    cb(err)
  }
}

module.exports = database;
