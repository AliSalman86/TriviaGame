$(document).ready(function() {
    var gameStarted = false;
    var right = 0;
    var wrong = 0;
    var unanswered = 0;
    var btnColors = ['primary', 'warning', 'primary', 'warning'];
    var selection;
    // Game Events object
    var gameEvents = {
        questionSequence: 0, // define the sequence of questions
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
            $('#startBtn').empty();
            $('#questionArea').empty();
            $('#options').empty();
            $('#questionArea').html('<h2>' + this.trivia[this.questionSequence].question) + '</h2>';
            for (var i = 0; i < this.trivia[this.questionSequence].answers.length; i++) {
                var option = $('<button>');
                option.addClass('btn btn-info text-center answer');
                option.attr('data-option', this.trivia[this.questionSequence].answers[i]);
                option.text(this.trivia[this.questionSequence].answers[i]);
                $('#options').append(option);
                $('#options').append('<br>');
            };
            selection();
        },
        // checking function, to check if the answer correct or No
        check: function(choise) {
            if (choise == this.trivia[this.questionSequence].correctAnswer) {
                $('#resultsBox').html('<h2>Correct!</h2>');
                right++;
                this.countReset();
            } else {
                $('#resultsBox').html('<h2>Wrong!</h2>');
                wrong++;
                this.countReset();
            }
            this.questionSequence++;
            if (this.questionSequence == this.trivia.length) {
                this.finalResults();
            }
            else if (this.questionSequence < this.trivia.length) {
                this.play();
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
        startBtn.addClass('btn btn-primary startBtn');
        startBtn.text('START THE TRIVIA');
        $('#startBtn').append(startBtn);
    }
    if (gameStarted == false) {
        startBtn();
    }
    //start button click event, start the questions and timer
    $('#startBtn').on('click', function() {
        gameEvents.countStart();
        gameEvents.play();
    });
    // click event listener when click on one of the answers
    function selection() {
        $('.answer').on('click', function() {
            choise = $(this).attr('data-option');
            gameEvents.check(choise);
        });
    };
});