class Node {
    constructor(value) {
        this.value = value;
        this.connections = [];
        this.caveType = value == value.toLowerCase() && value != 'start' && value != 'end' ? 'smol' : 'big';
        this.exploredTimes = 0;
    }
}

function run(content, part, testing) {
    var regex = testing ? /\r\n/ : /\n/;
    var data = buildNodes(content.split(regex));
    var paths = createPaths(data.start, data.start, data.end, part);
    return paths[1].length; 
}

function buildNodes(data) {
    var nodeArr = [];
    for (let i = 0; i < data.length; i++) {
        var line = data[i].split('-');
        var node1;
        var node2;
        if (nodeArr.some(x => x.value == line[0])) { node1 = getNode(line[0],nodeArr); }
        else {
            node1 = new Node(line[0]);
            nodeArr.push(node1);
        }
        if (nodeArr.some(x => x.value == line[1])) { node2 = getNode(line[1],nodeArr); }
        else {
            node2 = new Node(line[1]);
            nodeArr.push(node2);
        }
        node1.connections.push(node2);
        node2.connections.push(node1);
    }
    var start = getNode('start', nodeArr);
    var end = getNode('end', nodeArr); 
    return {nodeArr, start, end};
}

function createPaths(node, start, end, part, visited = [], visList = []) {
    visited.push(node);
    if (node.value == end.value) {
        visList.push(visited.slice().map(x => x.value));
        visited.splice(visited.length-1, 1);
        return [end.value, visList];
    }
    node.exploredTimes++;
    var allowedVisit = part == '1' ? 1 : visitedSmallTwice(visited) ? 1 : 2;
    var con = node.connections.filter(x => x.caveType == 'big' || x.exploredTimes < allowedVisit).filter(x => x.value != start.value);
    var paths = []; 
    for (let i = 0; i < con.length; i++) {
        var path = createPaths(con[i], start, end, part, visited, visList);
        paths.push(path[0]);
        visList = path[1];
    }

    visited.splice(visited.length-1, 1);
    node.exploredTimes--;
    return [paths, visList];
}

function getNode(value, nodeArr) {
    return nodeArr[nodeArr.findIndex(x => x.value == value)];
}

function visitedSmallTwice(visited){
    return visited.filter(x => x.caveType == 'smol' && x.exploredTimes > 1).length > 0 ? true : false;
}
module.exports = {
    run
}