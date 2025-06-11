import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@ui/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@ui/pages/HomePage.vue')
      },
      {
        path: 'videos',
        name: 'Videos',
        component: () => import('@ui/pages/VideosPage.vue')
      },
      {
        path: 'videos/:id',  // Nouvelle route
        name: 'VideoDetails',
        component: () => import('@ui/pages/VideoDetailsPage.vue')
      },
      {
        path: 'actors',
        name: 'Actors',
        component: () => import('@ui/pages/ActorsPage.vue')
      },
      {
        path: '/actor/:id',
        name: 'ActorDetails',
        component: () => import('@ui/pages/ActorDetailsPage.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})