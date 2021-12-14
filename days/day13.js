function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = content.split(regex);
    var map = generateField(data.filter(x => x != '' && !x.includes('fold')));
    var instructions = data.filter(x => x != '' && x.includes('fold'));
    if (part == '1') return countDots(fold(map, instructions[0]));
    for (let i = 0; i < instructions.length; i++) {
        map = fold(map, instructions[i]);
    }
    return createString(map);
}

function generateField(coords) {
    var xmax = 0;
    var ymax = 0;
    for (const coord of coords) {
        if (parseInt(coord.split(',')[0]) > xmax) xmax = parseInt(coord.split(',')[0]);
        if (parseInt(coord.split(',')[1]) > ymax) ymax = parseInt(coord.split(',')[1]);
    }
    var arr = Array.from(Array(ymax + 1));
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Array.from(Array(xmax + 1)).map(x => x = ' ');
    }
    for (let i = 0; i < coords.length; i++) {
        arr[parseInt(coords[i].split(',')[1])][parseInt(coords[i].split(',')[0])] = '#';
    }
    return arr;
}

function fold(arr, instruction) {
    var axis = instruction.split(' ')[2][0];
    var line = parseInt(instruction.split('=')[1]);
    var dir = axis == 'y' ? [0, line] : [line, 0];
    for (let y = dir[1]; y < arr.length; y++) {
        for (let x = dir[0]; x < arr[y].length; x++) {
            if (dir[0] != 0) arr[y][dir[0]] = '|';
            else if (dir[1] != 0) arr[dir[1]][x] = '-';
            var xdir = dir[0] != 0 ? 2 * dir[0] - x : x;
            var ydir = dir[1] != 0 ? 2 * dir[1] - y : y;
            if (arr[y][x] == '#') arr[y][xdir] = arr[y][x];
            if (arr[y][x] == '#') arr[ydir][x] = arr[y][x];
        }
    }
    if (axis == 'x') {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j <= line; j++) {
                arr[i].pop();
            }
        }
    } else {
        for (let j = 0; j <= line; j++) {
            arr.pop();
        }
    }
    return arr;
}

function countDots(arr) {
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        count += arr[i].filter(x => x == '#').length;
    }
    return count;
}
function createString(arr) {
    var str = `\n`;
    for (const line of arr) {
        str+= line.join('') + '\n';
    } 
    return str;
}
module.exports = {
    run
}