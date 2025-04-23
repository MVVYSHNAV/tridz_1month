<script setup>
import componentdata from '/RideData.json';
import Card from '@/components/Card.vue';
import { ref } from 'vue';
const datengine = ref(componentdata.Components);
</script>

<template>
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-6">Browse > Components</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        <Card v-for="Components in datengine" :key="Components.id">
          <h3 class="text-lg font-semibold text-gray-800">{{ Components.component_name }}</h3>
          <p class="text-sm text-gray-600">{{ Components.category }}</p>
          <p class="text-sm text-gray-600">Brake type: {{ Components.brake_type }}</p>
          <p class="text-sm text-gray-600">Functions: {{ Components.functions }}</p>
          <p class="text-sm text-gray-600">Description: {{ Components.description }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>