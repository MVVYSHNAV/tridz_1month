<script setup>
import { defineProps } from 'vue';
import { ref, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    name: {
        type: String,
        default: 'Riders',
    },
});

const ShowButton = computed(() => route.path !== '/');


const dynamicRoute = computed(() => {
    if (props.name === 'Engine') {
        return '/ride/addengine'; 
    } else if (props.name === 'Riders') {
        return '/ride/additems';
    }
    else if (props.name === 'Parts') {
        return '/ride/addParts';
    }
    else if (props.name === 'Components') {
        return '/ride/addComponents';
    }
    else if (props.name === 'Spares') {
        return '/ride/addSpares';
    }
    return '/ride/additems';
});
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-black mb-6"> Browse > {{ name }}</h2>

    
    <RouterLink :to="dynamicRoute">
      <div v-if="ShowButton" class="text-black bg-amber-300 w-32 hover:bg-amber-600 hover:text-white px-7 rounded-2xl">
        <button class="py-4"> Add item </button>
      </div>
    </RouterLink>
    
  </div>
</template>
