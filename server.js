const express = require('express');
const session = require('express-session');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');

const task = db.task;
const user = db.user;
const userTask = db.user_task;
const status = db.status;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/tasks', function (req, res, next) {
  task
    .findAll({
      include: [
        {
          model: user,
          where: {}
        }
      ]
    })
    .then(function (tasks) {
      return res.json(tasks);
    });
});

db.sequelize.sync()
.then(function () {
  var server = app.listen(8080, function () {
    console.log(`Connected on port ${server.address().port}`);

  });
});

