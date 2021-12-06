function run(content, part) {
    var data = content.split(',').map(Number);
    data = grow(data, 80);
    return data.length;
}

function run2(content, part){
    var data = content.split(',').map(Number);
    var n;
    var t = 256/8;
    let newData;
    var roc = []
    for (let i = 0; i < t; i++) {
        newData = grow(data, 1);
        roc.push((newData.length/data.length));
        console.log(data.length * roc[roc.lenght-1]^i);
        data = newData.slice(); 
    }
    var p = data.length;
    var r = ((5363/5)-1);
    var roc = (1 + (r));
    n = p * roc^t;
    return n;
}
function grow(data, days){
    var spawn;
    for (let i = 0; i < days; i++) {
        data = data.map(x => x-1);
        spawn = data.filter(x => x==-1).map(x => x+9);
        if (spawn.length > 1) data = data.concat(spawn);
        if (spawn.length == 1) data.push(spawn[0]);
        for (let j = 0; j < data.length; j++) {
            if (data[j] == -1) data[j] = 6;
        }
    }
    return data;
}
module.exports = {
    run
}

console.log(run2('3,4,3,1,2', ''));