const fs = require('fs');
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

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

const args = process.argv.slice(2);

if (args.length != 1 || !args[0].includes('.csv')) {
  console.log('Specify a csv file to load data from');
} else {
  loadData(args);
}

async function loadData(args) {
  let SQL = 'DROP TABLE IF EXISTS sources';
  await con.query(SQL, function (err, result) {
    if (err) throw err;
  });

  SQL =
    'CREATE TABLE sources (id int primary key, NDB varchar(40), TDS varchar(40), description varchar(1000), n varchar(10), mcg varchar(10), SD varchar(10), min varchar(10), max varchar(10), sources varchar(100))';
  await con.query(SQL, function (err, result) {
    if (err) throw err;
  });

  SQL = 'TRUNCATE TABLE sources';
  await con.query(SQL, function (err, result) {
    if (err) throw err;
  });

  const filename = args[0];
  let dataArray;
  await fs.readFile(filename, 'utf8', async function (err, data) {
    if (err) console.log(err);
    dataArray = data.split(/\r?\n/);
    let rowArr;

    for (row of dataArray) {
      rowArr = row.split(';');
      let SQL = 'INSERT INTO sources VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      await con.query(SQL, rowArr, function (err, result) {
        if (err) throw err;
      });
    }
  });
  console.log(`Loaded ${filename} successfully!`);
}
