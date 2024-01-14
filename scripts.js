$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var numberLimit =  $('#number-limit')
  var limitTxt = $('#limit-txt')
  var secondsLeft = $('#seconds-left')
  var currentScore = $('#current-score')
  var currentProblem = $('#problem')
  var usersAnswer = $('#answer')
  var currentHighScore = $('#high-score')
  var limit = 10;

  currentScore.text(score)
  currentHighScore.text(highScore)


  limitTxt.text(numberLimit.val())

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    secondsLeft.text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    currentScore.text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
          usersAnswer.val('')
          secondsLeft.text('10')
          if(score > highScore){
            highScore = score;
            currentHighScore.text(highScore)
          }
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function (limit) {
    var question = {};
    var num1 = randomNumberGenerator(limit);
    var num2 = randomNumberGenerator(limit);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function (limit) {
    currentQuestion = questionGenerator(limit);
    currentProblem.text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer, limit) {
    if (userInput === answer) {
      renderNewQuestion(limit);
      usersAnswer.val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  usersAnswer.on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer, limit);
  });

    numberLimit.on('input', function(){
      limit = parseInt($(this).val());
      limitTxt.text(limit)

  })

  renderNewQuestion(limit);
});


// let currentScore = 0;
// let highScore = 0;
// let secondsLeft = 10;
// let correctAnswer;
// var interval;

// let random = function(num){
//   return Math.floor(Math.random() * num) + 1;
// }

// let getNumbers = function(limit){
//   return [random(limit), random(limit)]

// }

// let setProblem = function(){
//   let numbers = getNumbers(parseInt($('#number-limit').val()));
//   correctAnswer = numbers.reduce((acc, current) => acc + current, 0);
//   $('#problem').text(numbers[0] + " + " + numbers[1])
// }


// let updateTime = function(amount){
//   secondsLeft += amount;
//   $('#seconds-left').text(secondsLeft);

// }

// let updateScore = function(amount){
//   currentScore += amount;
//   $('#current-score').text(currentScore);
// }

// let checkAnswer = function(){
//   let userAnswer = $('#answer')
//   isRight = parseInt(userAnswer.val()) === correctAnswer;

//   if(isRight){
//     setProblem();
//     userAnswer.val('');
//     updateTime(1);
//     updateScore(1);

//   }
//   if(currentScore > highScore){
//     highScore = currentScore;
//     $('#high-score').text(highScore);
//   }
// }

// let startGame = function(){
//   if(!interval ){
//     if(secondsLeft === 0){
//       updateTime(10)
//       updateScore(-currentScore)
//       setProblem()
//     }

//   }
//   interval = setInterval(function(){
//     updateTime(-1)

//     if(secondsLeft === 0 ){
//       clearInterval(interval);
//       interval = undefined;

//     }

//   }, 1000)

// }


// $(document).ready(function(){
//   const numberLimit =  $('#number-limit')
//   const limitTxt = $('#limit-txt')
//   const currentScoreSp = $('#current-score')
//   const highScoreSp = $('#high-score')

//   const seconds = $('#seconds-left')

//   const answer = $('#answer')


//   currentScoreSp.text(currentScore)
//   highScoreSp.text(highScore)

//   seconds.text(secondsLeft)
//   limitTxt.text(numberLimit.val())

//   numberLimit.on('input', function(){
//     limitTxt.text($(this).val())

//   })


//   answer.on('keyup', function () {
//     startGame()
//     checkAnswer()

//   })

//   setProblem()

// })
