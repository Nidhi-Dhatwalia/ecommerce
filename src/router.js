import { createRouter, createWebHistory } from 'vue-router';

import loginPage from './components/loginPage.vue';
import managePages from './components/managePages.vue';
import cartPage from './components/cartPage.vue';
import paymentPage from './components/paymentPage.vue'; 
import explorePage from './components/explorePage.vue';
import productDetailPage from './components/productDetailPage.vue';
import paymentConfirmationPage from './components/paymentConfirmationPage.vue';
 

const routes = [ 
    {
        path: '/',
        name: 'loginPage',  
        component: loginPage
    },
    {
        path: '/dashboard',
        name: 'managePages',  
        component: managePages
    },
    {
        path: '/cart',
        name: 'cartPage',  
        component: cartPage
    }, 
    {
        path: '/explore',
        name: 'explorePage',
        component: explorePage
    },
    {
        path: '/product/:productId',   
        name: 'product-detail',
        component: productDetailPage,
    },
    {
        path: '/payment',
        name: 'paymentPage',  
        component: paymentPage,
    },
    {
        path: '/payment-confirmation',
        name: 'PaymentConfirmation',
        component: paymentConfirmationPage
    }, 
    ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;
