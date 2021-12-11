var u = require('./utils');
const { performance } = require('perf_hooks');

const RunType = { ALL: 1, LATEST: 2, DAY: 3 };
var testing = true;
var run = RunType.ALL;
var runDay = 3;
const dayFiles = u.getDays();
for (const file of dayFiles) {
    var number = file.substring(3).split('.')[0];
    if (run == RunType.LATEST && file != dayFiles[dayFiles.length - 1]) continue;
    if (run == RunType.DAY && file != dayFiles[runDay - 1]) continue;
    const day = require(`./days/${file}`);
    var filename = testing ? `test${number}` : `input${number}`;
    try {
        var inp = u.readFile(filename);
        var startTime = performance.now();
        var ans = day.run(inp, '1', testing);
        var endTime = performance.now();
        u.print(ans, file, '1', (endTime - startTime).toFixed(2));
    }
    catch (error) { console.log(`Could not run ${file} part 1: ` + error) }
    try {
        var inp = u.readFile(filename);
        var startTime = performance.now();
        var ans = day.run(inp, '2', testing);
        var endTime = performance.now();
        u.print(ans, file, '2', (endTime - startTime).toFixed(2));
    }
    catch (error) { console.log(`Could not run ${file} part 2: ` + error) }
}
