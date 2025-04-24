
<script setup>
import {defineProps, ref, computed} from 'vue';



const props = defineProps ({
    ride: Object
})
const toggleshowfull = () => {
    showFull.value = !showFull.value;
}
const showFull = ref(false);
const  trucnked = computed(() => {
    let desc = props.ride.riderName;
    if(!showFull.value){
        desc = desc.substring(0,3) + '...';
    }
    return desc;
})

const deleteItem = async () => {
  try {
    const response = await fetch(`/api/bikeRides/${props.ride.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete ride');
    }

    console.log('Ride deleted successfully');
  } catch (error) {
    console.error('Error deleting ride:', error);
  }
};


</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4">
    <button @click="deleteItem" class="text-white font-bold h-6 w-5 rounded float-end  bg-red-500"> X </button>
    <div>
      <h2 class="text-2xl font-bold text-gray-800">{{ trucnked }}</h2> <button @click="toggleshowfull" class="text-red-400">{{ showFull ? 'less' : 'More' }}</button>
      <h4 class="text-lg text-gray-500">{{ride.bikeType}}</h4>
     
    </div>

    <div class="text-gray-700">
      {{ride.date}}
    </div>

    <div class="text-sm text-gray-600">
      <p><strong>{{ride.startLocation}}</strong> -> <strong>{{ride.endLocation}}</strong></p>
    </div>

    <a
      href="#"
      class="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium transition duration-200"
    >
      Read More →
      
    </a>
  </div>
</template>
