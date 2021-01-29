const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// 分類項目マスタ取得
app.get('/mysql/getItem', (req, res, next) => {
  const mysql = require('mysql');
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


// 削除
app.get('/mysql/deleteData/:dataId', (req, res, next) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  var ret=[];
  connection.connect();
  connection.query('DELETE from accountbook_table where data_id = ?;', req.params.dataId, function(error, results, fields){
    if (error) {
      console.log(error);
      res.send(500);
    } 
    res.send(200);
  });
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}


// POST用の設定
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 家計簿データ登録
app.post('/mysql/inputData', (req, res, next) => {
  console.log(req.body);
  const param = req.body;
  var masterSql = '';
  if (param.itemClassification === 'その他') {
    var itemName = param.itemClassificationName;
    // 項目マスタ登録準備
    masterSql = 'INSERT INTO item_master (item_name, insert_date, update_date) VALUES (?, ?, ?)';
    console.log('その他：' + itemName);
  } else {
    var itemName = param.itemClassification;
    console.log(itemName);
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
  // 項目マスタに登録
  if (masterSql) {
    connection.query(masterSql, [itemName, new Date(), new Date()], function(error, results, fields){
      if (error) {
        console.log(error);
        res.send(500);
      } 
    });
  }
  // データ登録
  connection.query(sql, [param.year, param.month, itemName, param.amount, param.memo, new Date(), new Date()], function(error, results, fields){
    if (error) {
      console.log(error);
      res.send(500);
    } 
    res.send(200);
  });
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}


// 家計簿データ更新
app.post('/mysql/updateData', (req, res, next) => {
  console.log(req.body);
  const param = req.body;
  const mysql = require('mysql');
  res.setHeader('Content-Type', 'text/plain');
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  const sql = 'UPDATE accountbook_table SET item = ?, amount = ?, memo = ?, update_date = ? WHERE data_id = ?;';
  console.log('SQL：' + sql);
  var ret=[];
  connection.connect();
  connection.query(sql, [param.itemClassification, param.amount, param.memo, new Date(), param.dataId], function(error, results, fields){
    if (error) {
      console.log(error);
      res.send(500);
    } 
    res.send(200);
  });
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}


// 家計簿の入力データを取得
app.post('/mysql/itemData', (req, res, next) => {
  const mysql = require('mysql');
  console.log('実行確認');
  const param = req.body;
  console.log(param);
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'testdb',
    password: 'testMysql'
  });
  var sql = '';
  var query=[];
  var ret=[];
  if (!param.itemClassification) {
    sql = 'SELECT * from accountbook_table where year = ? and month = ?;';
    console.log('rwe');
    query.push(param.year);
    query.push(param.month);
    console.log('rwe');
  } else {
    console.log('rwe');
    sql = 'SELECT * from accountbook_table where year = ? and month = ? and item = ?;';
    console.log('rwe');
    query.push(param.year);
    query.push(param.month);
    query.push(param.itemClassification);
    console.log('rwe');
  }
  console.log('実行SQL' + sql);
  connection.connect();
  connection.query(sql, query, function(error, results, fields){
    if (error) {
      console.log(error);
    } 
    var dat = [];
    for (const result of results) {
      var dateFormat = result.year + '/' + result.month;
      var json = {}
      json.data_id = result.data_id;
      json.date = dateFormat;
      json.category = result.item;
      json.amount = result.amount;
      json.memo = result.memo;
      console.log(json);
      dat.push(json)
    }
    console.log(dat)
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(dat);
  });
  console.log('test終了');
  connection.end();
})
module.exports = {
  path: '/api',
  handler: app
}