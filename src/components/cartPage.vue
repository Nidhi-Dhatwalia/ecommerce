<template>
  <v-container class="container">
    <div class="cart-wrapper">
      <h2 class="text-h4 font-weight-bold mb-4">Your Cart  
        <router-link to="/"> 
          <v-btn color="primary"> Back </v-btn>
        </router-link> 
      </h2>

      <v-row v-if="cart.length > 0" class="cart-items">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in cart" :key="index">
          <v-card class="product-card" elevation="3">
            <v-img :src="item.image?.[0]" height="200px" contain class="product-image"></v-img>
            <v-card-text>
              <p class="product-name">{{ item.title }}</p>
              <p class="product-price">${{ item.price }}</p>
              <p class="quantity">Quantity: {{ item.quantity }}</p>
            </v-card-text>

            <v-btn @click="removeFromCart(index)" block class="remove-from-cart-btn" color="black" dark>
              Remove from Cart
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="cart.length > 0" class="cart-summary-box">
        <div class="cart-summary-item">
          <strong>Total Products:</strong> {{ totalProducts }}
        </div>
        <div class="cart-summary-item">
          <strong>Total Cost:</strong> ₹{{ totalCostInRupees.toFixed(2) }}
        </div>

        <v-btn color="red" @click="clearCart" class="shop-btn" dark>Clear Cart</v-btn>

        <router-link to="/explore">
          <v-btn class="shop-btn continue-shopping-btn" color="blue" dark>
            Continue Shopping
          </v-btn>
        </router-link>

        <router-link to="/payment">
          <v-btn 
            v-if="cart.length > 0"
            class="shop-btn proceed-to-payment-btn"
            color="green"
            dark
          >
            Proceed to Payment
          </v-btn>
        </router-link>

      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';
import { computed } from 'vue';

const exchangeRate = 82;

const cartStore = useCartStore();
const cart = cartStore.cart;

const clearCart = () => {
  console.log("Clear cart triggered");
  cartStore.clearCart();
};

const removeFromCart = (index) => {
  console.log('Removing item at index:', index);
  cartStore.removeFromCart(index);
};

const totalProducts = computed(() => {
  return cart.reduce((total, item) => total + item.quantity, 0);
});

const totalCost = computed(() => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalCostInRupees = computed(() => {
  return totalCost.value * exchangeRate;
});
</script>

<style scoped>
.container {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.text-h4 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.cart-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  border-radius: 12px;
  object-fit: cover;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 15px;
  color: #333;
  text-align: center;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1976D2;
  text-align: center;
}

.quantity {
  margin-top: 8px;
  font-size: 1rem;
  color: #555;
  text-align: center;
}

.shop-btn {
  width: 100%;
  padding: 14px 0;
  text-transform: uppercase;
  font-size: 1.1rem;
  margin-top: 15px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.shop-btn:hover {
  background-color: #1976d2;
}

.continue-shopping-btn {
  margin-top: 15px;
}

.proceed-to-payment-btn {
  background-color: #28a745;
  color: white;
  margin-top: 15px;
  border-radius: 6px;
}

.remove-from-cart-btn {
  background-color: #f31515;
  color: white;
  font-weight: bold;
  padding: 12px 0;
  transition: background-color 0.3s ease;
  border-radius: 6px;
}

.remove-from-cart-btn:hover {
  background-color: #c93535;
}

.cart-summary-box {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cart-summary-item {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.cart-summary-item strong {
  color: #1976D2;
}
</style>
