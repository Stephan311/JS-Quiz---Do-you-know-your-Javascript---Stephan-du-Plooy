//array to store all of the questions of the quiz
var questions = [
  {
    title: "String values must be enclosed within ____ when being assigned to variable",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
      title: "Common data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
      answer: "console.log"
    }, 
    {
      title: "The condition in an if/else statement is enclosed with ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    }, 
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all answers to the left"],
      answer: "all answers to the left"
    }, 
] 

//setting the variables that communicate numbers
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//countdown timer is started when the start button is clicked

function start() {

  timeLeft = 75;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  
  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //game is ended when time left = 0
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }

  }, 1000);

  next();

}

//timer is stopped to end the game

function endGame() {
  clearInterval(timer);

  //game over message is displayed once the endGame function is run (researched how to do this method)
  var quizContent = `
  <h2>Game Over</h2>
  <h3>You got a ` + score + ` /100</h3>
  <h3>You Got ` + score / 20 + ` questions correct</h3>
  <input type="text" id="name" placeholder="First name">
  <button onclick="setScore()">Set Score</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;

}

//scores get stored to local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById('name').value);
  getScore();
}

//grabs score from local storage and displays on the screen
function getScore() {
  var quizContent = `
  <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br>

  <button onclick="clearScore()">Clear Score</button><button onclick="resetGame()">Play Game Again!</button>

  `;

  document.getElementById("quizBody").innerHTML = quizContent;

}

//score is cleared from local storage when "clear score" button is pressed
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//function for resetting the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  //the start screen of the entire quiz (researched how to do this)
  var quizContent = `
  <h1>
      JS Quiz
  <h1>
  <h3>
      Press the start button to play
  </h3>
  <button onclick="start()">Start</button`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//15 seconds from the timer is deducted every time the question is answered incorrecty
function incorrect() {
  timeLeft -= 15;
  next();
}

//score is increased by 20 points for every right answer
function correct() {
  score += 20;
  next();
}

//loops through the array of questions
function next() {
  currentQuestion++;
//end function if all questions have been answered
  if (currentQuestion > questions.length -1) {
    endGame();
    return;
  }

  //apply and display the questions on the screen (researched how to do part of this)

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  for  (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
  }

  document.getElementById("quizBody").innerHTML = quizContent;

}







