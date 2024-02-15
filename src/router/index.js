import { createRouter, createWebHistory } from 'vue-router';
import RenderMapViewVue from '@/views/RenderMapView.vue';
import FormMapView from '@/views/FormMapView.vue';
import FormMapViewVue from '@/views/FormMapView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FormMapViewVue
    },
    {
      path: '/maprender',
      name: 'maprender',
      component:  RenderMapViewVue
    },
    {
      path: '/mapform',
      name: 'mapform',
      component: FormMapView
    },
  ]
});

export default router;
