let counter = 0;
let idCounter = 0;
let idNames = ["row1", "row2", "row3"];
let guessedWords = [];
let score = 0;

function timer() {
    // function to make a countdown
    let timeLeft = 30;
    let countdown = setInterval(function() {
        document.getElementById("timer").innerHTML = "Time Left: " + timeLeft--;

        // when timer reaches 0
        if(timeLeft < 0) {
            clearInterval(countdown);
            let input_box = document.getElementById("input");
            input_box.disabled = true;
            if(score > 15) {
                alert("Congratulations! You've ridden the Word Wave to an impressively high score. \nYour score: " + score)
            }

            else if(score > 10) {
                alert("Impressive! This is a really good score! \n Your score: " + score);
            }

            else if(score > 5) {
                alert("You're on your way! Keep riding that wave of words! \nYour score: " + score);
            }

            else {
                alert("You're gaining momentum! Keep at it and watch those scores soar! \nYour score: " + score);
            }
        }
    }, 1000);
}

function updateScore() {
    // function to change the score whenever the word is guessed correctly
    scoreBox = document.getElementById("score");
    scoreBox.innerText = "Score: " + score;
}

function submit_word (event) {
    event.preventDefault(); // to prevent auto refresh of page when form submitted

    let word = document.getElementById("input").value;
    
    // getting all 4 letter word list from enable4.txt file
    fetch('enable4.txt')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();
        })
        
        .then(data => {
            // Split the content by lines to create an array
            let wordArray = data.split('\n').map(word => word.trim());

            // checking if word is not guessed already
            if(wordArray.includes(word) && !guessedWords.includes(word)) {
                counter++;
                score++;
                updateScore();
                document.getElementById("result").innerText = "Correct ✅";
                guessedWords.unshift(word);
                
                // adding guessed word to guessed word area
                if(counter <= 10){
                    let list = document.getElementById(idNames[idCounter]);
                    list.innerHTML += "<p class='word'>" + word + "</p>";

                    // iterating to next row
                    if(counter == 10) {
                        idCounter++;
                        counter = 0;
                    }
                }
            }

            // checking if word is repeated
            else if(wordArray.includes(word) && guessedWords.includes(word)) {
                document.getElementById("result").innerText = "Repeated word";
            }

            else {
                document.getElementById("result").innerText = "Wrong ❌";
            }
        })
        
    // clearing input field after guessing
    event.target.reset();
}