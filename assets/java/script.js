//Define Global Variables
var score = 0;
var highScores = [];
var pageEl = document.querySelector('body');
var displayScore = document.querySelector("#view-score");
var returnPage = document.querySelector('#intro-page');
var introPage = document.getElementById("intro-page").innerHTML;
var startQuiz = document.querySelector('#start-quiz');
var timeLeft = document.querySelector('#countdown');
var quizQuestion = document.querySelector('.question');
var quizChoices = document.querySelector('.answers');
var questionIndex = 0;
var timer = 0;
var viewingScores = false;
var takingQuiz = false;
var currentAnswers = [];

//Store quiz questions and answers
var quiz = [
    {q: "What is the correct syntax to use a javascript file?", c: ["<script src='xxx.js'>", "<script href='xxx.js'>", "<script path='xxx.js'>", "<script link='xxx.js'>"], a: "<script src='xxx.js'>"}, 
    {q: "How would you write 'Hello World' with alert?", c: ["alertBox('Hello World')", "alert('Hello World')", "msg('Hello World')","msgBox('Hello World')"], a: "alert('Hello World')"},
    {q: "How would you use comment in Javascript?", c: ["{#...#}", "<!--..--!>", "//..", "\\.."], a: "//.."},
    {q: "What is the correct way to declare an array in Javascript?", c: ["var names = ['Barbie', 'Judy', 'Lala']", "var names = array('Barbie', 'Judy', 'Lala')", "var name = 'Barbie', 'Judy', 'Lala'", "var names =[0]=>'Barbie',[1]=>'Judy',[2]=>'Lala'"], a: "var names = ['Barbie', 'Judy', 'Lala']"},
    {q: "How do you find the max of x and y?", c: ["ceil(x,y)", "max(x,y)", "Math.max(x,y)", "top(x,y)"], a: "Math.max(x,y)"}
];

//Launch Quiz
function beginQuiz() {
    var hideIntroEl = document.querySelector("#intro-page");
        hideIntroEl.className = "quiz-intro";
        hideIntroEl.innerHTML = "";
        currentChoices = quiz[0].c;
        currentAnswer = quiz[0].a;
        quizQuestion.textContent = quiz[0].q;

        for (i =0; i < 4; i++) {
            var newButtonEl = document.createElement('button');
            newButtonEl.className = 'btn answer-item';
            newButtonEl.id = 'choice' + i;
            newButtonEl.setAttribute('value', currentChoices[i]);
            newButtonEl.setAttribute('onclick', 'checkAnswer(this, currentAnswer)');
            newButtonEl.textContent = currentChoices[i];
            quizChoices.appendChild(newButtonEl);
        }
};

function checkAnswer(btn) {
    var choiceMade = btn.value;
    if (choiceMade === currentAnswer) {
        score++;
    } else {
        timer -= 15;
    }
    if (questionIndex < 4) {
        questionIndex++;
        loadNextQuestion();
    } else {
        showResults();
    }
};

function loadNextQuestion() {
    currentAnswer = quiz[questionIndex].a;
    currentChoices = quiz[questionIndex].c;
    quizQuestion.textContent = quiz[questionIndex].q;

    for (i =0; i < 4; i++) {
        var button = document.getElementById('choice' + i);
        button.setAttribute('value', currentChoices[i]);
        button.textContent = currentChoices[i];
    }
};

//View High Scores
function showHighScore() {
        var displayScore = document.querySelector("#intro-page");
        displayScore.className = "quiz-intro scoreboard";
        displayScore.innerHTML = "<h2>High Scores</h2>";
    
        //Create Score Holder Box
        var scoreBox = document.createElement('div');
        scoreBox.className = 'scorebox';
    
        displayScore.appendChild(scoreBox);

        //Display Scores in the Scorebox
        if (highScores && highScores.length === 0) {
            scoreBox.textContent = "";
        } 
        else {
            for (i = 0; i < highScores.length; i++) {
                var rank = i + 1;
                scoreBox.innerHTML += rank + " - " + highScores[i].name + ": " + highScores[i].score + "</br>";
            }
        }
    
        //create Go Back button
        var returnButtonEl = document.createElement('button');
        returnButtonEl.textContent = 'Go Back';
        returnButtonEl.className = 'btn';
        returnButtonEl.id = 'return-btn';
        displayScore.appendChild(returnButtonEl);    

        //Create Clear Scores button
        var clearButtonEl = document.createElement('button');
        clearButtonEl.textContent = 'Clear Scores';
        clearButtonEl.className = 'btn';
        clearButtonEl.style.marginLeft = "10px";
        clearButtonEl.id = 'clear-btn';
        displayScore.appendChild(clearButtonEl);
};


