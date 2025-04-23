<script setup>
import RideData from '/RideData.json'
import BikeListing from '@/components/BIkeListing.vue'
import { ref, defineProps } from 'vue'

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const rides = ref(RideData.bikeRides)
</script>

<template>
    <section class="bg-blue-50 px-4 py-18">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-black mb-6"> Browse > Riders</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 w-4/6 mx-auto gap-6 "> 
            <BikeListing v-for="ride in rides.slice(0, limit  || rides.length)" :key="ride.id" :ride="ride" />
          
        </div>
        <div v-if="showButton" class=" w-4/6 mx-auto mt-5">
            <button class="bg-blue-400 w-fit p-2"> Show all </button>
        </div>
       
    </section>
  
</template>
