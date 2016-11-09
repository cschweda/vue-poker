<template>
  <div class="poker">
     <div class="container">
        <div class="col-md-12">
          <div class="text-center" style="margin-top: 10px">

         </div>
           <div class="well" style="margin-bottom: 30px">
              <div style="padding-top: 5px; padding-bottom: 5px;" class="text-center">
                <span style="font-weight: 900; text-transform: uppercase; font-size: 14px"><span v-bind:class="{disabledText: !betAllowed}">Place bet:&nbsp;</span></span>
                <span class="btn-group" role="group">
                    <button type="button" class="btn btn-default" v-bind:class="{disabled: !betAllowed}" v-on:click="placeBet(5)">5</button>
                    <button type="button" class="btn btn-default" v-bind:class="{disabled: !betAllowed}" v-on:click="placeBet(10)">10</button>
                    <button type="button" class="btn btn-default" v-bind:class="{disabled: !betAllowed}" v-on:click="placeBet(15)">15</button>
                    <button type="button" class="btn btn-default" v-bind:class="{disabled: !betAllowed}" v-on:click="placeBet(20)">20</button>
                    <button type="button" class="btn btn-default" v-bind:class="{disabled: !betAllowed}" v-on:click="placeBet(25)">25</button>
                  </span>
                  &nbsp;&nbsp;
                 <button class="btn btn-primary" v-on:click="dealHand()" v-bind:class="{disabled: disableShuffle}">Shuffle Up and Deal!!</button>&nbsp;&nbsp;
                 <button class="btn btn-primary" v-on:click="drawFromDeck(discards.length)" v-bind:class="{disabled: betAllowed}">Discard {{discards.length}}</button>
                <!--<div style="margin-top: 15px; font-weight: 700">
                 Coins bet: {{coins_bet}} | Discard Index: {{discards}} | Cards left: {{deck.length}} |  Draws: {{numberOfDraws}}
               </div>-->
              </div>
           </div>

        </div>

        <span class="col-md-12 text-center">
        <span v-show="startOfHand" style="display: inline-block;padding-right: 20px;" >
          <br><br><br>
          <img :src="localImagePath + 'back2x.png'" height="200" style="margin-right: 20px">
          <img :src="localImagePath + 'back2x.png'" height="200" style="margin-right: 20px">
          <img :src="localImagePath + 'back2x.png'" height="200" style="margin-right: 20px">
          <img :src="localImagePath + 'back2x.png'" height="200" style="margin-right: 20px">
          <img :src="localImagePath + 'back2x.png'" height="200" style="margin-right: 20px">
        </span>
        <span v-show="!startOfHand" v-for="(card, index) in hand" v-on:click="checkForDiscard(index)" style="display: inline-block;padding-right: 20px;" class="" >
          <span v-if="showDiscardLabel(index)"><span style="background: #000; color: #fff; padding: 8px;">DISCARD</span></span>
          <br><br><br>
          <img :src="localImagePath + card.image" height="200" v-bind:class="{discard: showDiscardLabel(index)}">
        </span>

        <div style="margin-top: 50px;" v-bind:class="{fadeInLeft: showWinnings(numberOfDraws)}" v-show="showWinnings()" class="animated text-center">
           <h3 style="color: red; font-weight: 900; text-transform: uppercase; ">{{evaluatedHand}}</h3>
            <!-- <button class="btn btn-primary" style="margin-top: 20px;" v-on:click="dealHand()" v-bind:class="{disabled: !disableShuffle}">Shuffle Up and Deal!!</button> -->
        </div>
        </span>
        <div>&nbsp;</div>

        <div class="well">
           <div style="padding-top: 10px">
              <div class="text-center" style="font-size: 16px; font-weight: 700; font-size: 24px; text-transform: uppercase">Coins: {{coins}} | Coins bet: {{coins_bet}} | Coins won: {{coins_won}}</div>
           </div>
        </div>

           <div class="text-center" style="padding: 30px"><a href="https://github.com/cschweda/vuepoker01">Github Source</a>&nbsp;|&nbsp;<a href="https://vuejs.org/">Vue.js</a></div>


     </div>
  </div>
