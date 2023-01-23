var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Ryun'},
  {id: 3, name: 'Hyung'},
  {id: 4, name: 'Kim'},
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if(!user) {
    return res.status(404).end();
  }
  res.json(user); 
})

app.delete('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    return res.status(400).end();
  }
  users.filter(user => user.id !== id);
  res.status(204).end();
})


app.post('/users', function(req, res) {
  const name = req.body.name;
  if(!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length
  if(isConflict) return res.status(409).end();

  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);
})
// Expressjs 는 body를 사용하기 위해서는 body-parser를 사용해야 한다.

app.put('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if(!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length;
  if(isConflict) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if(!user) return res.status(404).end(); 
  
  user.name = name;

  res.json(user);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;

/*
  Test 1

app.get('/users', function (req, res) {
  res.json(users);
});

-----------------------------------------------------------------------------------------------------------------------
  Test2

app.get('/users', function (req, res) {
  const limit = req.query.limit;
  res.json(users.slice(0, limit));
});



------------------------------------------------------------------------------------------------------------------------
  Test 3-1 
  3번 테스트는 성공했으나 1번 테스트에 오류가 발생 하였다.
  
  why?
  응답이 배열이 아닌 빈객체가 응답이 되어 버렸다.
  그것은 limit 의 설정값이 들어갈때는 undefine 으로 들어 가게 되고 
  아래의 로직을 통해 NaN이 들어가서 배열이 아닌 빈 객체가 되어 버리는 것이다. 

app.get('/users', function (req, res) {
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

그래서 limit 의 기본 값을 설정 해서 해소해 주었다.

app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});



----------------------------------------------------------------------------------------------------------------------------

Get users/:id TEST

test 1 
app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.filter((user) => user.id === id)[0];
  res.json(user); 
})



------------------------------------------------------------------------------------------------------------------------------

test 2

app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if(!user) {
    return res.status(404).end();
  }
  res.json(user); 
})


-------------------------------------------------------------------------------------------------------------------------------
Delete API 테스트

Test1
app.delete('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  users.filter(user => user.id !== id);
  res.status(204).end();
})

Test2
app.delete('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    return res.status(400).end();
  }
  users.filter(user => user.id !== id);
  res.status(204).end();
})



------------------------------------------------------------------------------------------------------------------------------------
POST API 테스트

TEST 1
app.post('/users', function(req, res) {
  const name = req.body.name;
  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);
})

TEST2
app.post('/users', function(req, res) {
  const name = req.body.name;
  if(!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length
  if(isConflict) return res.status(409).end();
  
  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);
})



-------------------------------------------------------------------------------------------------------------------------------------

PUT API 테스트

TEST 1
app.put('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  const name = req.body.name;

  const user = users.filter(user => user.id === id)[0];
  user.name = name;

  res.json(user);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


TEST2 

app.put('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if(!name) return res.status(400).end();
  
  const isConflict = users.filter(user => user.name === name).length;
  if(isConflict) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if(!user) return res.status(404).end(); 
  
  user.name = name;

  res.json(user);
})

*/
