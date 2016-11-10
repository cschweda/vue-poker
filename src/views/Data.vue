<template>
  <div>
    <div class="container">
      <payouts></payouts>
      <stats></stats>
    </div>
  </div>
</template>

<script>
import Stats from '../components/Stats.vue'
import Payouts from '../components/Payouts.vue'
export default {

  name: 'Data',
  mounted: function () {
    console.log()
  },
  components: {
    Stats,
    Payouts
  },
  data () {
    return {
    }
  }
}
</script>
