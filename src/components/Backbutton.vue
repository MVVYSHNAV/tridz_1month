<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

// Props
const props = defineProps({
  to: {
    type: String,
    default: '/'  
  }
});


const route = useRoute();

const shouldShowButton = computed(() => route.path !== '/');
</script>

<template>
<section>
  <div v-if="shouldShowButton" class="container m-auto py-6 px-6">
    <RouterLink 
      :to="props.to"
      class="inline-flex items-center px-4 py-2 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition"
    >
      ← Back
    </RouterLink>
  </div>
</section>
</template>
