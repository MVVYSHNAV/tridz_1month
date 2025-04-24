<script setup>
import { reactive, ref } from 'vue';
import Backbutton from '@/components/Backbutton.vue';

const componentForm = reactive({
  component_name: '',
  category: '',
  material: '',
  weight_kg: '',
  description: '',
  functions: ''
});

const message = ref('');
const messageType = ref(''); 

const addComponent = async () => {
  const newData = { ...componentForm }; 

  try {
    const response = await fetch('/api/Components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const result = await response.json();
    console.log('Component submitted successfully:', result);

    message.value = 'Component submitted successfully!';
    messageType.value = 'success';

    Object.keys(componentForm).forEach(key => componentForm[key] = ''); 
  } catch (error) {
    console.error('Error submitting component data:', error);
    message.value = 'Error submitting component data.';
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
          <form @submit.prevent="addComponent" class="flex items-center justify-center">
            <div class="w-2/3 bg-white mt-5 h-auto p-4 rounded-3xl">
              <h2 class="text-black font-bold text-3xl mb-4">Enter Component Details</h2>
              <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xl font-semibold mb-4">
                {{ message }}
              </div>
              <div class="text-black py-5 space-y-4">
                <div>
                  <label class="text-xl">Component Name</label>
                  <input type="text" v-model="componentForm.component_name" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Category</label>
                  <input type="text" v-model="componentForm.category" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Material</label>
                  <input type="text" v-model="componentForm.material" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Weight (kg)</label>
                  <input type="number" v-model="componentForm.weight_kg" class="border-2 mt-2 bg-white px-4 w-full h-12" />
                </div>
  
                <div>
                  <label class="text-xl">Description</label>
                  <textarea v-model="componentForm.description" class="border-2 mt-2 bg-white px-4 w-full h-24"></textarea>
                </div>
  
                <div>
                  <label class="text-xl">Functions</label>
                  <input type="text" v-model="componentForm.functions" class="border-2 mt-2 bg-white px-4 w-full h-12" placeholder="Comma separated functions" />
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
  