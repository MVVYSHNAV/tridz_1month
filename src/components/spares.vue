<script setup>
import Card from '@/components/Card.vue';
import { ref, onMounted } from 'vue';
import name from '@/components/name.vue';
import BackButton from '@/components/Backbutton.vue';

const datspare = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/Spares');
    const data = await response.json();
    datspare.value = data;
  } catch (error) {
    console.error('Error fetching datspare', error);
  }
});

const deleteItem = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you need to delete");
    if(confirm){
      const response = await fetch(`/api/Spares/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete spare');
    }
    datspare.value = datspare.value.filter(spare => spare.id !== id);
    console.log('Spare deleted successfully');
    }
    
  } catch (error) {
    console.error('Error deleting spare:', error);
  }
};
</script>

<template>
  <BackButton :to="'/'" />

  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <name name="Spares" />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
        <Card v-for="spare in datspare" :key="spare.id">
          <button @click="deleteItem(spare.id)" class="text-white font-bold h-6 w-5 rounded float-end bg-red-500">X</button>
          <h3 class="text-lg font-semibold text-gray-800">{{ spare.spare_name }}</h3>
          <p class="text-sm text-gray-600">{{ spare.category }}</p>
          <p class="text-sm text-gray-600">Compatible bikes: {{ spare.compatible_bikes }}</p>
          <p class="text-sm text-gray-600">Manufacturer: {{ spare.manufacturer }}</p>
          <p class="text-sm text-gray-600">Description: {{ spare.description }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>
