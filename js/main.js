
// -----------------------VARIABLES---------------//

let singlePlayer = false;
let doublePlayer = false;

let moveCount = 0 ;

const $board = $('#board');
const $start = $('#start');
const $finish = $('#finish');

const $buttonSinglePlayerGame = $('#singlePlayer')
const $buttonDoublePlayerGame = $('#doublePlayer')
const $buttonStartGame  = $('#startGame');
const $buttonRestartGame = $('#finish a');

const $inputNamePlayer1 = $('#namePlayer1');
const $inputNamePlayer2 = $('#namePlayer2');
const $namePlayer1  = $('#name1');
const $namePlayer2  = $('#name2');

const $player1 = $('#player1')
const $player2 = $('#player2')


const box = $('.box');

//-------------  WINNING COMBINATIONS--------------//

const winningCombinations = [

      [box[0],box[1],box[2]], // ROW 1
      [box[3],box[4],box[5]], // ROW 2
      [box[6],box[7],box[8]], // ROW 3
      [box[0],box[3],box[6]], // COL 1
      [box[1],box[4],box[7]], // COL 2
      [box[2],box[5],box[8]], // COL 3
      [box[0],box[4],box[8]], // DIG 1
      [box[2],box[4],box[6]]  // DIG 2

];

//--------------------------FUNCTIONS---------------------------//

// Function loads start screen
function startScreen(){
  $board.hide();
  $finish.hide();
  $buttonStartGame.hide();
  $inputNamePlayer1.hide();
  $inputNamePlayer2.hide();
};

// FUNCTIONS TO CHOOSE SINGLE OR DOUBLE PLYAER GAME

function chooseSinglePlayerGame(){
  $buttonSinglePlayerGame.on('click',()=>{
    $inputNamePlayer1.show();
    $inputNamePlayer2.hide();
    singlePlayer = true;
    doublePlayer = false;
  })
};

function chooseDoublePlayerGame(){
  $buttonDoublePlayerGame.on('click',()=>{
    $inputNamePlayer1.show();
    $inputNamePlayer2.show();
    singlePlayer = false;
    doublePlayer = true;
  })
};

// FUNCTIONS TO ADD PLAYER NAMES FOR SINGLE OR DOUBLE PLAYER GAME

function hidestartGameButtons(){
  $buttonStartGame.show();
  $buttonSinglePlayerGame.hide();
  $buttonDoublePlayerGame.hide();

}

function addNamesSinglePlayerGame(){
  $inputNamePlayer1.on('keyup',()=>{
    $namePlayer1.text($inputNamePlayer1.val());
    if(singlePlayer === true &&  $namePlayer1.text().length > 1){
      hidestartGameButtons();
      $inputNamePlayer2.val('Computer');
    }
  })
};

function addNamesDoublePlayerGame(){
 $('#namePlayer1 , #namePlayer2').on('keyup',()=>{
    $namePlayer1.text($inputNamePlayer1.val());
    $namePlayer2.text($inputNamePlayer2.val());
    if($namePlayer1.text().length > 1 && $namePlayer2.text().length > 1 && doublePlayer === true){
      hidestartGameButtons();
    }
  })
};

// FUNCTIONS TO START SINGLE OR DOUBLE PLAYER GAMES

function startSinglePlayerGame(){
  chooseSinglePlayerGame();
  addNamesSinglePlayerGame();
}

function startDoublePlayerGame(){
  chooseDoublePlayerGame();
  addNamesDoublePlayerGame();
};

// FUNCTIONS FOR MOUSEOVER - MOUSEOUT EVENTS

function onMouseover(event){
  if($player1.hasClass('active')){
    $(event.target).css('background-image','url(img/o.svg)');
  }else if($player2.hasClass('active')){
    $(event.target).css('background-image','url(img/x.svg)');
  }
};

