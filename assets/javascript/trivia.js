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
            question: 'who was the first james bond',
            answers: ['Pierce Brosnan', 'Roger Moore', 'Sean Connery', 'Timothy Dalton'],
            correctAnswer: 'Sean Connery',
            image: 'assets/images/james.gif',
        },{
            question: 'Who stars the movie that Dan "the Instructor" James is very excited to see',
            answers: ['Demi Moore', 'Scarlett Johansson', 'Rachel McAdams', 'Lady Gaga'],
            correctAnswer: 'Scarlett Johansson',
            image: 'assets/images/scarlett.gif',
        },{
            question: 'Who was the first programmer in history',
            answers: ['Grace Hopper', 'Frances Spence', 'Leah Culver', 'Ada Lovelace'],
            correctAnswer: 'Ada Lovelace',
            image: 'assets/images/programmer.gif',
        },{
            question: 'The first ',
            answers: ['Claude Monet', 'Berthe Morisot', 'Edgar Degas', 'Paul Gauguin'],
            correctAnswer: 'Claude Monet',
            image: 'assets/images/artist.gif',
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
                option.addClass('btn text-center answer');
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
                $('#resultsBox').append('<h2>Correct!</h2>');
                $('#resultsBox').append('<img src='+ this.trivia[this.questionSequence].image +' />');
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
                $('#resultsBox').append('<h2>Wrong!</h2>');
                $('#resultsBox').append('<h4>The right answer is: <span>' + this.trivia[this.questionSequence].correctAnswer + '</span></h4>');
                $('#resultsBox').append('<img src='+ this.trivia[this.questionSequence].image +' />');
                timeUp = setTimeout(gameEvents.nextQuestion, 4000)
            }
        },
        // below function called when 30 seconds end without clicking
        timeIsUp: function() {
            clearTimeout(timeUp);
            unanswered++;
            $('#timer').empty();
            $('#questionArea').empty();
            $('#options').empty();
            $('#resultsBox').empty();
            gameEvents.countStop();
            gameEvents.countReset();
            $('#resultsBox').append('<h2>Time is Up!!!</h2>');
            $('#resultsBox').append('<h4>The right answer is: <span>' + gameEvents.trivia[gameEvents.questionSequence].correctAnswer + '</span></h4>');
            $('#resultsBox').append('<img src='+ gameEvents.trivia[gameEvents.questionSequence].image +' />');
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
            $('#resultsBox').append('<h3> Unanswered: ' + unanswered + '</h3>');
            var playAgain = $('<button>');
            playAgain.text('Play Again??');
            playAgain.addClass('btn resetBtn');
            $('#resultsBox').append(playAgain);
        },
    }
    // display Start button on page load only
    function startBtn() {
        var startBtn = $('<button>');
        startBtn.addClass('btn startBtn');
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
    //
    $('.resetBtn').on('click', function() {
        $('#startBtn').empty();
        $('#questionArea').empty();
        $('#options').empty();
        $('#resultsBox').empty();
        gameEvents.questionSequence = -1
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