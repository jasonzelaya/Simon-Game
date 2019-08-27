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


// ------------JQUERYS---------------
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
});



// ------------FUNCTIONS---------------
// Choose a random color
function nextColor() {
    // Generate a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // Select a random color from btnColors
    var randomColor = btnColors[randomNumber];
    // Add randomColor to gamePattern
    gamePattern.push(randomColor);

    // Create a flash animation
    $("." + randomColor).fadeOut(100).fadeIn(100).fadeOut(100);
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
  var audio = new Audio('sounds/' + color + '.mp3')
  audio.play();
}
