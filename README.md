# DuelLinks-Site
A Web application for the popular game Yugioh Duel Links. It contains beginner's guides and features that allow user to search for in-game cards, build and share decks, rate decks, and create/view posts in the Community forum. Technologies used: ReactJS, Python Web Scraper (Beautiful Soup), YGOPRODECK API, MongoDB

## Features:
### Card Lookup
- User can search for a card that exists both in the game and in real life. By inputting the card name in the search bar, the application executes a partial search and outputs the according search results.
- By inputting a card name on the search bar, the application sends a GET request to a third-party API and retrieves card data to generate back to the user as search results. The results, if valid, would show the card image along with the card name, card type, card description, and if applicable, it would also display where to obtain the card in the game through a hypertext link that routes to the respective in-game shop item Box. 
### Box Lookup
- User can view all the in-game shop item Boxes. Each box routes to its own page which displays all the respective cards contained in the box via card images.
- User can click on a card and a React-Modal pops up for an expanded view of that card.

### Deck Builder
- User can build a deck in compliance to the Yugioh Duel Links regulations.
- In the Search container, user can look up cards and add to the Deck container.
- In the Deck container, user can input the deck title and the in-game skill ability used, and can also remove cards from their deck.
- When deck is complete, user can pick the deck category (competitive, casual, farming) and submit it for other users to view and rate.
### Deck Grader
- User can view all the submitted decks in submission order and rate them from a grade scale of S (highest) to D (lowest). Each deck can only be graded once.
- Each deck has the category (competitive, casual, farming), average grade, and total votes displayed on it.
- User also has an option to toggle decks to display by category.
### Community
- A forum that allows users to interact with each other through posts and comments by logging in via Google authentication.
- Each post has its own category (Tips & Guides, Memes, etc) and user also has the option to toggle post by category.
- User can view posts and comments, but must be logged in to make posts/comments themselves.

### Features to be added in the future:
- More articles for guides and analysis
