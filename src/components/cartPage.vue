<template>
  <v-container class="cart-container">
    <div class="cart-header">
      <h2 class="cart-title">Shopping Cart</h2>
      <v-btn variant="text" color="primary" class="back-btn" to="/dashboard">
        <v-icon left>mdi-arrow-left</v-icon> Continue Shopping
      </v-btn>
    </div>

    <v-row v-if="cart.length > 0" class="cart-content">
      <!-- Items List -->
      <v-col cols="12" md="8">
        <v-card class="cart-items-card" elevation="0">
          <div class="pa-6">
            <template v-for="(item, index) in cart" :key="index">
              <div class="cart-item">
                <div class="item-image-wrapper">
                  <v-img :src="item.image" class="item-image" cover></v-img>
                </div>
                
                <div class="item-details">
                  <div class="item-header">
                    <h3 class="item-name">{{ item.title }}</h3>
                    <span class="item-price">${{ item.price }}</span>
                  </div>
                  
                  <div class="item-actions">
                    <div class="quantity-badge">Qty: {{ item.quantity }}</div>
                    <v-btn 
                      variant="text" 
                      color="error" 
                      class="remove-btn px-4"
                      @click="removeFromCart(item)"
                    >
                      <v-icon left>mdi-delete</v-icon> Remove
                    </v-btn>
                  </div>
                </div>
              </div>
              <v-divider v-if="index < cart.length - 1" class="my-6"></v-divider>
            </template>
          </div>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" md="4">
        <v-card class="summary-card" elevation="0">
          <h3 class="summary-title">Order Summary</h3>
          <v-divider class="my-4"></v-divider>
          
          <div class="summary-row">
            <span class="summary-label">Items ({{ totalProducts }}):</span>
            <span class="summary-value">${{ totalCost.toFixed(2) }}</span>
          </div>
          
          <div class="summary-row">
            <span class="summary-label">Shipping:</span>
            <span class="summary-value text-success">Free</span>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <div class="summary-row total-row">
            <span class="summary-label">Total:</span>
            <span class="summary-value">${{ totalCost.toFixed(2) }}</span>
          </div>

          <v-btn 
            block 
            color="success" 
            size="x-large" 
            class="checkout-btn mt-6"
            :to="{ name: 'paymentPage', state: { cartItems: cart } }"
          >
            Proceed to Checkout
          </v-btn>
          
          <v-btn 
            block 
            variant="outlined" 
            color="error" 
            class="clear-btn mt-4" 
            @click="clearCart"
          >
            Clear Cart
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-cart-outline</v-icon>
      <h3 class="empty-title">Your cart is empty</h3>
      <p class="empty-subtitle">Looks like you haven't added anything yet.</p>
      <v-btn color="primary" size="large" to="/explore" class="mt-6 px-8 rounded-pill">
        Start Shopping
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore";
import { computed } from "vue";

const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);

const removeFromCart = (product) => {
  cartStore.removeFromCart(product);
};

const clearCart = () => {
  cartStore.clearCart();
};

const totalProducts = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const totalCost = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});
</script>

<style scoped>
.cart-container {
  max-width: 1300px;
  padding: 40px 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.back-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  font-size: 1.1rem;
}

.cart-items-card {
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03) !important;
  background: white;
}

.cart-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.item-image-wrapper {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.item-image {
  width: 100%;
  height: 100%;
  mix-blend-mode: multiply;
}

.item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  padding: 10px 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.item-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  padding-right: 20px;
  line-height: 1.3;
}

.item-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  white-space: nowrap;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.quantity-badge {
  background: #f3f4f6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
}

.remove-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  font-size: 1rem;
}

.summary-card {
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03) !important;
  padding: 30px;
  background: #f9fafb;
  position: sticky;
  top: 100px;
}

.summary-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.summary-label {
  color: #4b5563;
  font-weight: 500;
  font-size: 1.1rem;
}

.summary-value {
  font-weight: 600;
  color: #111827;
  font-size: 1.1rem;
}

.total-row {
  margin-top: 24px;
  margin-bottom: 0;
}

.total-row .summary-label {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}

.total-row .summary-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #4f46e5;
}

.checkout-btn {
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.5px;
  border-radius: 12px;
}

.clear-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  border-radius: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
}

.empty-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 1.1rem;
}
</style>
