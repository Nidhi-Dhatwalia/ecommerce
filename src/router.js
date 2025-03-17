import { createRouter, createWebHistory } from 'vue-router';

import managePages from './components/managePages.vue';
import cartPage from './components/cartPage.vue';
import loginPage from './components/loginPage.vue';
import paymentPage from './components/paymentPage.vue'; 
import explorePage from './components/explorePage.vue';
import productDetailPage from './components/productDetailPage.vue';
import paymentConfirmationPage from './components/paymentConfirmationPage.vue';

const routes = [ 
    {
        path: '/',
        name: 'managePages',  
        component: managePages
    },
    {
        path: '/cart',
        name: 'cartPage',  
        component: cartPage
    },
    {
        path: '/login',
        name: 'loginPage',  
        component: loginPage
    },
    {
        path: '/payment',
        name: 'paymentPage',  
        component: paymentPage
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
        props: true   
      },
      {
        path: '/payment-confirmation',
        name: 'PaymentConfirmation',
        component: paymentConfirmationPage,
        props: route => ({
          productName: route.params.productName,
          productPrice: route.params.productPrice,
          trackingNumber: route.params.trackingNumber,
        }),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
