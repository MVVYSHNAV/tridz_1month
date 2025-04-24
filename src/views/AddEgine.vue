<script setup>
import { reactive, ref } from 'vue';
import Backbutton from '@/components/Backbutton.vue';

const engineForm = reactive({
  engine_name: '',
  type: '',
  fuel_type: '',
  displacement_cc: '',
  cooling: '',
  fuel_delivery: '',
  max_power_hp: '',
  torque_nm: '',
  cylinders: '',
  applications: []
});

const message = ref('');
const messageType = ref(''); 

const addItem = async () => {
  const newData = { ...engineForm }; 

  try {
    const response = await fetch('/api/Engine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const result = await response.json();
    console.log('Engine submitted successfully:', result);

    message.value = 'Engine submitted successfully!';
    messageType.value = 'success';

    Object.keys(engineForm).forEach(key => engineForm[key] = '');
  } catch (error) {
    console.error('Error submitting engine data:', error);
    message.value = 'Error submitting engine data.';
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
            <h2 class="text-black font-bold text-3xl mb-4">Enter Engine Details</h2>
            <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xl font-semibold mb-4">
              {{ message }}
            </div>
            <div class="text-black py-5 space-y-4">
              <div>
                <label class="text-xl">Engine Name</label>
                <input type="text" v-model="engineForm.engine_name" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Type</label>
                <input type="text" v-model="engineForm.type" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Fuel Type</label>
                <input type="text" v-model="engineForm.fuel_type" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Displacement (cc)</label>
                <input type="number" v-model="engineForm.displacement_cc" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Cooling</label>
                <input type="text" v-model="engineForm.cooling" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Fuel Delivery</label>
                <input type="text" v-model="engineForm.fuel_delivery" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Max Power (HP)</label>
                <input type="number" v-model="engineForm.max_power_hp" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Torque (Nm)</label>
                <input type="number" v-model="engineForm.torque_nm" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Cylinders</label>
                <input type="number" v-model="engineForm.cylinders" class="border-2 mt-2 bg-white px-4 w-full h-12" />
              </div>

              <div>
                <label class="text-xl">Applications</label>
                <input type="text" v-model="engineForm.applications" class="border-2 mt-2 bg-white px-4 w-full h-12" placeholder="Comma separated applications" />
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
