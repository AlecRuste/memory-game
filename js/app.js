// Create htmlcollection to hold all cards  
const cardsHtmlCollection = document.getElementsByClassName('card');

// Convert cardshtmlcollection to array
let cards = Array.from(cardsHtmlCollection);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the list of cards using "shuffle" method
shuffle(cards);

// Select deck of cards
const deck = document.querySelector('.deck');

// Loop through each card and add it to HTML
cards.forEach(function(card) {
    deck.appendChild(card);
});

 // Display card's symbol
function displayCard(card) {
    card.classList.add('open', 'show');
}

// Last two cards opened array
let lastTwoCards = [];

// Matched cards array
let matchedCards = [];


// Add opened cards to the card list if they match
function addLastTwoCards(card) {
    lastTwoCards.push(card);
    // Make clicked card unclickable 
    card.classList.add('unclickable');
}

// Check if two last opened cards match
function doCardsMatch() {
    if (lastTwoCards[0].innerHTML === lastTwoCards[1].innerHTML) {
        // If cards match add class
        lastTwoCards[0].classList.add('match');
        lastTwoCards[1].classList.add('match');
        // If cards match add them to matchedCards array
        matchedCards.push(lastTwoCards[0]);
        matchedCards.push(lastTwoCards[1]);
        // Clear lastTwoCards array
        lastTwoCards = [];
    }
    else {
        // If cards don't match remove classes 'open' and 'show' 
        setTimeout(function() {
        lastTwoCards[0].classList.remove('open', 'show');
        lastTwoCards[1].classList.remove('open', 'show');
        // Make two recently clicked cards available again
        lastTwoCards[0].classList.remove('unclickable');
        lastTwoCards[1].classList.remove('unclickable');
        // Clear lastTwoCards array
        lastTwoCards = [];
        // Make cards unclickable if two cards are open        
        }, 1000);
    }
}

// Make cards unclickible while there are opened cards
function cardsUnclickible() {
    deck.classList.add('unclickable');
    setTimeout(function() { 
        deck.classList.remove('unclickable');
    }, 1000);
}

// Check if lastTwoCards array has 2 items
function twoCards() {
    if (lastTwoCards.length === 2) {       
        // Call doCardsMatch function
        doCardsMatch();
        // Call cardsUnclickible function
        cardsUnclickible();
        // Call inncrement moves function
        incrementMoves();
    }
}

// Create htmlcollection to hold move count
let moves = document.getElementsByClassName('moves');
// Increment Moves
function incrementMoves() {
    return moves[0].innerHTML = Number(moves[0].innerHTML) + 1;    
}

// Create NodeList to hold stars
let starsNodeList = document.querySelectorAll('.stars li');

// Star number for the win-description
let starNumber = 3;


// Set star count according to how many cards were open
function starCount() {
    if (Number(moves[0].innerHTML) > 20) {
        starsNodeList[2].innerHTML = '<i class="fa fa-star-o"></i>';
        starNumber = 0;
    }
    else if (Number(moves[0].innerHTML) > 16) {
        starsNodeList[1].innerHTML = '<i class="fa fa-star-o"></i>';
        starNumber = 1;
    }
    else if (Number(moves[0].innerHTML) > 12) {
        starsNodeList[0].innerHTML = '<i class="fa fa-star-o"></i>';
        starNumber = 2;
    }
}

// Get restart
let restart = document.querySelector('.restart');

// Reset all elements and re-shuffle all cards
restart.onclick = function() {
    shuffle(cards);
    cards.forEach(function(card) {
        deck.appendChild(card);
        card.classList.remove('open', 'show', 'match', 'unclickable');       
    });
    lastTwoCards = [];
    matchedCards = [];
    moves[0].innerHTML = 0;
    starsNodeList.forEach(function(star) {
        star.innerHTML = '<i class="fa fa-star"></i>';
    });
    starNumber = 3;
    secondCount = 0;
    document.querySelector('.time').innerHTML = 0;
    clearInterval(time);
    time = 0;
}

// Get the modal
var modal = document.querySelector('.modal');

// Get close element for modal
var span = document.getElementsByClassName("close")[0];

// Get win-description
let winDescription = document.querySelector('.win-description');

// Get play-again button
let playAgain = document.querySelector('.play-again');

// Set win description message
function winDescriptionMessage() {
    winDescription.innerText = `With ${moves[0].innerText} moves and ${starNumber} star(s). It took you ${secondCount} seconds to finish the game`;
}

// If all cards are open display modal and win description message 
function modalMessage() {
    if (matchedCards.length === 16) {
        modal.style.display = "block";
        winDescriptionMessage();
    } 
}

// Reload the page onclick play again
playAgain.onclick = function() {
    location.reload();
}

// Close the modal on X click
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal on outside click
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Set timer
let secondCount = document.querySelector('.time').innerHTML;

// Set time
let time = 0; 

// Inncrement Time
function inncrementTime() {
    document.querySelector('.time').innerHTML = ++secondCount;
}

// Pause of 1 second between each incrementation
function timeInterval() {
    time = setInterval(inncrementTime, 1000);
}

// Check to see if the game have started to count time properly
function clickedOnce() {
    if (time === 0) {
        timeInterval();
    }
}

// Stop timer if all cards are open
function stopTimer() {
    if (matchedCards.length === 16) {
        clearInterval(time);
    }
}

// Iterate through each card and call specific functions
cards.forEach(function(card) {
    card.onclick = function() {
        displayCard(card);
        addLastTwoCards(card);
        twoCards();
        starCount();
        modalMessage();
        clickedOnce();
        stopTimer();
    }
});