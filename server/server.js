const express = require('express');
const app = express();
const path = require("path");
const mysql = require('mysql');
const PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database : 'naviwebtest'
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/getStore',function(req,res){
    var priceInterval= parseInt(req.body.priceInterval);
    var sql = `SELECT * FROM store WHERE (price >= ${priceInterval}) AND (price < ${priceInterval + 1000})`;
    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      res.send(results);
      res.end();
    });
});

  
app.listen(PORT);