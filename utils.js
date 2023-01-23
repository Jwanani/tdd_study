function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//capitalize 문자열을 받아서 첫번쨰 문자열을 대문자로 바꾸어 주는 함수

module.exports = {
  capitalize: capitalize
};