const express = require('express');
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