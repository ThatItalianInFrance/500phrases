<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="tit">MyShop TP - NodeJS - VUE - Vite</div>
      <h1 class="" id="welcomeText">welcome to the BackOffice!</h1>
<div class="logged" id="logged">test</div>
      <nav class="">
        <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/products/list">produits</RouterLink>
        <RouterLink to="/office/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.tit {
  font-size: 80px;
}
</style>
