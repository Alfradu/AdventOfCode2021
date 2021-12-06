function run(content, part) {
    var data = content.replace(/\r/g, '').split(/\n/);
    var coords = [];
    for (let i = 0; i < data.length; i++) {
        var curr = data[i].split(' ');
        var coord1 = [parseInt(curr[0].split(',')[0]), parseInt(curr[0].split(',')[1])];
        var coord2 = [parseInt(curr[2].split(',')[0]), parseInt(curr[2].split(',')[1])];
        coords = addCoordinates(coord1, coord2, coords, part);
    }
    return getOverlap(coords);
}

function addCoordinates(c1, c2, clist, part) {
    //x check
    var lo = 0;
    var hi = 0;
    var index = 0;
    if (c1[0] == c2[0]) {
        if (c1[1] > c2[1]){
            lo = c2[1];
            hi = c1[1];
        } else {
            lo = c1[1];
            hi = c2[1];
        }
        for (let i = lo; i <= hi; i++) {
            index = getOccurance([c1[0], i], clist);
            if (index != -1) clist[index][2]++;
            else clist.push([c1[0], i, 1]);        
        }
    }
    //y check
    else if (c1[1] == c2[1]) {
        if (c1[0] > c2[0]){
            lo = c2[0];
            hi = c1[0];
        } else {
            lo = c1[0];
            hi = c2[0];
        }
        for (let i = lo; i <= hi; i++) {
            index = getOccurance([i, c1[1]], clist);
            if (index != -1) clist[index][2]++;
            else clist.push([i, c1[1], 1]);        
        }
    }
    //diagonal check
    else if (part == '2'){
        var y_add = c1[1] > c2[1] ? -1 : 1;
        var x_add = c1[0] > c2[0] ? -1 : 1;
        var diff = Math.abs(c1[0] - c2[0]);
        for (let i = 0; i <= diff; i++) {
            var x = c1[0]+x_add*i;
            var y = c1[1]+y_add*i;
            index = getOccurance([x, y], clist);
            if (index != -1) clist[index][2]++;
            else clist.push([x, y, 1]);
        }
    }
    return clist;
}

function getOccurance(coord, clist){
    var c = -1;
    for (let i = 0; i < clist.length; i++) {
        if (clist[i][0] == coord[0] && clist[i][1] == coord[1]) c=i;
    }
    return c;
}

function getOverlap(clist){
    var count = 0;
    for (let i = 0; i < clist.length; i++) {
        if (clist[i][2] > 1) count++;
    }
    return count;
}

module.exports = {
    run
}