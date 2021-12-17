function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = content.split(regex);
    var rules = data.filter(x => x.includes('->'));
    var polymers = {};
    for (let i = 1; i < data[0].length; i++) {
        polymers[data[0][i-1]+data[0][i]] = 1;
    }
    var steps = part == '1' ? 10 : 40;
    for (let i = 0; i < steps; i++) {
        polymers = step(polymers, rules);
    }
    var elements = {};
    for (const polymer in polymers) {
        if (Object.hasOwnProperty.call(elements, polymer[0])) {
            elements[polymer[0]] += polymers[polymer];
        } else {
            elements[polymer[0]] = polymers[polymer];
        }
    }
    elements[data[0][data[0].length-1]]++;
    return Math.max(...Object.values(elements))-Math.min(...Object.values(elements));
}

function step(polymers, rules){
    var newPolymers = {};
    for (const polymer in polymers) {
        var newPolymer = '';
        for (let i = 0; i < rules.length; i++) {
            var rule = rules[i].split(' -> ');
            if (rule[0] == polymer){
                newPolymer = polymer[0] + rule[1] + polymer[1];
                break;
            }
        }
        if (newPolymer != ''){
            var pair1 = newPolymer.substring(0,2);
            var pair2 = newPolymer.substring(1);
            if (Object.hasOwnProperty.call(newPolymers, pair1)) {
                newPolymers[pair1] += polymers[polymer];
            } else {
                newPolymers[pair1] = polymers[polymer];
            }
            if (Object.hasOwnProperty.call(newPolymers, pair2)) {
                newPolymers[pair2] += polymers[polymer];
            } else {
                newPolymers[pair2] = polymers[polymer];
            }
            polymers[polymer] = 0;
        }
    }
    for (const p in newPolymers) {
        if (newPolymers[p] == 0) delete newPolymers[p];
    }
    return newPolymers;
}

module.exports = {
    run
}