function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = createModel(content.split(regex));
    var steps = 100;
    var flashes = 0;
    if (part == '1') {
        for (let i = 0; i < steps; i++) {
            data = step(data);
            var sum = sumFlashes(data);
            flashes += sum[0];
            data = sum[1];
        }
        return flashes;
    } else {
        var i = 0;
        while(flashes < 100){
            data = step(data);
            var sum = sumFlashes(data);
            flashes = sum[0];
            data = sum[1];
            i++;
        }
        return i;
    }
}

function createModel(input) {
    var arr = [];
    var arr2 = [];
    for (let i = 0; i < input.length; i++) {
        arr.push(input[i].split("").map(Number));
        arr2.push(Array(input[i].length).fill(0));
    }
    return [arr, arr2];
}

function step(data) {
    for (var i = 0; i < data[0].length; i++) {
        data[0][i] = Array.from(data[0][i], x => x + 1);
    }
    var recheck = true;
    while (recheck) {
        recheck = false;
        for (let i = 0; i < data[0].length; i++) {
            for (let j = 0; j < data[0][i].length; j++) {
                if (data[0][i][j] > 9 && data[1][i][j] == 0) {
                    data[1][i][j] = 1;
                    recheck = true;
                    data = flash(i, j, data);
                }
            }
        }
    }
    return data;
}

function flash(i, j, data) {
    var n = getNeighbours(i, j, data[0]);
    for (let k = 0; k < n.length; k++) {
        var row = n[k][1];
        var col = n[k][0];
        data[0][col][row]++;
    }
    return data;
}

function getNeighbours(col, row, data) {
    var arr = [];
    if (row - 1 >= 0) arr.push([col, row - 1]);
    if (row + 1 < data[col].length) arr.push([col, row + 1]);
    if (col - 1 >= 0) arr.push([col - 1, row]);
    if (col + 1 < data.length) arr.push([col + 1, row]);
    if (row - 1 >= 0 && col - 1 >= 0) arr.push([col - 1, row - 1]);
    if (row + 1 < data[col].length && col - 1 >= 0) arr.push([col - 1, row + 1]);
    if (row - 1 >= 0 && col + 1 < data.length) arr.push([col + 1, row - 1]);
    if (row + 1 < data[col].length && col + 1 < data.length) arr.push([col + 1, row + 1]);
    return arr;
}

function sumFlashes(data) {
    var sum = 0;
    for (let i = 0; i < data[1].length; i++) {
        for (let j = 0; j < data[1][i].length; j++) {
            if (data[1][i][j] == 1) {
                sum++;
                data[0][i][j] = 0;
            }
            data[1][i][j] = 0;
        }
    }
    return [sum, data];
}

module.exports = {
    run
}