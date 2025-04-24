<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <h3>Not Found</h3>
    <p>The link doesn't match any route, and the page does not exist.</p>
    <RouterLink 
      to="/"
      class="bg-blue-400 text-white px-4 py-2 mt-4 inline-block rounded hover:bg-blue-500 transition">
      Go Back
    </RouterLink>
  </div>
</template>
