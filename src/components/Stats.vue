<template>
  <div>
  <div class="container">
    <h4>Session data</h4>




<table class="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Evaluated Hand</th>
      <th>Coins Won</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="hand in this.$store.state.handStats">
      <td>{{ hand.id }}</td>
      <td>{{ hand.evaluatedHand }}</td>
      <td>{{ hand.coins_won }}</td>
   </tr>
  </tbody>
</table>


  </div>
</template>


<script>

export default {
  name: 'Stats',
}
</script>

<style>
.center-div
{
     margin: 0 auto;
     width: 50%;
}

</style>
