const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

let users = [
  {id: 1, name: 'John'},
  {id: 1, name: 'Ryun'},
  {id: 1, name: 'Hyung'},
  {id: 1, name: 'kim'},
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function(req, res) {
  res.json(users);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})

module.exports = app;