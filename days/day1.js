function run(content, part) {
    var data = content.split(/\n/).map(Number);
    if (part == 1) return count(data);
    var sums = [];
    for (var i = 2; i < data.length; i++) {
        sums.push(data[i - 2] + data[i - 1] + data[i]);
    }
    return count(sums);
}
function count(arr) {
    var c = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) c++;
    }
    return c;
}
module.exports = {
    run
}