const restartButton = document.querySelector('i.fa.fa-repeat');
let lastFlippedCard = null;
let matchedCards = [];
let moveCounter = 0;
let firstCard = true;
let timer;
let second = 1000;
let minute = second * 60;
const containerTimer = document.getElementById('timer');

/** 
* @description Create a list that holds all of your cards
*/
let cards = ['fa-diamond', 'fa-diamond',
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

/**
* @description Generate HTML code for a card
*/
function generateCard(card) {
 	return `<li class="card"><i class="fa ${card}"></i></li>`;	
 }

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

/**
* @description Create and display the necessary number of stars up to 5 stars
*/
function displayStars() {
	const stars = document.querySelector('.stars');
	let childrenCount = stars.childElementCount;
	for (let i = 0; i<(5 - childrenCount); i++){
		let li = document.createElement('li');
    stars.appendChild(li);
    li.innerHTML = li.innerHTML + '<i class="fa fa-star"></i>';
	}
}

/**
* @description Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
function displayCards() {
	const deck = document.querySelector('.deck');
	let cardsHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	deck.innerHTML = cardsHTML.join('');
}

/**
* @description Set up event listeners for the cards
*/
function addEvents() {
	let allCards = document.querySelectorAll('.card');
	allCards.forEach(function(card) {
		card.addEventListener('click', function(e) {
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				showCardSymbol(card);
				addToOpenCards(card);	
			}
		});
	});
}

/**
* @description Reset the table and start new game
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

/**
* @description Reset the move counter and display it on the page
*/
function resetCounter() {
	let counter = document.querySelector('.moves'); 
	moveCounter = 0;
	counter.innerHTML = '0';
}

/**
* @description Increment the move counter and display it on the page
*/
function incrementCounter() {
	let counter = document.querySelector('.moves'); 
	moveCounter += 1;
	counter.innerHTML = moveCounter;
}

/**
* @description Flip the card and show the symbol on the card
*/ 
function showCardSymbol(card) {
	card.classList.add('open', 'show');
}

/**
* @description Hide the card's symbol
*/ 
function hideCardSymbol(card) {
	card.classList.remove('open', 'show');
}

/**
* @description Show the matched cards with 'proper' class 
*/ 
function matchCardSymbol(card) {
	card.classList.remove('open', 'show');
	card.classList.add('match');
}

/**
* @description Add the card to a *list* of "open" cards
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

/**
* @description Compare cards:
* - if the cards do match, lock the cards in the open position
* - if the cards do not match, remove the cards from the list and hide the card's symbol
* - increment the move counter
* - after each 8th move remove one star
*/
function compareCards(card1, card2) {
	let firstCardType = card1.querySelector('i').classList.item(1);
	let secondCardType = card2.querySelector('i').classList.item(1);
	let stars = document.querySelectorAll('ul.stars li');
	if(firstCardType === secondCardType) {
		lockCards(card1, card2);
		matchedCards.push(card1);
		if(matchedCards.length === 8) {
			stopTimer();
			matchedCards = [];
			congratPopup();
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
	if(stars.length > 0 && (moveCounter % 8 === 0)) {
		document.querySelector('ul.stars').removeChild(stars[stars.length - 1]);	
	}
}

/**
* @description Lock the cards in the open position 
*/
function lockCards(card1, card2) {
	matchCardSymbol(card1);
	matchCardSymbol(card2);
} 

/**
* @description Timer functions
*/
function stopTimer() {
    clearInterval(timer);
}

function pad(n){
  return ('00' + n).slice(-2);
}

function startTimer() {
	let startTime = Date.now();
	timer = setInterval(function(){
	  let currentTime = Date.now();
  	let difference = currentTime - startTime;
		let minutes = pad(minute | 0);
  	let seconds = pad(((difference % minute) / second) | 0);

	  containerTimer.innerHTML = minutes + ':' + seconds;

	// This only represents time between renders. Actual time rendered is based
	// on the elapsed time calculated above.
	}, 250);
}

/**
* @description Popup at the end of the game
*/
function congratPopup() {
	const actualTime = containerTimer.innerHTML;
	const stars = document.querySelectorAll('ul.stars li').length;
	alert("You won the game in " + moveCounter + " moves and in time " + actualTime + "! Star rating is:" + stars);
}
