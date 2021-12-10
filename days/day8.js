function run(content, part) {
    var row = content.split(/\n/);
    var digits = 0;
    var outputs = [];
    for (let i = 0; i < row.length; i++) {
        var data = row[i].split(' | ');
        var output = data[1].split(' ');
        for (let j = 0; j < output.length; j++) {
            if (output[j].length == 2 || output[j].length == 3 || output[j].length == 4 || output[j].length == 7) digits++;
        }
        var pattern = decode(data[0]);
        outputs.push('');
        for (let k = 0; k < output.length; k++) {
            outputs[i] += getSignalNumber(output[k], pattern);
        }

    }
    var sum = outputs.map(Number).reduce((a, b) => a + b);
    return part == '2' ? sum : digits;
}

function decode(sig_pattern) {
    var patterns = sig_pattern.split(' ');
    var signals = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g' };
    var completedOccurance = [8, 6, 8, 7, 4, 9, 7];
    var countedOccurance = countOccurance(patterns, signals);
    //compare completed with counted
    signals = swapSignal(countedOccurance, completedOccurance, signals);
    countedOccurance = countOccurance(patterns, signals);
    var numbers = checkNumbers(patterns, signals);
    //sort once 
    //8 and 8 and 7 occur twice- have to guess 3 times at worst
    //check numbers
    var loop = [7, 8, 7]; //should find correct config before crashing
    var i = 0;
    while (numbers.length != 0) {
        signals = swapSignal(countedOccurance, completedOccurance, signals, loop[i]);
        countedOccurance = countOccurance(patterns, signals);
        numbers = checkNumbers(patterns, signals);
        i++;
        if (i >= loop.length) {
            //error - wrong occurance numbers? patch up
            signals = swapSignal(countedOccurance, completedOccurance, signals);
            countedOccurance = countOccurance(patterns, signals);
            numbers = checkNumbers(patterns, signals);
            i = 0
        }
    }
    return signals;
}

function countOccurance(patterns, signals) {
    var count = [];
    var patternString = patterns.join();
    for (var i = 1; i <= 7; i++) {
        count.push(patternString.split(signals[i]).length - 1);
    }
    return count;
}

function checkNumbers(patterns, signals) {
    var errNumbers = [];
    for (let i = 0; i < patterns.length; i++) {
        if (getSignalNumber(patterns[i], signals) == -1) errNumbers.push(patterns[i]);
    }
    return errNumbers;
}

function swapSignal(countOcc, compOcc, signals, spec_val) {
    if (spec_val == 7 || spec_val == 8) {
        var index = countOcc.indexOf(spec_val);
        var index2 = countOcc.indexOf(spec_val, index + 1);
        var temp = signals[index + 1];
        signals[index + 1] = signals[index2 + 1];
        signals[index2 + 1] = temp;
        return signals;
    }
    for (let i = 0; i < countOcc.length; i++) {
        for (let j = 0; j < compOcc.length; j++) {
            if (compOcc[j] == countOcc[i] && i != j) {
                var temp = signals[i + 1];
                signals[i + 1] = signals[j + 1];
                signals[j + 1] = temp;
                temp = countOcc[i];
                countOcc[i] = countOcc[j];
                countOcc[j] = temp;
            }
        }
    }
    return signals;
}

function getSignalNumber(pattern, signals) {
    var numberPattern = [];
    for (let i = 0; i < pattern.length; i++) {
        numberPattern.push(parseInt(Object.keys(signals).find(k => signals[k] === pattern[i])));
    }
    numberPattern.sort((a, b) => a - b);
    var number = numberPattern.join('');
    switch (number) {
        case '123567':
            return 0;
        case '36':
            return 1;
        case '13457':
            return 2;
        case '13467':
            return 3;
        case '2346':
            return 4;
        case '12467':
            return 5;
        case '124567':
            return 6;
        case '136':
            return 7;
        case '1234567':
            return 8;
        case '123467':
            return 9;
        default:
            return -1;
    }
}

module.exports = {
    run
}
