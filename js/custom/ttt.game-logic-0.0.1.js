
var defEmptyCellSign = "*";
var defBoardSizeDim = 3;
var hTurn = "X";
var cTurn = "O";


var gameState = [
    {
        "stateName": "IDLE",
        "stateCode": -1
    },
    {
        "stateName": "INIT",
        "stateCode": 0
    },
    {
        "stateName": "RUNNING",
        "stateCode": 1
    },
    {
        "stateName": "END",
        "stateCode": 2
    }
]

gameState.stateCode = function(stateName) {
    return $.grep(gameState, function(e){return e.stateName === stateName;})[0].stateCode;
}

var Game = function(cPlayer) {

    this.cPlayer = cPlayer;
    this.currentRound = new Round();
    this.currentRound.board = Array.apply(null, Array(Math.pow(defBoardSizeDim, 2))).map(() => defEmptyCellSign);
    this.currentRound.turn = hTurn;
    this.state = gameState.stateCode("INIT");

    this.start = function() {
        if(this.state === gameState.stateCode("INIT")) {
            this.processMove(this.currentRound);
            this.state = gameState.stateCode("RUNNING");
        }
    }

    this.processMove = function(currentRound) {
        this.currentRound = currentRound;
        if(currentRound.noMoreMoves()) {
            this.state = gameState.stateCode("END");
            if(currentRound.result === "X") {
                console.log("Human won!!!");
            } else if(currentRound.result === "O") {
                console.log("Human lost!!!");
            } else {
                console.log("Draw!!!");
            }

            $('.play_new_game_again_btn').fadeIn();
        } else {
            if(this.currentRound.turn === hTurn) {
                console.log("Make your move");
            } else {
                console.log("Waiting..");
                this.cPlayer.notify(cTurn);
            }
        }
    };
};

Game.result = function(game) {
    if(game.result === "X") {
        return 1;
    } else if(game.result === "O") {
        return -1;
    } else {
        return 0;
    }
}