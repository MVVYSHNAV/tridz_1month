<script setup>
import Card from '@/components/Card.vue';
import { ref , onMounted} from 'vue';
const datengine = ref([]);
import name from '@/components/name.vue';
import BackButton from '@/components/Backbutton.vue';


onMounted(async () => {
  try {
    const response = await fetch('/api/Engine');
    const data = await response.json();
    datengine.value = data;
  } catch (error) {
    console.error('Error fetching datengine', error);
  }
});
const deleteItem = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you need to delete");
    if(confirm){
      const response = await fetch(`/api/Engine/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete engine');
    }
    datengine.value = datengine.value.filter(engine => engine.id !== id);
    console.log('engine deleted successfully');
    }
    
  } catch (error) {
    console.error('Error deleting engine:', error);
  }
};
</script>

<template>
   <BackButton :to="'/'" />
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <name name="Engine" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
       
        <Card v-for="engines in datengine" :key="engines.id">
          <button @click="deleteItem(engines.id)" class="text-white font-bold h-6 w-5 rounded float-end bg-red-500">X</button>
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