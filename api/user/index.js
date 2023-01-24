// 라우팅 설정 로직
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl'); 

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;




/*
  첫번째 /users api를 가져온 후 express 에서 제공하는 
  라우팅 작업을 한다 app -> router 
  '/users' ->  '/'    외부 index에서 미들 웨어 app.use('/users', user); 설정을 해놓았기 때문에.
  여기서는 root 디렉터 인것이다. 그후 module exports 작업을 해준다.
  이후 테스트 코드 작동 확인

  router.get('/', function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)){
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

router.get('/:id', function(req, res) {
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

router.delete('/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) {
    return res.status(400).end();
  }
  users.filter(user => user.id !== id);
  res.status(204).end();
})


router.post('/', function(req, res) {
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

router.put('/:id', function(req, res) {
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

module.exports = router;
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

두번째로 각 로직의 컨트롤러 함수부분과 데이터를 user.ctrl.js
로 이동 시킨후 바인딩 작업을 한다.


const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl'); 

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;

이 이후 테스팅을 또 진행 하는데 테스팅을 진행 하는 이유는...
이러한 방식으로 코드를 리펙토링 하더라도 테스트 코드만 잘 진행 되어 진다면 문제가 없이 진행 되어 지는것
을 화ㅓㄱ인하며 작업이 가능하다는 점이다.



---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
