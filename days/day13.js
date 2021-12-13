function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = content.split(regex);
    var map = generateField(data.filter(x => x != '' && !x.includes('fold')));
    var instructions = data.filter(x => x != '' && x.includes('fold'));
    var arr = [] 
    for (let i = 0; i < instructions.length; i++) {
        map = fold(map);
    }
    return map;
}

function generateField(coords){
    var xmax = 0;
    var ymax = 0;
    for (const coord of coords) {
        if (parseInt(coord.split(',')[0]) > xmax) xmax = parseInt(coord.split(',')[0]);
        if (parseInt(coord.split(',')[1]) > ymax) ymax = parseInt(coord.split(',')[1]);
    }
    var map = Array.from(Array(xmax)).forEach(x => x.push(Array.from(Array(ymax))));
}
function fold(arr, instrunction){
    
}
module.exports = {
    run
}