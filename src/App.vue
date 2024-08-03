<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="pt-5 mb-5">
    <div>
      <nav>
        <div class="container d-flex gap-4">
          <RouterLink to="/homework_1">week 1</RouterLink>
          <RouterLink to="/homework_2">week 2</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
