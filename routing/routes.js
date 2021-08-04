const express = require('express');
var router = express.Router();
const client_dir = './public/';

var router = express.Router();

module.exports = function (dirname) {
  router.get('/', function (req, res) {
    res.sendFile(client_dir + 'index.html', { root: dirname });
  });

  router.get('/index.js', function (req, res) {
    res.sendFile(client_dir + 'index.js', { root: dirname });
  });

  router.get('/style.css', function (req, res) {
    res.sendFile(client_dir + 'style.css', { root: dirname });
  });

  router.get('/getSourcesList', async function (req, res) {
    let sources = await getSources();
    res.json({ ok: true, sources: sources });
  });

  return router;
};

function getSources() {
  return new Promise(function (resolve, reject) {
    let SQL = 'SELECT * FROM sources';
    con.query(SQL, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}
