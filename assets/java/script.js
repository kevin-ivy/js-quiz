//Define Global Variables
var score = 0;
var highScores = [];
var displayScore = document.querySelector("#view-score");
var returnPage = document.querySelector('#intro-page');
var introPage = document.getElementById("intro-page").innerHTML;
var viewingScores = false;

//View High Scores
function showHighScore() {
        var highScoreHTML = "<h2>High Scores</h2>";
        var displayScore = document.querySelector("#intro-page");
        displayScore.className = "quiz-intro scoreboard";
        displayScore.innerHTML = highScoreHTML;
    
        //Create Score Holder Box
        var scoreBox = document.createElement('div');
        scoreBox.className = 'scorebox';
    
        displayScore.appendChild(scoreBox);
    
        //Display Scores in the Scorebox
        if (highScores && highScores.length === 0) {
            scoreBox.textContent = "No Scores Found."
        } else {
            scoreBox.innerHTML = highScores.name + ": " + highScores.score;
        }
    
        //create Go Back button
        var returnButtonEl = document.createElement('button');
        returnButtonEl.textContent = 'Go Back';
        returnButtonEl.className = 'btn';
        returnButtonEl.id = 'return-btn';
        displayScore.appendChild(returnButtonEl);    
};

// Call High Score Display
displayScore.addEventListener("click", showHighScore);

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