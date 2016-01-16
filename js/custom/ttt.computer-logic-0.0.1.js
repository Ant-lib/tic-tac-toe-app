
var ComputerPlayerTurn = function(cellPosition) {

    this.moveCost = 0;
    this.ascOrder = false;
    this.nextMovePosition = cellPosition;

    this.getRound = function(round) {
        var next = new Round(round);
        next.board[this.nextMovePosition] = round.turn;
        if(round.turn === cTurn) next.count++;
        next.swapTurn();

        return next;
    }
};

var CPlayer = function() {

    var currentGame = {};

    function calcMoveCost(round) {
        if(round.noMoreMoves()) {
            return Game.result(round);
        } else {
            var roundCost;

            roundCost = round.turn === hTurn ? roundCost = -10 : roundCost = 10;

            var potentialMoves = round.emptyCells().map(function(cellPosition) {
                var move = new ComputerPlayerTurn(cellPosition);
                var nextRound = move.getRound(round);

                return nextRound;
            });

            potentialMoves.forEach(function(nextRound) {
                var nextScore = calcMoveCost(nextRound);
                if(round.turn === hTurn) {
                    if(nextScore > roundCost) roundCost = nextScore;
                } else {
                    if(nextScore < roundCost) roundCost = nextScore;
                }
            });

            return roundCost;
        }
    }

    function makeMove(turn) {
        var availableMoves = currentGame.currentRound.emptyCells().map(function(cellPosition) {
            var move =  new ComputerPlayerTurn(cellPosition);
            move.moveCost = calcMoveCost(move.getRound(currentGame.currentRound));
            return move;
        });

        ComputerPlayerTurn.ascOrder = turn === hTurn;
        availableMoves.sort(ComputerPlayerTurn.ordered);
        displayMove(availableMoves[0].nextMovePosition, turn);
        currentGame.processMove(availableMoves[0].getRound(currentGame.currentRound));
    }

    this.plays = function(game){
        currentGame = game;
    };

    this.notify = function(currTurn) {
        makeMove(currTurn);
    };
};


ComputerPlayerTurn.ordered = function(firstMove, secondMove, order) { 
    if(firstMove.moveCost == secondMove.moveCost) {
        return 0;
    } else {
        if(order) {
            if(firstMove.moveCost > secondMove.moveCost)
                return -1;
            else if(firstMove.moveCost < secondMove.moveCost)
                return 1;
        } else {
            if(firstMove.moveCost < secondMove.moveCost)
                return -1;
            else if(firstMove.moveCost > secondMove.moveCost)
                return 1;
        }    
    }  
}