<template>
  <div class="poker">


      <div class="container">
        <div class="col-md-12">
        <div class="well">

            <div style="padding-top: 5px; padding-bottom: 5px" class="text-center">
            <button class="btn btn-default" v-on:click="shuffleUpAndDeal(DECK_API,5)">Shuffle Up and Deal</button>&nbsp;&nbsp;<button class="btn btn-default" v-on:click="draw(discards.length)">Draw {{discards.length}}</button>
             Discards: {{discards}}
          </div>
          </div>
        </div>




        <span class="col-md-12 text-center">
          <span v-for="(card, index) in hand" v-on:click="checkForDiscard(index)" style="display: inline-block;padding-right: 20px;">
              <span v-if="showDiscardLabel(index)">DISCARD</span>
            <br>
            <img :src="localImagePath + card.code + localImageExt" height="200">


          </span>

        </span>


<div style="clear: both"></div>
    <p class="well" style="margin-top: 35px">
      {{ deck }}
    </p>
</div>
  </div>
</template>

<script>
export default {
  name: 'Poker',

  mounted: function () {
    this.status.push('App mounted.')
    // shuffle deck
    this.shuffleUpAndDeal (this.DECK_API,5)

  },
  methods: {
    shuffleUpAndDeal: function (deck_api, draw) {
      this.discards = [];
      const shuffle_api = deck_api + 'draw/?count=52'
      const CARDS_TO_START = 5
      this.axios.get(shuffle_api).then((response) => {

        this.deck = response.data
        let msg = 'Shuffled and deck array created.'

        console.log(msg)
        this.status.push(msg);
        this.draw (CARDS_TO_START)
      })


      },
      draw: function (draw) {

        if (this.deck.cards.length >= draw ) {
          this.hand = this.deck.cards.slice(0,draw)
          this.deck.cards.splice(0,draw)
          console.log('Cards left: ',this.deck.cards.length)
        } else {
          console.log('Cards left: ',this.deck.cards.length)
          console.log('No more cards to draw.')
        }
      },
      checkForDiscard: function (cardIndex) {

        if (_.includes(this.discards,cardIndex)) {
          let target = this.discards.indexOf(cardIndex);
          this.discards.splice(target, 1);
          console.log('Removed from array')
        } else {
          this.discards.push(cardIndex);
          this.discards.sort();
          console.log('Added to array')
        }

      },
      showDiscardLabel: function (index) {

        if (_.includes(this.discards,index)) {
          return true
        } else {
          return false
        }

      }
  },
  data () {
    return {
      DECK_API: 'https://deckofcardsapi.com/api/deck/new/',
      status: [],
      deck: [],
      hand: [],
      localImagePath: '../static/img/',
      localImageExt: '.png',
      cardsToDraw: 5,
      discards: [],

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
