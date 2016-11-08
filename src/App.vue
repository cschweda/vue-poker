<template>
  <div id="app">
    <navbar></navbar>
    <!-- <div class="text-center">
      <img src="./assets/img/3D.png">
    </div> -->
    <poker></poker>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Poker from './components/Poker'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Poker,
    Navbar
  },
  mounted: function () {
    console.info('App mounted.')
  }
}
</script>
