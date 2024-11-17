import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/login/LoginPage.vue';
import RegisterPage from "@/components/RegisterPage/RegisterPage.vue";
import HomePage from "@/components/home/HomePage.vue";
import tableArticle from "@/components/table/tableArticle.vue";
import newArticle from "@/components/newArticle/newArticle.vue";

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        meta: {requiresAuth: true},
        children: [
            {
                path: '',
                name:'tableArticle',
                component: tableArticle
            },
            {
                path: 'newArticle',
                name: 'newArticle',
                component: newArticle
            },
            {
                path: '/articles/edit/:slug',
                name: 'edit-article',
                component: ()=> import('@/components/newArticle/newArticle.vue'),
                props: true,
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, form, next)=>{
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
})

export default router;
