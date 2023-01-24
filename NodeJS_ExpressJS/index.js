const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const sever = http.createServer((req, res) => {
  if(req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');

    console.log('Main Page');

  } else if(req.url === '/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('User List');

    console.log('Move User list');

  } else {
    res.statusCode = 404;
    res.end('Not Found');
    
    console.log('No Page');
  }
});

sever.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*

http 모듈
*/ 



/*
const express = require('express');
const morgan = require('morgan');
const app = express();

function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('error ouccered'));
}

function errormw(err, req, res, next) {
  console.log(err.message);
  // 에러를 처리하거나
  next();
}

app.use(commonmw);
app.use(errormw);
app.use(morgan('dev'));

app.listen(3000, function(){
  console.log('Server is running');
})


// express js 
*/

