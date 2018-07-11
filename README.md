# Memory Game Project

## Table of Contents


* [Instructions](#instructions)
* [How The Game Works](#how-the-game-works)
* [Game Functionality](#game-functionality)
* [Contributing](#contributing)

## Instructions

To start this game you have to open `index.html` in any browser. This file contains only the basic page layout.

As usual all gameboard formattings were done in `css/app.css`.

The whole game logic is realised in `js/app.js`. Cards are generated in function `displayCards()` using the function `shuffle(array)` which provides for each new game a random array of cards. Event listeners are attached to each card in function `addEvents()`. Opened cards are handled in function `addToOpenCards(card)` and comapred in `compareCards(card1, card2)`. 
If they match `lockCards(card1, card2)` will loch them as opened and matched, otherwise they will be flipped again.
There is a timer and move counter function as well. At the and of the game with function `congratPopup()` in a modal dialog we provide the player a choice wether to reset and start a new game or not.

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:
- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

## Game Functionality

The real-life game, players flip over cards to locate the pairs that match The goal is to recreate this effect in your project. There are a couple of interactions that you'll need to handle:

Flipping cards
- What happens when cards match
- What happens when cards do not match
- When the game finishes
- Below are some examples of how we implemented these interactions.


## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
