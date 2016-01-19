
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
                $(".board_message").html("You won!!!");
            } else if(currentRound.result === "O") {
                $(".board_message").html("You lost!!!");
            } else {
                $(".board_message").html("Draw!!!");
            }

            $(".play_game_btn").fadeOut(500,function(){
                $(".play_new_game_again_btn").fadeIn(700).css("display","block");
            });
        } else {
            if(this.currentRound.turn === hTurn) {
                $(".board_message").html("Make your move");
            } else {
                $(".board_message").html("Waiting...");
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