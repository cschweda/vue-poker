<template>
  <div>
    <div class="container">

      <stats></stats>
    </div>
  </div>
</template>

<script>
import Stats from '../components/Stats.vue'

export default {

  name: 'Data',
  mounted: function () {
    console.log()
  },
  components: {
    Stats,

  },
  data () {
    return {
    }
  }
}
</script>
