const fs = require('fs')

function getDays() {
  return fs.readdirSync('./days').filter(file => file.endsWith('.js'));
}
function readFile(name) {
  const data = fs.readFileSync('./inputs/' + name + '.txt', 'utf8');
  return data.replace(/\n+$/, ""); 
}
function print(content, day, part, ms) {
  console.log(`${ms} ms :: ${day} p.${part} solution: ${content}`);
}
module.exports = {
  getDays,
  readFile,
  print
}