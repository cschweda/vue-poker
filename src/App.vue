<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
    <router-view class="view"></router-view>
  </keep-alive>
  </div>

</template>

<script>
import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {

    Navbar
  },
  mounted: function () {
    console.info('App mounted.')

  }
}
</script>
