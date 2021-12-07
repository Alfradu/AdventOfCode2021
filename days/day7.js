function run(content, part){
    var data = content.split(',').map(Number);
    var max = data.reduce( (x, y) => Math.max(x,y));
    var min = data.reduce( (x, y) => Math.min(x,y));
    var costs = [];
    for (let i = min; i < max; i++) {
        var fuel = 0;
        for (let j = 0; j < data.length; j++) {
            if (part == '1') fuel += Math.abs(i-data[j]);
            if (part == '2') fuel += calculateFuelCost(Math.abs(i-data[j]));
        }
        costs.push(fuel);
    }
    return costs.reduce( (x, y) => Math.min(x,y));
}

function calculateFuelCost(number){
    var count = 0;
    for (let i = 0; i <= number; i++) {
        count+=i;
    }
    return count;
}

module.exports = {
    run
}