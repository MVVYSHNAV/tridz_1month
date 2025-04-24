<script setup>
import Card from '@/components/Card.vue';
import { ref , onMounted} from 'vue';
const datcomp = ref([]);
import name from '@/components/name.vue';
import BackButton from '@/components/Backbutton.vue';

onMounted(async() => { 
  try{
    const response = await fetch('/api/Components');
    const data = await response.json();
    datcomp.value = data;
  } catch(error){
    console.error('Error fetching datcomp', error);
  }
});

const deleteItem = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you need to delete");
    if(confirm){
      const response = await fetch(`/api/Components/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete components');
    }
    datcomp.value = datcomp.value.filter(components => components.id !== id);
    console.log('components deleted successfully');
    }
    
  } catch (error) {
    console.error('Error deleting components:', error);
  }
};
</script>

<template>
   <BackButton :to="'/'" />
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <name name="Components" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6 mt-8">
        <Card v-for="Components in datcomp" :key="Components.id">
          <button @click="deleteItem(Components.id)" class="text-white font-bold h-6 w-5 rounded float-end bg-red-500">X</button>
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