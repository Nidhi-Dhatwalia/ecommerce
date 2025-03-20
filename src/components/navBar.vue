<template>
  <div class="container">
  
    <v-toolbar flat class="toolbar">
      <v-toolbar-title class="title">E-Commerce</v-toolbar-title>
      <v-spacer></v-spacer>

    
      <v-text-field
        v-model="searchQuery"
        label="Search for products"
        outlined
        prepend-icon="mdi-magnify"
        @input="searchProducts"
        class="input-style"
        dense
      />

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="blue"
        size="18"
      ></v-progress-circular>

      
      <v-btn icon @click="logout" class="avatar-btn">
        <v-avatar color="info" class="avatar">
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>

    
      <v-btn icon class="icon-btn">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

   
      <router-link to="/cart">
        <v-btn icon class="icon-btn">
          <v-badge color="red" :content="cartStore.cart.length" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </router-link>
    </v-toolbar>
 
    <v-list v-if="products.length > 0" class="product-dropdown">
      <v-list-item
        v-for="(product, index) in products"
        :key="index"
        @click="selectProduct(product.title)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ product.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import axios from "axios";
import { useRouter } from "vue-router";

 
const cartStore = useCartStore();
const searchQuery = ref("");
const loading = ref(false);
const products = ref([]);
const router = useRouter();

 
const searchProducts = async () => {
  if (!searchQuery.value) {
    products.value = [];
    return;
  }

  loading.value = true;

  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery.value}`);
    products.value = response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};
 
const selectProduct = (title) => {
  searchQuery.value = title;
  products.value = [];   
};

 
const logout = () => {
  localStorage.removeItem("authToken");  
  router.push("/");  
};
</script>

<style scoped>
.container {
  margin: 0;
}
 
.toolbar {
  background-color: #272727;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
}

.title {
  font-weight: bold;
  font-size: 24px;
  flex-grow: 1;
  color: white;
}

 
.input-style {
  border-radius: 25px;
  width: 350px;
  margin-right: 20px;
  height: 55px;
  padding: 0 12px;
  background-color: white;
  color: black;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

 
.product-dropdown {
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-top: 8px;
  background-color: white;
  position: fixed;
  top: 28%;
  left: 61%;
  transform: translate(-50%, -50%);
  width: 600px;
  z-index: 10;
  border-radius: 12px;
}

 
.product-dropdown .v-list-item {
  padding: 8px 16px;
}

.product-dropdown .v-list-item-title {
  font-weight: bold;
  color: #333;
}

 
.avatar {
  margin-left: 20px;
}

.avatar-btn {
  margin-left: 16px;
}

.icon-btn {
  margin-left: 16px;
  transition: transform 0.3s ease-in-out;
  font-weight: bold;
  color: white;
}

.icon-btn:hover {
  transform: scale(1.1);
  color: #1976d2;
}
</style>
