const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/mysql', (req, res, next) => {
  const mysql = require('mysql');
  console.log('testです');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  var ret=[];
  connection.connect();
  connection.query('SELECT * from test_table;', function(error, row, fields){
    if (error) {
      console.log(error);
    } 
    var dat = [];
    //dat.push({id: row[0].id, name: row[0].name});
    //ret = JSON.stringify(dat);
    //res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(row);
  });
  console.log('test終了');
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}

app.get('/mysql/getItem', (req, res, next) => {
  const mysql = require('mysql');
  console.log('testです');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  var ret=[];
  connection.connect();
  connection.query('SELECT item_name from item_master;', function(error, results, fields){
    if (error) {
      console.log(error);
    } 
    var dat = [];
    for (const result of results) {
      dat.push(result.item_name)
    }
    ret = JSON.stringify(dat);
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(ret);
  });
  console.log('test終了');
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/mysql/inputData', (req, res, next) => {
  console.log(req.body);
  const param = req.body;
  if (!param.itemClassificationName) {
    var itemName = param.itemClassification;
    console.log(itemName);
  } else {
    var itemName = param.itemClassificationName;
    console.log('その他：' + itemName);
  }
  const mysql = require('mysql');
  res.setHeader('Content-Type', 'text/plain');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  const sql = 'INSERT INTO accountbook_table (year, month, item, amount, memo, insert_date, update_date) VALUES (?, ?, ?, ?, ?, ?, ?);';
  console.log('SQL：' + sql);
  var ret=[];
  connection.connect();
  connection.query(sql, [param.year, param.month, itemName, param.amount, param.memo, new Date(), new Date()], function(error, results, fields){
    if (error) {
      console.log(error);
      res.send(500)
    } 
    res.send(200);
  });
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}