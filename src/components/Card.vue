<script setup>
import {defineProps} from 'vue';

defineProps ({
    bg:{
        type: String,
        default: 'bg-amber-100'
    }
})
</script>
<template>
     <div :class="`${bg}  p-6 rounded-lg text-black`">
        <slot></slot>
     </div>
</template>