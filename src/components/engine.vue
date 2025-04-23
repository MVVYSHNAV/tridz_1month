<script setup>
import enginedata from '/RideData.json';
import Card from '@/components/Card.vue';
import { ref } from 'vue';
const datengine = ref(enginedata.Engine);
</script>

<template>
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-6">Browse > Engine</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        <Card v-for="engines in datengine" :key="engines.id">
          <h3 class="text-lg font-semibold text-gray-800">{{ engines.engine_name}}</h3>
          <p class="text-sm text-gray-600">{{ engines.type }}</p>
          <p class="text-sm text-gray-600">Fuel: {{ engines.fuel_type }}</p>
          <p class="text-sm text-gray-600">Torque: {{ engines.torque_nm }} Nm</p>
          <p class="text-sm text-gray-600">Applications: {{ engines.applications }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>