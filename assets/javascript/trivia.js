$(document).ready(function() {
    var gameStarted = false;
    var right = 0;
    var wrong = 0;
    var unanswered = 0;

    var btnColors = ['primary', 'warning', 'primary', 'warning']
    var gameEvents = {
        questionSequence: 0,
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
        }],

        play: function() {
            $('#startBtn').empty();
            $('#questionArea').html('<h2>' + this.trivia[this.questionSequence].question) + '</h2>';
            for (var i = 0; i < this.trivia[this.questionSequence].answers.length; i++) {
                var option = $('<button>');
                option.addClass('btn btn-info text-center option');
                option.attr('data-option', this.trivia[this.questionSequence].answers[i]);
                option.text(this.trivia[this.questionSequence].answers[i]);
                $('#options').append(option);
                $('#options').append('<br>')
            }
        }
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
    //start button click event
    $('#startBtn').on('click', function() {
        gameEvents.timer();
        gameEvents.play();
    })
});