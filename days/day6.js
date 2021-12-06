function run(content, part){
    var data = content.split(',').map(Number);
    var days = addToDays(data);
    var time = part == '1' ? 80 : 256;
    for (let i = 0; i < time; i++) {
        days = rotate(days);
    }
    return days.reduce((a, b) => a + b);
}

function addToDays(data){
    var arr = [0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < data.length; i++) {
        arr[data[i]]++;
    }
    return arr;
}

function rotate(days){
    var arr = [];
    for (let i = 1; i < days.length; i++) {
        arr.push(days[i]);
    }
    arr[6] += days[0];
    arr.push(days[0]);
    return arr;
}
module.exports = {
    run
}