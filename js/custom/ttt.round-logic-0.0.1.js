
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
        for(var itr = 0; itr < Math.pow(defBoardSizeDim, 2); itr++) {
            if(this.board[itr] === defEmptyCellSign) {
                indexs.push(itr);
            }
        }
        return indexs;
    }

    this.noMoreMoves = function() {
        //vertical 3x3
        for(var i = 0; i <= 2 ; i++) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] === this.board[i + 3] && 
                    this.board[i + 3] === this.board[i + 6]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        //vertical 4x4
        // for(var i = 0; i <= 3 ; i++) {
        //     if(this.board[i] !== defEmptyCellSign && 
        //         this.board[i] === this.board[i + 4] && 
        //             this.board[i + 4] === this.board[i + 8] &&
        //                 this.board[i + 8] === this.board[i + 12]) {
        //                     this.result = this.board[i];
        //                     return true;
        //     }
        // }

        //horizontal 3x3
        for(var i = 0; i <= 6; i = i + 3) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] === this.board[i + 1] && 
                    this.board[i + 1] == this.board[i + 2]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        //horizontal 4x4
        // for(var i = 0; i <= 12; i = i + 4) {
        //     if(this.board[i] !== defEmptyCellSign && 
        //         this.board[i] === this.board[i + 1] && 
        //             this.board[i + 1] == this.board[i + 2] &&
        //                 this.board[i + 2] == this.board[i + 3]) {
        //                     this.result = this.board[i];
        //                     return true;
        //     }
        // }

        //cross 3x3
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(this.board[i] !== defEmptyCellSign && 
                this.board[i] == this.board[i + j] && 
                    this.board[i + j] === this.board[i + 2*j]) {
                        this.result = this.board[i];
                        return true;
            }
        }

        //cross 4x4
        // for(var i = 0, j = 5; i <= 3 ; i = i + 3, j = j - 2) {
        //     if(this.board[i] !== defEmptyCellSign && 
        //         this.board[i] == this.board[i + j] && 
        //             this.board[i + j] === this.board[i + 2*j] &&
        //                 this.board[i + 2*j] === this.board[i + (3*j)]) {
        //                     this.result = this.board[i];
        //                     return true;
        //     }
        // }

        //cross 5x5
        // for(var i = 0, j = 6; i <= 2 ; i = i + 2, j = j - 2) {
        //     if(this.board[i] !== defEmptyCellSign && 
        //         this.board[i] == this.board[i + j] && 
        //             this.board[i + j] === this.board[i + 2*j] &&
        //                 this.board[i + 2*j] === this.board[i + (2*j+6)] &&
        //                     this.board[i + (2*j+6)] === this.board[i + (4*j)]) {
        //                 this.result = this.board[i];
        //                 return true;
        //     }
        // }

        if(this.emptyCells().length == 0) {
            this.result = "draw";
            return true;
        } else {
            return false;
        }
    };
};