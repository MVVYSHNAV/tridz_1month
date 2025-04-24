<script setup>
import { reactive, ref } from 'vue';
import Backbutton from '@/components/Backbutton.vue';

const form = reactive({
  riderName: '',
  date: '',
  startLocation: '',
  endLocation: '',
  distanceKm: '',
  durationMinutes: '',
  bikeType: '',
  averageSpeedKmh: ''
});

const message = ref('');
const messageType = ref(''); 

const addItem = async () => {
  const newData = { ...form };

  try {
    const response = await fetch('/api/bikeRides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const result = await response.json();
    console.log('Ride submitted successfully:', result);


    message.value = 'Ride submitted successfully!';
    messageType.value = 'success';


    Object.keys(form).forEach(key => form[key] = '');
  } catch (error) {
    console.error('Error submitting ride data:', error);
    message.value = 'Error submitting ride data.';
    messageType.value = 'error';
  }


  setTimeout(() => {
    message.value = '';
  }, 3000);
};
</script>


<template>
  <Backbutton />
  <section>
    <div class="flex bg-white w-full h-auto">
      <div class="w-5/6 bg-amber-100 mx-auto mt-5 rounded-3xl">
        <form @submit.prevent="addItem" class="flex items-center justify-center">
          <div class="w-2/3 bg-white mt-5 h-auto p-4 rounded-3xl">
            <h2 class="text-black font-bold text-3xl mb-4">Enter the Values for Riders</h2>
            <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xl font-semibold mb-4">
              {{ message }}
            </div>
            <div class="text-black py-5 space-y-4">
              <div>
                <label class="text-xl">Rider Name</label>
                <input type="text" v-model="form.riderName" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Date</label>
                <input type="date" v-model="form.date" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Start Location</label>
                <input type="text" v-model="form.startLocation" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">End Location</label>
                <input type="text" v-model="form.endLocation" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Distance (Km)</label>
                <input type="number" v-model="form.distanceKm" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Duration (Minutes)</label>
                <input type="number" v-model="form.durationMinutes" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Bike Type</label>
                <input type="text" v-model="form.bikeType" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Average Speed (Kmh)</label>
                <input type="number" v-model="form.averageSpeedKmh" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>
            </div>

            <button type="submit"
              class="text-white font-bold hover:bg-blue-700 bg-blue-400 w-full p-4 rounded-3xl mt-6">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
