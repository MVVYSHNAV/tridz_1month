<script setup>
import {defineProps} from 'vue';

defineProps({
    title: {
        type: String,
        default: 'Became a Rider'
    },
    subtitle: {
        type: String,
        default:  'A rider need to know about all the fucking way of escaping.'
    }
})
</script>

<template>
    <section class="w-full bg-amber-200 py-52 mb-4">
        <div class="w-2/6 mx-auto ">
            <h1 class="text-2xl text-center font-bold text-black">
                {{ title}}
            </h1>
            <p class="text-black"> 
               {{ subtitle }}
            </p>
        </div>

    </section>
</template>