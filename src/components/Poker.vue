<template>
  <div class="poker">
     <div class="container">
        <div class="col-md-12">
           <div class="well">
              <div style="padding-top: 5px; padding-bottom: 5px" class="text-center">
                 <button class="btn btn-default" v-on:click="shuffleUpAndDeal(DECK_API,5)">Shuffle Up and Deal</button>&nbsp;&nbsp;
                 <button class="btn btn-default" v-on:click="draw(discards.length)" v-bind:class="{disabled: showWinnings(numberOfDraws)}">Discard {{discards.length}}</button>
                 Discard Index: {{discards}} | Cards left: {{cardsLeft}} | Coins: {{coins}} | Draws: {{numberOfDraws}}
              </div>
           </div>
        </div>
        <div class="text-center" style="margin-top: 30px">
           <h3>{{evaluatedHand}}</h3>
        </div>
        <span class="col-md-12 text-center">
        <span v-for="(card, index) in hand" v-on:click="checkForDiscard(index)" style="display: inline-block;padding-right: 20px;">
        <span v-if="showDiscardLabel(index)">DISCARD</span>
        <br>
        <img :src="localImagePath + card.code + localImageExt" height="200" v-bind:class="{discard: showDiscardLabel(index)}">
        </span>
        </span>
        <div>&nbsp;</div>
        <div v-if="showWinnings(numberOfDraws)">
           <div style="padding-top: 50px">
              <div class="text-center">Coins bet: {{coins_per_bet}} | Coins won: {{coins_won}}</div>
           </div>
        </div>
        <!-- <div style="clear: both"></div>
           <p class="well" style="margin-top: 35px">
             {{ hand }}
           </p> -->
     </div>
  </div>
</template>

<script>
export default {
    name: 'Poker',

    mounted: function() {
        this.status.push('App mounted.')
            // shuffle deck
        this.shuffleUpAndDeal(this.DECK_API, 5)



    },
    methods: {
        shuffleUpAndDeal: function(deck_api, draw) {
            this.discards = []
            this.numberOfDraws = 0
            this.coins = this.coins - this.coins_per_bet
            this.coins_won = 0
            const shuffle_api = deck_api + 'draw/?count=52'
            const CARDS_TO_START = 5

            this.axios.get(shuffle_api).then((response) => {

                this.deck = response.data
                let msg = 'Shuffled and deck array created.'

                console.log(msg)
                this.status.push(msg);
                this.draw(CARDS_TO_START)

            })


        },
        draw: function(cardsToDraw) {

            console.log('Number of draws: ', this.numberOfDraws)
            if (this.deck.cards.length >= cardsToDraw) {
                if (this.numberOfDraws === 0) {
                    // Initial phase: Draw 5 cards.
                    console.log('Initial phase: Draw 5 cards')
                    this.hand = this.deck.cards.slice(0, cardsToDraw)
                    this.deck.cards.splice(0, cardsToDraw)


                } else {
                    // Drawing phase: Replace discards with drawn cards
                    console.log('Drawing phase: Replace discards with drawn cards')
                    this.drawnCards = this.deck.cards.slice(0, cardsToDraw)
                    for (let i = 0; i < this.discards.length; i++) {
                        this.hand[this.discards[i]] = this.drawnCards[i];
                    }
                    // Remove drawn cards from deck
                    this.deck.cards.splice(0, cardsToDraw)
                    this.discards = []


                }
            } else {
                console.log('No more cards to draw.')
            }
            console.log('Cards left: ', this.deck.cards.length)
            this.numberOfDraws = this.numberOfDraws + 1


            this.evaluate(this.hand)
            this.cardsLeft = this.deck.cards.length
        },
        evaluate: function() {

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
              25,     // 4 of a kind
              50,     // Straight flush
              4,      // Straight
              6,      // Flush
              0,      // High card
              1,      // Pair
              2,      // Two pair
              976,    // Royal Flush
              3,      // 3 of a kind
              9       // Full house

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
                  "ACE" : 14,
                  "KING": 13,
                  "QUEEN" : 12,
                  "JACK" : 11,
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

            //Calculates the Rank of a 5 card Poker hand using bit manipulations.
            function rankPokerHand(cs, ss) {
                var v, i, o, s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
                for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) {
                    v += o * ((v / o & 15) + 1);
                }
                v = v % 15 - ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
                v -= (ss[0] == (ss[1] | ss[2] | ss[3] | ss[4])) * ((s == 0x7c00) ? -5 : 1);
                //console.log("Hand: " + hands[v] + (s == 0x403c ? " (Ace low)" : "") + "<br/>");
                let evaluatedHand = hands[v] + (s == 0x403c ? " (Ace low)" : "");
                console.log('Payout: ',payout[v])
                return {
                          evaluatedHand: evaluatedHand,
                          coins_won: payout[v]
                        }


            }

            let arraySuits = [];
            let arrayValues = [];
            for (let i = 0; i<this.hand.length; i++) {
              console.log(this.hand[i].value + ' / ' + this.hand[i].suit)
              arraySuits.push(suits[this.hand[i].suit]);
              arrayValues.push(conversion[this.hand[i].value]);

            }

            console.log('Suits: ',arraySuits)
            console.log('Values: ',arrayValues)
            let myHand = rankPokerHand(arrayValues, arraySuits);
            this.evaluatedHand = myHand.evaluatedHand

              //
            this.coins_won = this.coins_per_bet * myHand.coins_won
            if (this.numberOfDraws > 1) {
              this.coins = this.coins + this.coins_won
            }

        },
        showWinnings: function () {
          if (this.numberOfDraws > 1) {
            return true
          } else {
            return false
          }
        },
        checkForDiscard: function(cardIndex) {

            if (_.includes(this.discards, cardIndex)) {
                let target = this.discards.indexOf(cardIndex);
                this.discards.splice(target, 1);
                console.log('Removed from array')
            } else {
                this.discards.push(cardIndex);
                this.discards.sort();
                console.log('Added to array')
            }

        },
        showDiscardLabel: function(index) {

            if (_.includes(this.discards, index)) {
                return true
            } else {
                return false
            }

        }
    },
    data() {
        return {
            DECK_API: 'https://deckofcardsapi.com/api/deck/new/',
            status: [],
            deck: [],
            hand: [],
            drawnCards: [],
            localImagePath: '../static/img/',
            localImageExt: '.png',
            cardsToDraw: 5,
            discards: [],
            codedHand: [],
            numberOfDraws: 0,
            evaluatedHand: '',
            cardsLeft: '',
            coins: 1000,
            payout: '',
            coins_per_bet: 5,
            coins_won: ''
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.discard {opacity: .4}
</style>