// Return to title after viewing high scores
function returnToTitle() {
    var returnPage = document.querySelector('#intro-page');
    returnPage.innerHTML = introPage;
};

//Call return to home page
returnPage.addEventListener("click", function(event){
    if (event.target && event.target.id ==='return-btn') {
        returnToTitle();
    }
});

//Create Timer and set to 1 Minute
function quizTimer () {
    var timeInterval = setInterval(function () {
        timeLeft.textContent = timer;
        timer--;

        if (timer === 0) {
            timeLeft.textContent = 0;
            clearInterval(timeInterval);
            outOfTime();
        }
    }, 1000);
};

//Run if Time hits 0
function outOfTime() {
    showResults();
};

//Show the results and let the player input their initials
function showResults() {
    var quizQuestion = document.querySelector('.question');
    var quizChoices = document.querySelector('.answers');

    quizQuestion.innerHTML = '';
    quizChoices.innerHTML = '';

    var resultsScreen = document.querySelector('#intro-page')
    resultsScreen.className = "quiz-intro results";
    resultsScreen.innerHTML = "<h2>You scored " + score + "</h2>"

    //Create box to submit initials
    var submitScore = document.createElement('div');
    submitScore.style.paddingTop = "10px";
    submitScore.className = "submit-name";
    submitScore.textContent = 'Enter Initials: ';
    resultsScreen.appendChild(submitScore);

    var scoreBox = document.createElement('form');
    scoreBox.setAttribute("id", "highScore")
    submitScore.appendChild(scoreBox);

    var nameInput = document.createElement('input');
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "player-name");
    nameInput.setAttribute("placeholder", "Initials Here");
    nameInput.setAttribute("onkeydown", "limit(this)");
    nameInput.setAttribute("onkeyup", "limit(this)");
    submitScore.appendChild(nameInput);

    var submitDiv = document.createElement('div');
    submitDiv.style.marginTop = "20px";
    resultsScreen.appendChild(submitDiv);

    var submitBtn = document.createElement('btn');
    submitBtn.className = 'btn submit-score';
    submitBtn.textContent = 'Submit Score';
    submitDiv.appendChild(submitBtn);
};

function submitHighScore() {
    scoreInput = score;
    var nameInput = document.querySelector("input[name='player-name']").value.toUpperCase();

    if (!nameInput) {
        alert("You need to input your initials.");
        return false;
    }

    var highScoreObj = {
        name: nameInput,
        score: scoreInput
    };
    highScores.push(highScoreObj);
    highScores.sort((a,b) => (b.score > a.score) ? 1: -1);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    takingQuiz = false;
    returnToTitle();
};

function loadScores() {
    var savedScores = localStorage.getItem('highScores');

    //check for null scores list
    if (!savedScores) {
        return false;
    }

    //convert scores back into array of objects
    highScores = JSON.parse(savedScores);
};

function limit(element) {
    var max_chars = 2;
    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

//Create function to handle general click events
function buttonClickHandler(event) {
    var targetEl = event.target;
    if (targetEl.matches('#view-score')) {
        if (takingQuiz){
            return false;
        } else {
            showHighScore();
        }
    }
    else if (targetEl.matches('#start-quiz')) {
        takingQuiz = true;
        timer = 60;
        quizTimer();
        beginQuiz();
    }
    else if (targetEl.matches('.submit-score')) {
        submitHighScore();
    }
    else if (targetEl.matches('#clear-btn')) {
        if (highScores.length === 0) {
            return false;
        }
        highScores = [];
        localStorage.clear();
        returnToTitle();
    }
    //else if (targetEl.matches'#)
};

loadScores();


//Run function when a click is made
pageEl.addEventListener("click", buttonClickHandler)

