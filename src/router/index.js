import { createRouter, createWebHistory } from "vue-router";
import Homeview from "@/views/Homeview.vue";
import engineview from '@/components/engine.vue';
import partsview from '@/components/parts.vue';
import component from "@/components/Components.vue";
import Spares from "@/components/spares.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homeview
        },
        {
            path: '/ride/engine',
            name: 'engine',
            component: engineview
        },
        {
            path: '/ride/parts',
            name: 'parts',
            component: partsview
        },
        {
            path: '/ride/components',
            name: 'components',
            component: component
        },
        {
            path: '/ride/spares',
            name: 'spares',
            component: Spares
        },
    ],
});

export default router;