function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = content.split(regex);
    var rules = data.filter(x => x.includes('->'));
    var polymers = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [] };
    for (let i = 0; i < data[0].length; i++) {
        polymers[data[0][i]].push(i);
    }
    var steps = part == '1' ? 10 : 40;
    for (let i = 0; i < steps; i++) {
        console.log("Starting step " + i);
        polymers = step(polymers, rules);
    }
    return getBiggestPolymer(polymers)-getSmallestPolymer(polymers);
}

function step(polymers, rules){
    var p = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [] };
    var max = getMax(polymers);
    var p1 = getPolymer(0, polymers);
    p[p1].push(0);
    var addedPolymers = 0;
    for (let i = 1; i < max+1; i++) {
        var p2 = getPolymer(i, polymers);
        var rulePolymer = findRules(p1+p2, rules);
        if(rulePolymer != ''){
            p[rulePolymer].push(i+addedPolymers);
            addedPolymers++;
        }
        p[p2].push(i+addedPolymers);
        p1 = p2;
    }
    return p;
}

function findRules(str, rules){
    var p = '';
    for (let i = 0; i < rules.length; i++) {
        var r = rules[i].split(' -> ');
        if (str == r[0]) {
            p = r[1];
            break;
        }
    }
    return p;
}

function getPolymer(number, polymers){
    var str = '';
    for (const p in polymers) {
        if (polymers[p].some(x => x == number)) str = p;

    }
    return str;
}

function getMax(polymers){
    var num = 0;
    for (const p in polymers) {
        for (let i = 0; i < polymers[p].length; i++) {
            num = polymers[p][i] > num ? polymers[p][i] : num;
        }
    }
    return num;
}

function getBiggestPolymer(polymers){
    var size = 0;
    for (const p in polymers) {
        if (polymers[p].length > size) size = polymers[p].length;
    }
    return size;
}

function getSmallestPolymer(polymers){
    var size = Number.MAX_SAFE_INTEGER;
    for (const p in polymers) {
        if (polymers[p].length < size && polymers[p].length != 0) size = polymers[p].length;
    }
    return size;
}
module.exports = {
    run
}