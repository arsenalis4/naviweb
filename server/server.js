const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

  
app.listen(PORT);