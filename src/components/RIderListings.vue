<script setup>
import BikeListing from '@/components/BIkeListing.vue'
import  { RouterLink } from 'vue-router';
import { ref, defineProps, onMounted } from 'vue';
import name from '@/components/name.vue';
import Backbutton from '@/components/Backbutton.vue';
import  {useRouter } from'vue-router'

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})
const router = useRouter();
const rides = ref([]);

const showall = () => {
  router.push('/showall'); 
};

const refreshData = async () => {
  try {
    const response = await fetch('/api/bikeRides');
    const data = await response.json();
    if (Array.isArray(data)) {
      rides.value = data;
    } else {
      console.error('Received data is not an array');
    }
  } catch (error) {
    console.error('Error fetching rides', error);
  }
};

onMounted(() => {
  refreshData();
});
</script>

<template>
    <Backbutton />
    <section class="bg-blue-50 px-4 py-18">
        <div class="container-xl lg:container m-auto">
            <name />
            
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 w-4/6 mx-auto gap-6 "> 
            <BikeListing v-for="ride in rides.slice(0, limit  || rides.length)" :key="ride.name" :ride="ride" />
        </div>
        <div v-if="showButton" class=" w-4/6 mx-auto mt-5">
           
                <button @click="showall" class="bg-blue-400 w-fit p-2"> Show all </button>
            
        </div>
    </section>
  
</template>