</template>

<script>
export default {
    name: 'Poker',
    mounted: function() {
        this.status.push('App mounted.')
        //this.dealHand(5)

    },
    methods: {
        getDeck: function() {
            let suits = ['CLUBS', 'HEARTS', 'SPADES', 'DIAMONDS']
            let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
            for (let s = 0; s < suits.length; s++) {
                for (let v = 0; v < values.length; v++) {
                    let card = {}
                    card["value"] = values[v]
                    card["suit"] = suits[s]
                        // card.code: Get the '0' if it's a 10, otherwise get the first character. Then concat value.
                    values[v] === '10' ? card["code"] = values[v].charAt(1) + suits[s].charAt(0) : card["code"] = values[v].charAt(0) + suits[s].charAt(0)
                        // card.image: If it's an Ace of Diamonds use 'aceDiamonds.png' instead of 'AD.png' in order to circumvent ad blockers
                    card["code"] === 'AD' ? card["image"] = 'aceDiamonds.png' : card["image"] = card["code"] + '.png'
                        // Put the card object in the deck.
                    this.deck.push(card)
                }
            }
            console.log('Deck created')
        },
        shuffleDeck: function() {
            var m = this.deck.length,
                t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = this.deck[m];
                this.deck[m] = this.deck[i];
                this.deck[i] = t;
            }
            console.log('Fisher-Yates shuffle')
        },
        placeBet: function (bet) {
          if (this.betAllowed) {
          this.coins_won = 0
          this.coins_bet = bet
          this.startOfHand = true
          this.numberOfDraws = 0
          this.disableShuffle = false
          console.log('Bet: ',this.coins_bet)
          console.log('StartOfHand: ',this.startOfHand)
        }

        },
        drawFromDeck: function(cardsToDraw) {

            if (this.numberOfDraws <= 1) {
                console.log('Number of draws: ', this.numberOfDraws)
                    if (this.numberOfDraws === 0) {
                        // Initial phase: Draw 5 cards.
                        console.log('Initial phase: Draw 5 cards')
                        this.hand = this.deck.slice(0, cardsToDraw)
                        this.deck.splice(0, cardsToDraw)
                        this.betAllowed = false
                        this.discardsAllowed = true
                        console.log('Cards left: ', this.deck.length)
                        this.numberOfDraws = this.numberOfDraws + 1
                        this.evaluateHand()
                    } else {

                        if (this.discardsAllowed) {
                          // Drawing phase: Replace discards with drawn cards
                          console.log('Drawing phase: Replace discards with drawn cards')
                          this.drawnCards = this.deck.slice(0, cardsToDraw)
                          for (let i = 0; i < this.discards.length; i++) {
                              this.hand[this.discards[i]] = this.drawnCards[i];
                            }
                          // Remove drawn cards from deck
                          this.deck.splice(0, cardsToDraw)
                          this.discards = []
                          this.startOfHand = false
                          this.betAllowed = false
                          this.discardsAllowed = false
                          console.log('Cards left: ', this.deck.length)
                          this.numberOfDraws = this.numberOfDraws + 1
                          this.evaluateHand()
                      }

                    }
                }



        },
        dealHand: function() {
              if (!this.disableShuffle) {
                // set game variables
                const CARDS_TO_DRAW = 5
                this.deck = []
                this.discards = []
                this.numberOfDraws = 0
                this.coins_won = 0
                this.startOfHand = false
                this.disableShuffle = true
                this.coins = this.coins - this.coins_bet
                // start the hand
                this.getDeck()
                this.shuffleDeck()
                this.drawFromDeck(CARDS_TO_DRAW)
              }


        },

        evaluateHand: function() {


            const hands = [
                    "4 of a Kind",
                    "Straight Flush",
                    "Straight",
                    "Flush",
                    "High Card",
                    "1 Pair",
                    "2 Pair",
                    "Royal Flush",
                    "3 of a Kind",
                    "Full House"
                ],
                payout = [
                    25, // 4 of a kind
                    50, // Straight flush
                    4, // Straight
                    6, // Flush
                    0, // High card
                    1, // Pair
                    2, // Two pair
                    976, // Royal Flush
                    3, // 3 of a kind
                    9 // Full house
                ],
                A = 14,
                K = 13,
                Q = 12,
                J = 11,
                suits = {
                    "SPADES": 1,
                    "CLUBS": 2,
                    "HEARTS": 4,
                    "DIAMONDS": 8
                },
                conversion = {
                    "ACE": 14,
                    "KING": 13,
                    "QUEEN": 12,
                    "JACK": 11,
                    "10": 10,
                    "9": 9,
                    "8": 8,
                    "7": 7,
                    "6": 6,
                    "5": 5,
                    "4": 4,
                    "3": 3,
                    "2": 2
                }

            // Calculates the Rank of a 5 card Poker hand using bit manipulations.
            // Many thanks to: //http://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math

            function rankPokerHand(cs, ss) {
                let v, i, o, s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
                for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) {
                    v += o * ((v / o & 15) + 1);
                }
                v = v % 15 - ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
                v -= (ss[0] == (ss[1] | ss[2] | ss[3] | ss[4])) * ((s == 0x7c00) ? -5 : 1);
                //console.log("Hand: " + hands[v] + (s == 0x403c ? " (Ace low)" : "") + "<br/>");
                let evaluatedHand = hands[v] + (s == 0x403c ? " (Ace low)" : "");
                console.log('Payout: ', payout[v])
                return {
                    evaluatedHand: evaluatedHand,
                    coins_won: payout[v]
                }
            }
            let arraySuits = [];
            let arrayValues = [];
            for (let i = 0; i < this.hand.length; i++) {
                console.log(this.hand[i].value + ' / ' + this.hand[i].suit)
                arraySuits.push(suits[this.hand[i].suit]);
                arrayValues.push(conversion[this.hand[i].value]);
            }
            console.log('Suits: ', arraySuits)
            console.log('Values: ', arrayValues)
            let myHand = rankPokerHand(arrayValues, arraySuits);
            this.evaluatedHand = myHand.evaluatedHand

            if (this.numberOfDraws > 1) {
                this.coins_won = this.coins_bet * myHand.coins_won
                this.coins = this.coins + this.coins_won
                this.betAllowed = true
                this.handFinished = !this.handFinished;


            }


        },
        showWinnings: function() {
            if (this.numberOfDraws > 1) {
                return true
            } else {
                return false
            }
        },
        checkForDiscard: function(cardIndex) {
            if (this.numberOfDraws <= 1) {
                if (_.includes(this.discards, cardIndex)) {
                    let target = this.discards.indexOf(cardIndex);
                    this.discards.splice(target, 1);
                    console.log('Removed from array')
                } else {
                    this.discards.push(cardIndex);
                    this.discards.sort();
                    console.log('Added to array')
                }
            }
        },
        showDiscardLabel: function(index) {
            if (this.numberOfDraws <= 1) {
                if (_.includes(this.discards, index)) {
                    return true
                } else {
                    return false
                }
            }

        }
    },
    data() {
        return {
            DECK_API: 'https://deckofcardsapi.com/api/deck/new/',
            status: [],
            deck: [],
            hand: [],
            coins_bet: 0,
            drawnCards: [],
            localImagePath: '../static/img/',
            discards: [],
            numberOfDraws: 0,
            evaluatedHand: '',
            cardsLeft: '',
            coins: 1000,
            payout: '',
            coins_won: 0,
            disableShuffle: true,
            disableDiscards: true,
            startOfHand: true,
            betAllowed: true

        }
    },

}
</script>

<style>
.card:hover {cursor: pointer; cursor: hand; opacity: .3}
.discard {opacity: .3}
.handFinished {opacity: .7}
.disabledText {color: #ddd}
</style>
