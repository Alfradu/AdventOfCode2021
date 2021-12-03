var u = require('./utils');
const { performance } = require('perf_hooks');
const dayFiles = u.getDays();

var testing = false;

for (const file of dayFiles) {
    const day = require(`./days/${file}`);
    var filename = testing ? `test${file[3]}` : `input${file[3]}`;
    try {
        var startTime = performance.now();
        var ans = day.run(u.readFile(filename), '1');
        var endTime = performance.now();
        u.print(ans, file, '1', (endTime - startTime).toFixed(2)); 
    } 
    catch (error) { console.log(`Could not run ${file} part 1: ` + error) }
    try { 
        var startTime = performance.now();
        var ans = day.run(u.readFile(filename), '2');
        var endTime = performance.now();
        u.print(ans, file, '2', (endTime - startTime).toFixed(2)); 
    } 
    catch (error) { console.log(`Could not run ${file} part 2: ` + error) }
}
