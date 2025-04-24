<!-- src/components/GenericList.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import Card from '@/components/Card.vue';
import Name from '@/components/name.vue';
import BackButton from '@/components/Backbutton.vue';

const props = defineProps({
  title: String,
  endpoint: String,
  fields: Array // [{ label: 'Label', key: 'object_key' }]
});

const items = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(`/api/${props.endpoint}`);
    items.value = await response.json();
  } catch (err) {
    console.error(`Failed to fetch ${props.endpoint}`, err);
  }
});
</script>

<template>
  <BackButton :to="'/'" />
  <section class="bg-blue-50 px-4 py-12 min-h-screen">
    <div class="container mx-auto px-4">
      <Name :name="title" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        <Card v-for="item in items" :key="item.id">
          <h3 class="text-lg font-semibold text-gray-800">{{ item.name || item[fields[0]?.key] }}</h3>
          <div class="text-sm text-gray-600" v-for="field in fields" :key="field.key">
            <p>{{ field.label }}: {{ item[field.key] }}</p>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
