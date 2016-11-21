$(document).ready(function() {
    var gameStarted = false;
    var right = 0;
    var wrong = 0;
    var unanswered = 0;
    var btnColors = ['primary', 'warning', 'primary', 'warning'];
    var timeUp;
    // Game Events object
    var gameEvents = {
        questionSequence: -1, // define the sequence of questions
        // Questions, options and answers array
        trivia: [{
            qid: 0,
            question: 'who was the first james bond',
            answers: ['Pierce Brosnan', 'Roger Moore', 'Sean Connery', 'Timothy Dalton'],
            correctAnswer: 'Sean Connery'
        },{
            qid: 1,
            question: 'Who star the movie that Dan "the Instructor" James very excited to see',
            answers: ['Demi Moore', 'Scarlett Johansson', 'Rachel McAdams', 'Lady Gaga'],
            correctAnswer: 'Scarlett Johansson'
        },{
            qid: 2,
            question: '3',
            answers: ['Demi Moore', 'Scarlett Johansson', 'Rachel McAdams', 'Lady Gaga'],
            correctAnswer: 'Scarlett Johansson'
        },{
            qid: 3,
            question: '4',
            answers: ['Demi Moore', 'Scarlett Johansson', 'Rachel McAdams', 'Lady Gaga'],
            correctAnswer: 'Scarlett Johansson'
        }],
        // 30 sec timer with countdown
        counter: 30,
        countStart: function () {
            $('#timer').html('<p>You have: ' + gameEvents.counter + ' seconds</p>');
            count = setInterval(this.countdown, 1000);
        },
        countStop: function() {
            clearInterval(count);
        },
        countReset: function() {
            gameEvents.counter = 30;
        },
        countdown: function() {
            gameEvents.counter--;
            $('#timer').html('<p>You have: ' + gameEvents.counter + ' seconds</p>');
        },
        play: function() {
            gameEvents.countStart();
            $('#startBtn').empty();
            $('#questionArea').empty();
            $('#options').empty();
            $('#resultsBox').empty();
            $('#questionArea').html('<h2>' + this.trivia[this.questionSequence].question) + '</h2>';
            for (var i = 0; i < this.trivia[this.questionSequence].answers.length; i++) {
                var option = $('<button>');
                option.addClass('btn btn-default text-center answer');
                option.attr('data-option', this.trivia[this.questionSequence].answers[i]);
                option.text(this.trivia[this.questionSequence].answers[i]);
                $('#options').append(option);
                $('#options').append('<br>');
            };
            selection();
        },
        // checking function, to check if the answer correct or No
        // displaying a caption and image for 5 seconds either way
        check: function(choise) {
            if (choise == this.trivia[this.questionSequence].correctAnswer) {
                clearTimeout(timeUp);
                right++;
                $('#timer').empty();
                $('#questionArea').empty();
                $('#options').empty();
                $('#resultsBox').empty();
                gameEvents.countStop();
                gameEvents.countReset();
                $('#resultsBox').html('<h2>Correct!</h2>');
                timeUp = setTimeout(gameEvents.nextQuestion, 4000)
            } else {
                clearTimeout(timeUp);
                wrong++;
                $('#timer').empty();
                $('#questionArea').empty();
                $('#options').empty();
                $('#resultsBox').empty();
                gameEvents.countStop();
                gameEvents.countReset();
                $('#resultsBox').html('<h2>Wrong!</h2>');
                timeUp = setTimeout(gameEvents.nextQuestion, 4000)
            }
        },
        timeIsUp: function() {
            clearTimeout(timeUp);
            unanswered++;
            $('#timer').empty();
            $('#questionArea').empty();
            $('#options').empty();
            $('#resultsBox').empty();
            gameEvents.countStop();
            gameEvents.countReset();
            $('#resultsBox').html('<h2>Time is Up!!!</h2>');
            timeUp = setTimeout(gameEvents.nextQuestion, 4000)
        },
        // Next action: 1) go to next question if any left or go to the final results board
        nextQuestion: function() {
            gameEvents.questionSequence++;
            if (gameEvents.questionSequence < gameEvents.trivia.length) {
                gameEvents.play();
                timeUp = setTimeout(gameEvents.timeIsUp, 30000);
            } else {
                gameEvents.finalResults();
            }
        },
        // function to show results after the last question
        finalResults: function() {
            $('#startBtn').empty();
            $('#questionArea').empty();
            $('#options').empty();
            $('#resultsBox').empty();
            $('#resultsBox').append('<h3> Right Answers: ' + right + '</h3>');
            $('#resultsBox').append('<h3> Wrong Answers: ' + wrong + '</h3>');
        },
    }
    // display Start button on page load only
    function startBtn() {
        var startBtn = $('<button>');
        startBtn.addClass('btn btn-default startBtn');
        startBtn.text('START THE TRIVIA');
        $('#startBtn').append(startBtn);
    }
    if (gameStarted == false) {
        startBtn();
    }
    //start button click event, start the questions and timer
    $('#startBtn').on('click', function() {
        gameEvents.nextQuestion();
    });
    // click event listener when click on one of the answers
    function selection() {
        $('.answer').on('click', function() {
            choise = $(this).attr('data-option');
            gameEvents.check(choise);
        });
    };
});