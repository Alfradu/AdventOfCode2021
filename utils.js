const fs = require('fs')

function getDays() {
  return fs.readdirSync('./days').filter(file => file.endsWith('.js'));
}
function readFile(name) {
  try {
    const data = fs.readFileSync('./inputs/' + name + '.txt', 'utf8');
    return data.replace(/\n+$/, "");
  } catch (err) {
    console.error(err)
    return err;
  }
}
function print(content, day, part, ms) {
  console.log(`${ms} ms :: ${day} p.${part} solution: ${content}`);
}
module.exports = {
  getDays,
  readFile,
  print
}