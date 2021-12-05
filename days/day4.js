class Board {
    constructor(numbers) {
        this.numbers = numbers;
        this.checks = [
            '.','.','.','.','.',
            '.','.','.','.','.',
            '.','.','.','.','.',
            '.','.','.','.','.',
            '.','.','.','.','.'];
    }
    hasBingo() {
        var h = (this.checks[0] == 'x' && this.checks[1] == 'x' && this.checks[2] == 'x' && this.checks[3] == 'x' && this.checks[4] == 'x') || 
        (this.checks[5] == 'x' && this.checks[6] == 'x' && this.checks[7] == 'x' && this.checks[8] == 'x' && this.checks[9] == 'x') || 
        (this.checks[10] == 'x' && this.checks[11] == 'x' && this.checks[12] == 'x' && this.checks[13] == 'x' && this.checks[14] == 'x') || 
        (this.checks[15] == 'x' && this.checks[16] == 'x' && this.checks[17] == 'x' && this.checks[18] == 'x' && this.checks[19] == 'x') || 
        (this.checks[20] == 'x' && this.checks[21] == 'x' && this.checks[22] == 'x' && this.checks[23] == 'x' && this.checks[24] == 'x');

        var v = (this.checks[0] == 'x' && this.checks[5] == 'x' && this.checks[10] == 'x' && this.checks[15] == 'x' && this.checks[20] == 'x') || 
        (this.checks[1] == 'x' && this.checks[6] == 'x' && this.checks[11] == 'x' && this.checks[16] == 'x' && this.checks[21] == 'x') || 
        (this.checks[2] == 'x' && this.checks[7] == 'x' && this.checks[12] == 'x' && this.checks[17] == 'x' && this.checks[22] == 'x') || 
        (this.checks[3] == 'x' && this.checks[8] == 'x' && this.checks[13] == 'x' && this.checks[18] == 'x' && this.checks[23] == 'x') || 
        (this.checks[4] == 'x' && this.checks[9] == 'x' && this.checks[14] == 'x' && this.checks[19] == 'x' && this.checks[24] == 'x');
        //var d = (this.checks[0] == 'x' && this.checks[6] == 'x' && this.checks[12] == 'x' && this.checks[18] == 'x' && this.checks[24] == 'x') || 
        //(this.checks[20] == 'x' && this.checks[16] == 'x' && this.checks[12] == 'x' && this.checks[8] == 'x' && this.checks[4] == 'x');
        return h || v;
    }
    getCheckedNumbers(){
        var arr = [];
        for (let i = 0; i < this.checks.length; i++) {
            if (this.checks[i] == 'x') arr.push(this.numbers[i]);
        }
        return arr;
    }
    getRemainingNumbers(){
        var arr = [];
        for (let i = 0; i < this.checks.length; i++) {
            if (this.checks[i] == '.') arr.push(this.numbers[i]);
        }
        return arr;
    }
    checkNumber(number){
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i] == number) this.checks[i] = 'x';
        }
    }
};

function run(content, part) {
    var data = content.split(/\n/);
    var orders = data[0].split(',').map(Number);
    var boards = createBoards(data);
    var bingo_order;
    for (let i = 0; i < orders.length; i++) {
        boards = updateBoards(boards, orders[i]);
        if (i >= 4){
            var bingo_boards = checkBingo(boards);
            bingo_order = orders[i];
            if (bingo_boards.length > 0){
                if (part == '1') return bingo_order * (bingo_boards[0].getRemainingNumbers().reduce((a, b) => a + b));
                if (part == '2' && boards.length > 1) {
                    for (let j = 0; j < bingo_boards.length; j++) {
                        boards.splice(boards.indexOf(bingo_boards[j]), 1);
                    }
                } else if(part == '2') {
                    var sum = bingo_boards[0].getRemainingNumbers().reduce((a, b) => a + b);
                    return bingo_order * sum;  
                }
            }
        }
    }
    return "no bingo?";
}

function createBoards(data){
    var arr = []  
    for (let i = 2; i < data.length; i+=6) {
        var num = (data[i] + ' ' + data[i+1] + ' ' + data[i+2] + ' ' + data[i+3] + ' ' + data[i+4]).split('  ').join(' ').split('\r').join('');
        num = num.trim().split(' ').map(Number);
        var b = new Board(num);
        arr.push(b);
    }
    return arr;
}

function updateBoards(boards, nr){
    for (let i = 0; i < boards.length; i++) {
        boards[i].checkNumber(nr);
    }
    return boards;
}
function checkBingo(boards){
    var arr = [];
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].hasBingo()) arr.push(boards[i]);
    }
    return arr;
}

module.exports = {
    run
}

