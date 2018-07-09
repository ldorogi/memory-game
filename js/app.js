var restartButton = document.querySelector('i.fa.fa-repeat');
var lastFlippedCard = null;
var matchedCards = [];
var moveCounter = 0;
var firstCard = true;
var timer;
var second = 1000;
var minute = second * 60;
var containerTimer = document.getElementById('timer');

/*
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-diamond',
						 'fa-paper-plane-o', 'fa-paper-plane-o',
						 'fa-anchor', 'fa-anchor',
						 'fa-bolt', 'fa-bolt',
						 'fa-cube', 'fa-cube',
						 'fa-leaf', 'fa-leaf',
						 'fa-bicycle', 'fa-bicycle',
						 'fa-bomb', 'fa-bomb'
						];

displayCards();
resetCounter();
displayStars();
addEvents();
containerTimer.innerHTML = '00:00';

/*
 * generate HTML code for a card
 */
function generateCard(card) {
 	return `<li class="card"><i class="fa ${card}"></i></li>`;	
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * create and display the necessary number of stars up to 5 stars
 */
function displayStars() {
	var stars = document.querySelector('.stars');
	var childrenCount = stars.childElementCount;
	for (var i = 0; i<(5 - childrenCount); i++){
		var li = document.createElement('li');
    stars.appendChild(li);
    li.innerHTML = li.innerHTML + '<i class="fa fa-star"></i>';
	}
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {
	var deck = document.querySelector('.deck');
	var cardsHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	deck.innerHTML = cardsHTML.join('');
}

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * set up event listeners for the cards
 */
function addEvents() {
	var allCards = document.querySelectorAll('.card');
	allCards.forEach(function(card) {
		card.addEventListener('click', function(e) {
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				showCardSymbol(card);
				addToOpenCards(card);	
			}
		});
	});
}

/*
 * reset the table and start new game
 */
restartButton.addEventListener('click', function() {
	displayCards();
	resetCounter();
	displayStars()
	addEvents();
	firstCard = true;
	containerTimer.innerHTML = '00:00';
	stopTimer();
});

/*
 * reset the move counter and display it on the page
 */
function resetCounter() {
	var counter = document.querySelector('.moves'); 
	moveCounter = 0;
	counter.innerHTML = '0';
}

/*
 * increment the move counter and display it on the page
 */
function incrementCounter() {
	var counter = document.querySelector('.moves'); 
	moveCounter += 1;
	counter.innerHTML = moveCounter;
}

/*
 * flip the card and show the symbol on the card
 */ 
function showCardSymbol(card) {
	card.classList.add('open', 'show');
}

/*
 * hide the card's symbol
 */ 
function hideCardSymbol(card) {
	card.classList.remove('open', 'show');
}

/*
 * show the matched cards with 'proper' class 
 */ 
function matchCardSymbol(card) {
	card.classList.remove('open', 'show');
	card.classList.add('match');
}

/*
 * - add the card to a *list* of "open" cards
 * - if the list already has another card, check to see if the two cards match
 */
function addToOpenCards(card) {
	if(lastFlippedCard) {
		compareCards(lastFlippedCard, card);
	}	
	else {
		if(firstCard === true) {
			startTimer();
		}
		lastFlippedCard = card;
		firstCard = false;
	}
}

/*
 * compare cards:
 * - if the cards do match, lock the cards in the open position
 * - if the cards do not match, remove the cards from the list and hide the card's symbol
 * - increment the move counter
 * - after each 4th move remove one star
 */
function compareCards(card1, card2) {
	var firstCardType = card1.querySelector('i').classList.item(1);
	var secondCardType = card2.querySelector('i').classList.item(1);
	var stars = document.querySelectorAll('ul.stars li');
	if(firstCardType === secondCardType) {
		lockCards(card1, card2);
		matchedCards.push(card1);
		if(matchedCards.length === 8) {
			console.log('game over');
			stopTimer();
     	matchedCards = [];
		}
		lastFlippedCard = null;
	}
	else {
		setTimeout(function(){
			hideCardSymbol(card1);
			hideCardSymbol(card2);
			lastFlippedCard = null;		
		}, 500);
	}
	incrementCounter();
	if(stars.length > 0 && (moveCounter % 4 === 0)) {
		document.querySelector('ul.stars').removeChild(stars[stars.length - 1]);	
	}
}

/*
 * - if the cards do match, lock the cards in the open position
 */
function lockCards(card1, card2) {
	matchCardSymbol(card1);
	matchCardSymbol(card2);
} 

/*
 * timer functions
 */
function stopTimer() {
    clearInterval(timer);
}

function pad(n){
  return ('00' + n).slice(-2);
}

function startTimer() {
	var startTime = Date.now();
	timer = setInterval(function(){
	  var currentTime = Date.now();
  	var difference = currentTime - startTime;
		var minutes = pad(minute | 0);
  	var seconds = pad(((difference % minute) / second) | 0);

	  containerTimer.innerHTML = minutes + ':' + seconds;

	// This only represents time between renders. Actual time rendered is based
	// on the elapsed time calculated above.
	}, 250);
}

