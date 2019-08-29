// ------------VARIABLES---------------

//  Button Colors
var btnColors = ['green', 'red', 'yellow', 'blue'];
// Game generated pattern for the user to match
var gamePattern = [];
// User click patterns
var userPattern = [];
// Boolean that indicates whether or not the game has started
var gameStart = false;
// The level the user is on
var level = 0;

// ------------JQUERYS---------------

// Detect when a keyboard key has been pushed
$(document).keydown(function() {
  // If the game has started
  if (!gameStart){
    // Change the title to the level the user is currently on
    $('.level-title').text('Level ' + level);
    // Create a new sequence
    nextSequence();
    // Prevent a new sequence from being created
    gameStart = true;
  }
});

// Detect if a button is clicked
$('.btn').click(function() {

  // Store the id of the button that was clicked into a variable
  var userChosenColor = $(this).attr('id');
  //  Add the value of userChosenColor to the end of userPattern
  userPattern.push(userChosenColor);

  // Play an audio file relative to the value of userChosenColor
  playAudio(userChosenColor);
  // Add shadow-box animation
  animateBtnClick(userChosenColor);

  // Check whether the user's answer is correct
  checkAnswer(userPattern.length-1);
});

// ------------FUNCTIONS---------------

// Check whether the user's answers are correct
function checkAnswer(currentLevel) {

  // Check whether the user's most recent answer is the same as the game's pattern
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    // Confirm whether the user has finished their answer
    if (userPattern.length === gamePattern.length)
      // Call nextSequence with a 1000 millisecond delay
      setTimeout(function() {
        nextSequence()
      }, 1000)
  }else{
    // Play wrong.mp3
    playAudio('wrong');
    // Add game-over class to body
    $('body').addClass('game-over');
    // Remove game-over from body after 200 milliseconds
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    // Change h1 title
    $('.level-title').text('Game Over, Press Any Key to Restart');
    // Restart the game
    resetGame();
  }
}

// Create a new sequence
function nextSequence() {

    // Reset userPattern to make it ready for the next level
    userPattern = [];
    // Increase the value of level by 1
    level++;
    // Update h1 with level's new value
    $('.level-title').text('Level ' + level);

    // Generate a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // Select a random color from btnColors
    var randomColor = btnColors[randomNumber];
    // Add randomColor to the end of gamePattern
    gamePattern.push(randomColor);

    // Create a flash animation
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Play an audio file relative to the value of randomColor
    playAudio(randomColor);
}

// Add a box-shadow animation on button clicks
function animateBtnClick(colorClicked) {

  // Add the clicked class to the button that was clicked
  $('#' + colorClicked).addClass('clicked');

  // Remove the clicked class after 100 milliseconds
  setTimeout(function() {
    $('#' + colorClicked).removeClass('clicked');
  }, 100);
}

// Play an audio file
function playAudio(color) {

  // Create a new Audio object for each color
  var audio = new Audio('assets/sounds/' + color + '.mp3')
  // Play the audio file
  audio.play();
}

// Reset the game
function resetGame() {

  // Reset the level, gamePattern and gameStart variables
  level = 0;
  gamePattern = [];
  gameStart = false;
}
