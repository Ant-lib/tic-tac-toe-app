
var Round = function(prevRound) {

    this.board = [];
    this.turn = "";
    this.result = "";
    this.count = 0;
    
    if(typeof prevRound !== "undefined") {
        var len = prevRound.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = prevRound.board[itr];
        }

        this.count = prevRound.count;
        this.result = prevRound.result;
        this.turn = prevRound.turn;
    }

    this.swapTurn = function() {
        this.turn = this.turn === hTurn ? cTurn : hTurn;
    }

    this.emptyCells = function() {
        var indexs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === defEmptyCellSign) {
                indexs.push(itr);
            }
        }
        return indexs;
    }

    this.noMoreMoves = function() {
        for(var i = 0; i <= 2 ; i++) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] === this.board[i + 3] && 
                    this.board[i + 3] === this.board[i + 6]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        for(var i = 0; i <= 6; i = i + 3) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] === this.board[i + 1] && 
                    this.board[i + 1] == this.board[i + 2]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] == this.board[i + j] && 
                    this.board[i + j] === this.board[i + 2*j]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        if(this.emptyCells().length == 0) {
            this.result = "draw";
            return true;
        } else {
            return false;
        }
    };
};