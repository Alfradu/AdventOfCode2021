function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = content.split(regex);
    var errors = [];
    var incomplete = [];
    for (let i = 0; i < data.length; i++) {
        var cleanedChunky = true;
        while (cleanedChunky) {
            cleanedChunky = false;
            for (let j = 0; j < data[i].length - 1; j++) {
                if (
                    data[i][j] == "(" && data[i][j + 1] == ")" ||
                    data[i][j] == "[" && data[i][j + 1] == "]" ||
                    data[i][j] == "{" && data[i][j + 1] == "}" ||
                    data[i][j] == "<" && data[i][j + 1] == ">") {
                    var tempRow = data[i].substring(0, j) + data[i].substring(j + 2, data[i].length);
                    cleanedChunky = true;
                    data[i] = tempRow;
                    break;
                } else if (facingOpposite(data[i][j], data[i][j + 1])) {
                    //console.log("Expected "+getOpposite(data[i][j])+", but found "+data[i][j + 1]+" instead.");
                    errors.push(data[i][j + 1]);
                    break;
                }
            }
        }
        if (checkUnfinishedLine(data[i])) {
            incomplete.push(checkScoreIncomplete(data[i]));
        }
    }
    incomplete.sort((a, b) => a > b ? -1 : +1);
    var sum = part == '1' ? checkScoreError(errors) : incomplete[Math.floor(incomplete.length / 2)];
    return sum;
}

function checkUnfinishedLine(line) {
    var l = ['(', '[', '{', '<'];
    for (let i = 0; i < line.length; i++) {
        if (!l.includes(line[i])) {
            return false;
        }
    }
    return true;
}

function getOpposite(a) {
    var all = ['(', '[', '{', '<', ')', ']', '}', '>'];
    return all[all.indexOf(a) + 4 % all.length];
}

function facingOpposite(a, b) {
    var l = ['(', '[', '{', '<'];
    var r = [')', ']', '}', '>'];
    if (l.includes(a) && r.includes(b)) return true;
    return false;
}

function checkScoreError(errors) {
    var val = 0;
    var scores = { 3: ')', 57: ']', 1197: '}', 25137: '>' };
    for (let index = 0; index < errors.length; index++) {
        val += parseInt(Object.keys(scores).find(key => scores[key] === errors[index]));
    }
    return val;
}

function checkScoreIncomplete(incomplete) {
    var val = 0;
    var scores = { 1: '(', 2: '[', 3: '{', 4: '<' };
    for (let index = incomplete.length - 1; index >= 0; index--) {
        val *= 5;
        val += parseInt(Object.keys(scores).find(key => scores[key] === incomplete[index]));
    }
    return val;
}

module.exports = {
    run
}