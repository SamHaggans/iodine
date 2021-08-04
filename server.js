const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

const dirname = __dirname;
const routes = require('./routing/routes.js')(dirname);

const app = express();
const port = process.env.PORT || 3053;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


global.con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPw,
  database: config.dbName,
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database');
});

app.set('trust proxy', 1);

app.use('/', routes);

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log("Server started on port: localhost:%s", port);
});
