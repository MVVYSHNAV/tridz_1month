<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo.png';
import  { RouterLink } from 'vue-router';
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="w-full bg-amber-100 px-4 md:px-10 py-4">
    <!-- Desktop Navigation -->
    <div class="hidden md:flex justify-between items-center">
      <RouterLink to="/">
        <div>
          <img class="w-16 h-16 md:w-20 md:h-20" :src="logo" alt="Logo" />
        </div>
      </RouterLink> 
      <ul class="flex gap-4 md:gap-8">
        <RouterLink to="/ride/engine"><li class="text-black hover:underline cursor-pointer">Engine</li></RouterLink>
        <RouterLink to="/ride/parts"><li class="text-black hover:underline cursor-pointer">Parts</li></RouterLink>
        <RouterLink to="/ride/components"><li class="text-black hover:underline cursor-pointer">Components</li></RouterLink>
        <RouterLink to="/ride/spares"><li class="text-black hover:underline cursor-pointer">Spares</li></RouterLink>
      </ul>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="flex md:hidden justify-between items-center">
      <a href="/">
        <div>
          <img class="w-12 h-12" :src="logo" alt="Logo" />
        </div>
      </a>
      
      <!-- Hamburger Menu Button -->
      <button @click="toggleMenu" class="text-black focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu (Dropdown) -->
    <div v-if="isMenuOpen" class="md:hidden mt-2">
      <ul class="flex flex-col gap-2 bg-amber-100 py-2">
        <RouterLink to="/ride/engine" @click="isMenuOpen = false">
          <li class="text-black hover:bg-amber-200 cursor-pointer px-4 py-2">Engine</li>
        </RouterLink>
        <RouterLink to="/ride/parts" @click="isMenuOpen = false">
          <li class="text-black hover:bg-amber-200 cursor-pointer px-4 py-2">Parts</li>
        </RouterLink>
        <RouterLink to="/ride/components" @click="isMenuOpen = false">
          <li class="text-black hover:bg-amber-200 cursor-pointer px-4 py-2">Components</li>
        </RouterLink>
        <RouterLink to="/ride/spares" @click="isMenuOpen = false">
          <li class="text-black hover:bg-amber-200 cursor-pointer px-4 py-2">Spares</li>
        </RouterLink>
      </ul>
    </div>
  </nav>
</template>