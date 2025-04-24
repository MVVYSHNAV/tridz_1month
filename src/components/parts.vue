<script setup>
import Card from '@/components/Card.vue';
import { ref, onMounted } from 'vue';
const datparts = ref([]);
import name from '@/components/name.vue';
import BackButton from '@/components/Backbutton.vue';

onMounted(async () => {
  try {
    const response = await fetch('/api/Parts')
    const data = await response.json()
    datparts.value = data;
  } catch (error) {
    console.error('Error fetching datparts', error);
  }  
});
const deleteItem = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you need to delete");
    if(confirm){
      const response = await fetch(`/api/Parts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete parts');
    }
    datparts.value = datparts.value.filter(parts => parts.id !== id);
    console.log('parts deleted successfully');
    }
    
  } catch (error) {
    console.error('Error deleting parts:', error);
  }
};
</script>

<template>
   <BackButton :to="'/'" />
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <name name="Parts" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
        <Card v-for="parts in datparts" :key="parts.id">
          <button @click="deleteItem(parts.id)" class="text-white font-bold h-6 w-5 rounded float-end bg-red-500">X</button>
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