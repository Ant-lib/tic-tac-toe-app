
var currentGame = {};

$(".play_game_btn").click(function() {
    if(typeof currentGame !== "undefined") {
        var cPlayer = new CPlayer();
        currentGame = new Game(cPlayer);
        cPlayer.plays(currentGame);
        currentGame.start();

        $('.play_game_btn').css({'transition':'background-color 0.5s ease', 'opacity': '0.5'});
        $('.play_game_btn').text('playing...');
    }
});

$(".play_new_game_again_btn").click(function() {
    location.reload();
});

$(".board_cell").each(function() {
    $(this).click(function() {
        if(typeof currentGame !== "undefined") {
            if(currentGame.state === gameState.stateCode("RUNNING") && 
                currentGame.currentRound.turn === hTurn && 
                    !$(this).hasClass('blocked')) {
             var cell_index = parseInt($(this).attr('id'));
             var nextRound = new Round(currentGame.currentRound);

             nextRound.board[cell_index] = hTurn;
             displayMove(cell_index, hTurn);
             nextRound.swapTurn();
             currentGame.processMove(nextRound);
            }
        }
    })
});

function displayMove(index, turn) {
    var cellPosition = $($('.board_cell')[index]);

    if(!cellPosition.hasClass('blocked')) {
        cellPosition.html(turn);
        cellPosition.css({color : turn == hTurn ? "green" : "blue"});
        cellPosition.addClass('blocked');
    }
}