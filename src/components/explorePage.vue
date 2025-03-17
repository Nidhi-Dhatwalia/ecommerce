<template>
  <v-container class="container">
    <h2 class="heading">
      Best Deals
      <v-btn icon @click="showFilterMenu = !showFilterMenu" class="icon-btn">
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <router-link to="/" class="back-btn-link">
        <v-btn color="primary">
          <v-icon>mdi-arrow-left</v-icon> Back
        </v-btn>
      </router-link>
    </h2>


    <v-list v-if="showFilterMenu" class="filter-list">
      <v-list-item
        v-for="(category, index) in categories"
        :key="index"
        @click="selectCategory(category)"
        class="filter-item"
      >
        <v-list-item-title>{{ category }}</v-list-item-title>
      </v-list-item>
    </v-list>

  
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="blue"
      size="64"
      class="loading-spinner"
    ></v-progress-circular>

 
    <v-row v-if="bestDeals.length > 0" class="product-grid">
      <v-col
        v-for="(product, index) in bestDeals"
        :key="index"
        class="product-col"
      >
        <v-card class="product-card" elevation="5">
          <v-img
            :src="product.images[0]"
            height="200px"
            contain
            alt="Product Image"
            class="product-image"
          ></v-img>
          <v-card-text class="product-card-text">
            <p class="product-name">{{ product.title }}</p>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">${{ product.price }}</p>

            <router-link :to="'/product/' + product.id">
              <v-btn
                color="primary"
                class="visit-button"
                @click="visitProduct(product.id)"
              >
                Visit Item
              </v-btn>
            </router-link>

            <v-btn
              color="secondary"
              class="add-to-cart-button"
              @click="addToCart(product)"
            >
              Add to Cart
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

 
    <div v-if="bestDeals.length === 0 && !loading" class="no-products">
      <p>No products found for this category.</p>
      <v-btn color="primary" @click="fetchBestDeals()">Reload</v-btn>
    </div>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from "../stores/cartStore";

const router = useRouter();
const showFilterMenu = ref(false);
const selectedCategory = ref("");
const loading = ref(false);
const bestDeals = ref([]);
const categories = ref([
  "smartphones",
  "laptops",
  "groceries",
  "beauty",
  "womens-dresses",
  "fragrances",
  "furniture",
  "sunglasses",
  "womens-jewellery",
]);

const cartStore = useCartStore();

const fetchBestDeals = async (category = "") => {
  loading.value = true;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products${category ? `/category/${category}` : ""}`
    );
    bestDeals.value = response.data.products.map((product) => ({
      title: product.title,
      category: product.category,
      images: product.images,
      price: product.price,
      id: product.id,
    }));
  } catch (error) {
    console.error("Error fetching best deals:", error);
    bestDeals.value = [];
  } finally {
    loading.value = false;
  }
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  showFilterMenu.value = false;
  fetchBestDeals(category);
};

const visitProduct = (productId) => {
  router.push("/product-detail/${productId}");
};


const addToCart = (product) => {
  cartStore.addToCart(product);
};

onMounted(() => {
  fetchBestDeals();
});
</script>



<style scoped>
.container {
  max-width: 1600px;
  margin: 50px auto;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
}

.heading {
  color: #333;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-btn {
  margin-left: 10px;
  color: #5469d4;
}

.back-btn-link {
  text-decoration: none;
}

.filter-list {
  background-color: #fafafa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
}

.filter-item {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.filter-item:hover {
  background-color: #f1f1f1;
}

.product-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.product-col {
  padding: 15px;
}

.product-card {
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  border-radius: 8px;
}

.product-card-text {
  padding: 15px;
  text-align: center;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.product-category {
  font-size: 0.9rem;
  color: #777;
  margin: 5px 0;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 10px 0;
}

.visit-button,
.add-to-cart-button {
  width: 100%;
  margin-top: 10px;
}

.visit-button:hover {
  background-color: #4353b3;
}

.add-to-cart-button {
  background-color: #f39c12;
  color: white;
}

.add-to-cart-button:hover {
  background-color: #e67e22;
}

.loading-spinner {
  display: block;
  margin: 30px auto;
}

.no-products {
  text-align: center;
  margin-top: 30px;
  color: #555;
}

.no-products v-btn {
  margin-top: 15px;
}
</style>
