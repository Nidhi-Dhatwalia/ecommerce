<template>
  <div class="nav-container">
    <v-toolbar flat class="toolbar">
      <v-toolbar-title class="title">E-Commerce</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        v-model="showMenu"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ props }">
          <div class="search-wrapper" v-bind="props">
            <v-text-field
              v-model="searchQuery"
              label="Search for products"
              outlined
              prepend-inner-icon="mdi-magnify"
              @input="searchProducts"
              class="input-style"
              hide-details
              dense
            >
              <template v-slot:append-inner>
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  color="primary"
                  size="20"
                  width="2"
                ></v-progress-circular>
              </template>
            </v-text-field>
          </div>
        </template>
        <v-list v-if="products.length > 0" class="search-dropdown">
          <v-list-item
            v-for="(product, index) in products"
            :key="index"
            @click="selectProduct(product.title)"
            class="dropdown-item"
          >
            <v-list-item-title>{{ product.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else-if="searchQuery && !loading" class="search-dropdown">
          <v-list-item>
            <v-list-item-title class="text-grey">No products found</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="avatar-btn">
            <v-avatar color="info" class="avatar">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="profile-dropdown">
          <v-list-item @click="logout" class="logout-item">
            <template v-slot:prepend>
              <v-icon color="red">mdi-logout</v-icon>
            </template>
            <v-list-item-title class="text-red font-weight-bold">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon class="icon-btn">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <router-link to="/cart" class="cart-link">
        <v-btn icon class="icon-btn">
          <v-badge color="red" :content="cartStore.cart.length" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </router-link>
    </v-toolbar>
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
const showMenu = ref(false);

const searchProducts = async () => {
  if (!searchQuery.value) {
    products.value = [];
    showMenu.value = false;
    return;
  }

  loading.value = true;
  showMenu.value = true;

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
  showMenu.value = false;
};

const logout = () => {
  localStorage.removeItem("authToken");
  router.push("/");
};
</script>

<style scoped>
.nav-container {
  margin: 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}

.toolbar {
  background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
}

.title {
  font-weight: 800;
  font-size: 24px;
  flex-grow: 1;
  color: white;
  letter-spacing: 1px;
}

.search-wrapper {
  width: 350px;
  margin-right: 20px;
}

.input-style {
  border-radius: 25px;
  background-color: white;
  color: black;
  transition: all 0.3s ease;
}

:deep(.v-field) {
  border-radius: 25px !important;
  box-shadow: none !important;
}

.search-dropdown {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  padding: 8px;
  max-height: 350px;
  overflow-y: auto;
  width: 350px;
}

.dropdown-item {
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f4f8;
}

.profile-dropdown {
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.logout-item {
  border-radius: 8px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.logout-item:hover {
  background-color: #fee2e2;
}

.avatar {
  margin-left: 10px;
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
  color: #64b5f6;
}

.cart-link {
  text-decoration: none;
}
</style>
