function run(content, part) {
    var columns = content.split(/\n/);
    if (part == '1') var lowPoints = [];
    if (part == '2') var basins = [];
    for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < columns[i].length; j++) {
            var neighbours = getNeighbours(i, j, columns);
            if (compareNeighbours(i, j, neighbours, columns)) {
                if (part == '1') lowPoints.push(parseInt(columns[i][j]) + 1);
                if (part == '2') basins.push(cleanArr(getBasin(i, j, columns, [])));
            }
        }
    }
    if (part == '2') {
        var sum = 1;
        var largestBasins = getLargestIn2dArr(basins);
        basins = largestBasins[1];
        sum *= largestBasins[0];
        largestBasins = getLargestIn2dArr(basins);
        basins = largestBasins[1];
        sum *= largestBasins[0];
        largestBasins = getLargestIn2dArr(basins);
        basins = largestBasins[1];
        sum *= largestBasins[0];
    }
    return part == '1' ? lowPoints.reduce((a, b) => a + b) : sum;
}

function getNeighbours(col, row, data) {
    var arr = [];
    if (row - 1 >= 0) arr.push([col, row - 1]);
    if (row + 1 < data[col].length) arr.push([col, row + 1]);
    if (col - 1 >= 0) arr.push([col - 1, row]);
    if (col + 1 < data.length) arr.push([col + 1, row]);
    return arr;
}

function compareNeighbours(col, row, neighbours, data) {
    for (let i = 0; i < neighbours.length; i++) {
        var currNeigh = parseInt(data[neighbours[i][0]][neighbours[i][1]]);
        var currNum = parseInt(data[col][row]);
        if (currNeigh <= currNum) {
            return false;
        }
    }
    return true;
}

function getBasin(i, j, data, coordArr, prev = []) {
    if (check2dArrEntry([i, j], coordArr) || check2dArrEntry([i, j], prev)) return [];
    var neigh = getNeighbours(i, j, data);
    var neighbours = neigh.filter(arr => data[arr[0]][arr[1]] != '9').filter(arr => !check2dArrEntry(arr, prev));
    if (neighbours.length == 0) return [[i, j]];
    else {
        prev.push([i, j]);
        for (let k = 0; k < neighbours.length; k++) {
            var result = getBasin(neighbours[k][0], neighbours[k][1], data, coordArr, prev);
            coordArr = coordArr.concat(result);
        }
        coordArr.push([i, j]);
        return coordArr;
    }
}

function getLargestIn2dArr(arr) {
    var max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > arr[max].length) max = i;
    }
    var size = arr[max].length;
    arr.splice(max, 1);
    return [size, arr];
}
function check2dArrEntry(entry, arr2) {
    for (let j = 0; j < arr2.length; j++) {
        if (entry[0] == arr2[j][0] && entry[1] == arr2[j][1]) return true;
    }
    return false;
}

function cleanArr(arr) {
    var tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!check2dArrEntry(arr[i], tempArr)) tempArr.push(arr[i]);
    }
    return tempArr;
}
module.exports = {
    run
}
