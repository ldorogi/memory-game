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

displayCards();


/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * set up the event listener for a card
 */
var allCards = document.querySelectorAll('.card');
var lastFlippedCard = null;
var matchedCards = [];

allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			showCardSymbol(card);
			addToOpenCards(card);	
		}
	});
});

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
 * match the cards 
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
		lastFlippedCard = card;
	}
}

/*
 * compare cards:
 * - if the cards do match, lock the cards in the open position
 * - if the cards do not match, remove the cards from the list and hide the card's symbol
 */
function compareCards(card1, card2) {
	var firstCardType = card1.querySelector('i').classList.item(1);
	var secondCardType = card2.querySelector('i').classList.item(1);
	if(firstCardType === secondCardType) {
		lockCards(card1, card2);
		lastFlippedCard = null;
	}
	else {
		setTimeout(function(){
			hideCardSymbol(card1);
			hideCardSymbol(card2);
			lastFlippedCard = null;		
		}, 500);
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
 * misc
*/
if(matchedCards.length === 16) {
	// game over	 	
}