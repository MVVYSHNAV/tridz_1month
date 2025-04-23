<script setup>
import Hero from '@/components/Hero.vue';
import Homecard from '@/components/Homecards.vue';
import RideListing from '@/components/RIderListings.vue'
</script>
<template>
      <Hero title="Rider Ride to Trills" subtitle="Every danger should get in hands to avoid the fear" />
        <Homecard />
        <RideListing :limit="5"/>
</template>