function onMouseout(){
  if($player1.hasClass('active')){
    $(event.target).css('background-image',"");
    $(event.target).removeAttr('style');
  }else if($player2.hasClass('active')){
    $(event.target).css('background-image',"");
    $(event.target).removeAttr('style');
  }
};

// FUNCTIONS FOR PLAYER'S MOVES

function player1Move(){
  $(event.target).addClass('box-filled-1');
  $(event.target).off();                    // FREEZE THE CLICKED BOX
  $player1.removeClass('active');
  $player2.addClass('active');
  moveCount += 1;
};

function player2Move(){
  $(event.target).addClass('box-filled-2');
  $(event.target).off();
  $player2.removeClass('active');
  $player1.addClass('active');
  moveCount += 1;
};

function computersMove(){
  let emptyBoxes = $( ".box" ).filter(function( index ) {
                     return ( this.classList ).length === 1;
                    });
  let randomBox  = emptyBoxes.eq(Math.floor(Math.random()*(emptyBoxes.length)));  // RANDOM BOX
  randomBox.addClass('box-filled-2').off();   // FREEZE THE CLICKED BOX
  $player2.removeClass('active');
  $player1.addClass('active');
  moveCount += 1;
};

// FUNCTIONS FOR PLAYER MOVES AS PER GAME TYPE

function singlePlayerBoxClick(){
  if($player1.hasClass('active')){
    player1Move();
    computersMove();
  }
};

function doublePlayerBoxClick(){
   if($player1.hasClass('active')){
     player1Move();
   }else if($player2.hasClass('active')){
     player2Move();
  }
};

// FUNCTIONS TO CHECK THE OUT-COME OF THE GAME  AND PRINT THE RELEVENT SCREEN

function player1Wins(element){
  return element.classList.contains('box-filled-1');
};

function player2Wins(element){
  return element.classList.contains('box-filled-2');
};


function findTheWinner(){

for (let i = 0 ; i < winningCombinations.length;i++){
  if(winningCombinations[i].every(player1Wins)){
    console.log('Player 1 is winner');
    $('.message').text(`Winner is ${$namePlayer1.text()}`);
    $board.hide();
    $finish.show().addClass('screen-win-one');
    break;
  } else if(winningCombinations[i].every(player2Wins)){
    console.log('Player 2 is winner');
    $('.message').text(`Winner is ${$namePlayer2.text()}`);
    $board.hide();
    $finish.show().addClass('screen-win-two');
    break;
    }
  }

  if(moveCount >= 9 && $('.message').text() === ''){
    $('.message').text("It's a Tie!");
    $finish.show().addClass('screen-win-tie');
  }
};

// FUNCTION TO UNFREEZE THE CLICK AND HOVER

function unfreezeBox(){
 $('.box').on('mouseover',onMouseover);
 $('.box').on('mouseout',onMouseout);

 if(singlePlayer === true){
  $('.box').on('click',singlePlayerBoxClick);
 }
 if(doublePlayer === true){
  $('.box').on('click',doublePlayerBoxClick);
 }
}

// FUNCTION TO SHOW BOARD WHEN GAME IS PLAYED THE FIRST TIME

function startGame(){
  $start.hide();
  $finish.hide();
  $board.show();
  $player1.addClass('active');
  unfreezeBox();
  $('.boxes').on('click',findTheWinner);
}

// FUNCTION TO REFRESH THE BOARD FOR A NEW GAME

function startNewGame(){
  moveCount = 0;
  $('#player1 , #player2').removeClass('active');
  $player1.addClass('active');
  $('.box').removeClass('box-filled-1 box-filled-2');
  $('.box').removeAttr('style');
  $('.box').off();
  unfreezeBox();
  $('.message').text('');
  $finish.removeClass('screen-win-one screen-win-two screen-win-tie');

  $finish.hide();
  $board.show();
};


//--------------CALL THE FUNCTIONS------------//

startScreen();
startSinglePlayerGame();
startDoublePlayerGame();
$buttonStartGame.on('click',startGame);
$buttonRestartGame.on('click',startNewGame);







