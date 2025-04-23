<script setup>
import Partsdata from '/RideData.json';
import Card from '@/components/Card.vue';
import { ref } from 'vue';
const datengine = ref(Partsdata.Parts);
</script>

<template>
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-6">Browse > Parts</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        <Card v-for="parts in datengine" :key="parts.id">
          <h3 class="text-lg font-semibold text-gray-800">{{ parts.part_name }}</h3>
          <p class="text-sm text-gray-600">{{ parts.category }}</p>
          <p class="text-sm text-gray-600">Material: {{ parts.material }}</p>
          <p class="text-sm text-gray-600">Manufacturer: {{ parts.manufacturer }}</p>
          <p class="text-sm text-gray-600">Description: {{ parts.description }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>