const utils = require('./utils');
//const assert = require('assert');
const should = require('should');

describe('utils.js 모듈의 capitalize() 함수는', () => {
  it('문자열의 첫번째 문자를 대문자로 반환한다.', () => {
    const result = utils.capitalize('hello');
    result.should.be.equal('Hello');
  })
}) 
// 테스트 코르를 마치 영어 문장 읽는 듯 하게 만든다 




/*
  assert

  describe('utils.js 모듈의 capitalize() 함수는', () => {
  it('문자열의 첫번째 문자를 대문자로 반환한다.', () => {
    const result = utils.capitalize('hello');
    assert.equal(result, 'Hello');
  })
}) 
*/

