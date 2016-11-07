<template>
  <div class="poker">


      <div class="container">
        <div class="col-md-12">
        <div class="well">

            <div style="padding-top: 5px; padding-bottom: 5px" class="text-center">
            <button class="btn btn-default">Shuffle</button>&nbsp;&nbsp;<button class="btn btn-default">Deal</button>
          </div>
          </div>
        </div>

    <div class="text-center">
      <div v-for="card in hand" style="float: left">
        <span style="padding: 20px">

        <img :src="'../static/img/' + card.code + '.png'" height="250">
      </span>
      </div>
</div>



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
    this.shuffle (this.DECK_API)
    this.draw (this.DECK_API, 5)
  },
  methods: {
    shuffle: function (deck_api) {
      // const DECK_API = 'https://deckofcardsapi.com/api/deck/' + id + '/'
        const shuffle_api = deck_api + 'shuffle/?deck_count=1'
        this.axios.get(shuffle_api).then((response) => {
          console.log('Deck shuffed: ',response.data)
          this.status.push('Deck shuffled.')
        }).catch(function (error) {
          console.log('ERROR: ',error);
        });
        console.log('Deck API: ', deck_api)

      },
      draw: function (deck_api, cardsToDraw) {

        const draw_api = deck_api + 'draw/?count=' + cardsToDraw
        this.axios.get(draw_api).then((response) => {
          this.deck = response.data;
          console.log('Cards drawn: ',this.deck)
          this.status.push('Cards successfully drawn.')
          this.hand = _.clone(this.deck.cards, true);
          console.log(this.hand)
        }).catch(function (error) {
          console.log('ERROR: ',error);
        });





      }
  },
  data () {
    return {
      DECK_API: 'https://deckofcardsapi.com/api/deck/qrq36opkjw8f/',
      IMAGE_API: 'https://deckofcardsapi.com/static/img/',
      status: [],
      deck: [],
      localImagePath : '../assets/img/',
      hand: {}
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
