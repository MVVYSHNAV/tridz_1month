<script setup>
import { reactive, ref } from 'vue';
import Backbutton from '@/components/Backbutton.vue';

const spareForm = reactive({
  spare_name: '',
  category: '',
  compatible_bikes: '',
  price_usd: '',
  manufacturer: '',
  part_number: '',
  material: '',
  lifespan_km: '',
  description: ''
});

const message = ref('');
const messageType = ref(''); 

const addSpare = async () => {
  const newData = { ...spareForm }; 

  try {
    const response = await fetch('/api/Spares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const result = await response.json();
    console.log('Spare submitted successfully:', result);

    message.value = 'Spare submitted successfully!';
    messageType.value = 'success';

    Object.keys(spareForm).forEach(key => spareForm[key] = '');
  } catch (error) {
    console.error('Error submitting spare data:', error);
    message.value = 'Error submitting spare data.';
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
          <form @submit.prevent="addSpare" class="flex items-center justify-center">
            <div class="w-2/3 bg-white mt-5 h-auto p-4 rounded-3xl">
              <h2 class="text-black font-bold text-3xl mb-4">Enter Spare Part Details</h2>
              <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xl font-semibold mb-4">
                {{ message }}
              </div>
              <div class="text-black py-5 space-y-4">
                <div>
                  <label class="text-xl">Spare Name</label>
                  <input type="text" v-model="spareForm.spare_name" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Category</label>
                  <input type="text" v-model="spareForm.category" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Compatible Bikes</label>
                  <input type="text" v-model="spareForm.compatible_bikes" class="border-2 mt-2 bg-white px-4 w-full h-12" placeholder="Comma separated compatible bikes" />
                </div>
  
                <div>
                  <label class="text-xl">Price (USD)</label>
                  <input type="number" v-model="spareForm.price_usd" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Manufacturer</label>
                  <input type="text" v-model="spareForm.manufacturer" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Part Number</label>
                  <input type="text" v-model="spareForm.part_number" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Material</label>
                  <input type="text" v-model="spareForm.material" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Lifespan (km)</label>
                  <input type="number" v-model="spareForm.lifespan_km" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Description</label>
                  <textarea v-model="spareForm.description" class="border-2 mt-2 bg-white px-4 w-full h-24"></textarea>
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
  