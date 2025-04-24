<script setup>
import Card from '@/components/Card.vue';
</script>
<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
               <Card bg="bg-amber-400">
                    <h2 class="text-2xl font-bold"> For Riders </h2>
                    <p class="mt-2  mb-4">
                        Browse the site and start your  journey
                    </p>
                    <a href="/k" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Site
                    </a>
               </Card>
                <Card>
                    <h2 class="text-2xl font-bold"> For Bikers </h2>
                    <p class="mt-2  mb-4"> List your bike to find the perfect ride for the Journey</p>
                    <a href="/k" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Site
                    </a>
                </Card>
            </div>
        </div>
    </section>
</template>