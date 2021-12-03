
function run(content, part) {
    var data = content.replaceAll(/\r/g, '').split(/\n/);
    if (part == '1'){
        var g = parseInt(generate(data, false, false), 2);
        var e = parseInt(generate(data, true, false), 2);
        return g * e;
    }
    else {
        var o = parseInt(generate(data, false, true), 2);
        var c = parseInt(generate(data, true, true), 2);
        return o * c;
    }
}
function generate(data, flip, remove) {
    var val = '';
    if (!remove){
        for (var i = 0; i < data[0].length; i++) {
            val += get_bit(data, i, flip);
        }
        return val;
    }
    else {
        var arr = data.slice();
        for (var i = 0; i < data.length; i++) {
            val = get_bit(arr, i, flip);
            if (arr.length > 1) arr = remove_entry(arr, i, val);
        }
        return arr[0];
    }
}
function get_bit(data, index, flip) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += data[i][index];
    }
    var bit = str.replaceAll('0', '').length >= str.length / 2 ? '1' : '0';
    var flipped_bit = bit == '1' ? '0' : '1';
    return flip ? flipped_bit : bit;
}
function remove_entry(arr, index, bit_criteria) {
    var new_arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][index] == bit_criteria) {
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}
module.exports = {
    run
}