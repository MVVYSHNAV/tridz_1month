import { createRouter, createWebHistory } from "vue-router";
import Homeview from "@/views/Homeview.vue";
import engineview from '@/components/engine.vue';
import partsview from '@/components/parts.vue';
import component from "@/components/Components.vue";
import Spares from "@/components/spares.vue";
import RIderListings from "@/components/RIderListings.vue";
import Notfound from "@/views/Notfound.vue";
import AddItem from '@/views/Additems.vue';
import AddEgine from "@/views/AddEgine.vue";
import AddParts from "@/views/AddParts.vue";
import AddComponents from "@/views/AddComponents.vue";
import AddSpares from "@/views/AddSpares.vue";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homeview
        },
        {
            path: '/showall',
            name: 'all',
            component: RIderListings
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
        {
            path: '/ride/additems',
            name: 'additem',
            component: AddItem
        },
        {
            path: '/ride/addengine',
            name: 'addengine',
            component: AddEgine
        },
        {
            path: '/ride/addparts',
            name: 'addparts',
            component: AddParts
        },
        {
            path: '/ride/addcomponents',
            name: 'addcomponents',
            component: AddComponents
        },
        {
            path: '/ride/addspares',
            name: 'addsapres',
            component: AddSpares
        },
        {
            path: '/:catchAll(.*)',
            name: 'notfound',
            component: Notfound
        },
    ],
});

export default router;