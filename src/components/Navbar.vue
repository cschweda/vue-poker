<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/home" class="navbar-brand">VIDEO POKER</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/home">Play </router-link></li>
          <li><router-link to="/payout">Payout Chart</router-link></li>
          <li><router-link to="/about">About</router-link></li>



      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>


</template>
