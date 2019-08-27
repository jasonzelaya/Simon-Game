// TODO
// choose random color patterns
// display the color pattern for the user to match
// add sounds when the buttons are clicked
// add animations when the buttons are clicked
// start/end game
// confirm right/wrong answers
// game over events
// restart the game


// ------------VARIABLES---------------
//  Button Colors
var btnColors = ['red', 'green', 'blue', 'yellow'];
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
    // Call nextSequence()
    nextSequence();
    // Prevent a new sequence from starting
    gameStart = true;
  }
});

// Detect if a button is clicked
$('.btn').click(function() {

  // Store the id of the button that was clicked into a variable
  var userChosenColor = $(this).attr('id');
  //  Add the value of userChosenColor to the end of userPattern
  userPattern.push(userChosenColor);
  // Confirm it is working properly in Chrome Developer Tools
  console.log(userPattern);

  // Play an audio file relative to the value of userChosenColor
  playAudio(userChosenColor);
  // Add shadow-box animation
  animateBtnClick(userChosenColor);

  // Check whether the user's answer is correct
  checkAnswer(userPattern.length-1);
});




// ------------FUNCTIONS---------------
// Create a new sequence
function nextSequence() {

    // Reset userPattern to make it ready for the next level
    userPattern = [];
    // Increase the value of level by 1
    level++;
    // Update the level title with level's new value
    $('.level-title').text('Level ' + level);

    // Generate a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // Select a random color from btnColors
    var randomColor = btnColors[randomNumber];
    // Add randomColor to gamePattern
    gamePattern.push(randomColor);

    // Create a flash animation
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Play an audio file relative to the value of randomColor
    playAudio(randomColor);
}

// Play an audio file
function playAudio(color) {

  // Create a new Audio object for each color
  var audio = new Audio('sounds/' + color + '.mp3')
  // Play the audio file
  audio.play();
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

// Check whether the user's answers are correct
function checkAnswer(currentLevel) {

  // Check whether the user's most recent answer is the same as the game's pattern
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    // Confirm whether the user has finished their answer
    if (userPattern.length === gamePattern.length)
      // Call nextSequence with a 1000 millisecond delay
      setTimeout(function() {
        nextSequence()
      }, 1000)
  }else{
    console.log('wrong');
  }
}
