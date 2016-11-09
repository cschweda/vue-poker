// Quick replication of deck reeturned by DeckOfCards API


function Deck () {

let deck = []

suits = ['CLUBS','HEARTS','SPADES','DIAMONDS']
values = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE']

for (let s = 0; s < suits.length; s++) {
  for (let v = 0; v< values.length; v++) {
    let card = {}
    card["value"] = values[v]
    card["suit"] = suits[s]
    card["code"] = values[v].charAt(0) + suits[s].charAt(0)
    card["code"] === 'AD' ? card["image"] = 'aceofdiamonds.png' : card["image"] = card["code"] + '.png'
    deck.push(card)
    }
  }
  console.log('Deck created')
  return deck

}

function shuffle (array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  console.log('Fisher-Yates shuffle')
  return array;
}

// create new deck
let deck = new Deck();
//Fisher-Yates shuffle
shuffle(deck)
// Draw 5
let hand = deck.slice(0, 5)
// Remove from deck
deck.splice(0, 5)
console.log(hand, 'Cards remaining: ', deck.length)
// Draw two more
let secondDraw = deck.slice(0,2)
deck.splice(0, 2)
console.log(secondDraw, 'Card remaining: ', deck.length)
