function run(content, part) {
    var x = 0, y = 0, a = 0;
    var data = content.split(/\n/);
    for (var i = 0; i < data.length; i++) {
        var dir = data[i].split(' ');
        dir[1] = parseInt(dir[1]);
        switch (dir[0]) {
            case "forward":
                x += dir[1];
                if (part == 2) y += a * dir[1];
                break;
            case "down":
                if (part == 1) y += dir[1];
                if (part == 2) a += dir[1];
                break;
            case "up":
                if (part == 1) y -= dir[1];
                if (part == 2) a -= dir[1];
                break;
            default:
                break;
        }
    }
    return x * y;
}

module.exports = {
    run
}