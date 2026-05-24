<template>
  <v-container class="explore-container">
    <div class="explore-header">
      <div>
        <h2 class="explore-title">Explore Best Deals</h2>
        <p class="explore-subtitle">Discover premium products across all categories.</p>
      </div>
      <router-link to="/dashboard" class="back-link">
        <v-btn variant="outlined" color="primary" class="back-btn rounded-pill px-6">
          <v-icon left>mdi-arrow-left</v-icon> Back to Home
        </v-btn>
      </router-link>
    </div>

    <!-- Category Filter Chips -->
    <div class="category-filters mb-8">
      <v-slide-group show-arrows>
        <v-slide-group-item>
           <v-chip 
              class="category-chip ma-2"
              :color="selectedCategory === '' ? 'primary' : 'default'"
              :variant="selectedCategory === '' ? 'flat' : 'outlined'"
              @click="selectCategory('')"
              size="large"
            >
              All Products
            </v-chip>
        </v-slide-group-item>
        <v-slide-group-item
          v-for="(category, index) in categories"
          :key="index"
        >
          <v-chip
            class="category-chip ma-2 text-capitalize"
            :color="selectedCategory === category ? 'primary' : 'default'"
            :variant="selectedCategory === category ? 'flat' : 'outlined'"
            @click="selectCategory(category)"
            size="large"
          >
            {{ category.replace('-', ' ') }}
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="d-flex justify-center align-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" width="4"></v-progress-circular>
    </div>

    <!-- Product Grid -->
    <v-row v-else-if="bestDeals.length > 0" class="product-grid">
      <v-col
        v-for="(product, index) in bestDeals"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="explore-card hover-lift" elevation="0">
          <div class="image-wrapper">
            <v-img :src="product.image" height="220" cover class="product-img"></v-img>
          </div>
          
          <v-card-text class="d-flex flex-column card-content">
            <p class="product-category text-uppercase">{{ product.category.replace('-', ' ') }}</p>
            <h3 class="product-name text-truncate">{{ product.title }}</h3>
            <p class="product-price">${{ product.price }}</p>
            
            <v-spacer></v-spacer>
            
            <div class="action-buttons mt-4">
              <v-btn
                variant="flat"
                color="primary"
                class="visit-btn"
                block
                @click="visitProduct(product.id)"
              >
                View Details
              </v-btn>
              
              <v-btn
                variant="flat"
                :color="product.isInCart ? 'success' : 'grey-darken-3'"
                class="add-btn mt-2"
                block
                @click="addToCart(product)"
              >
                <v-icon left v-if="product.isInCart">mdi-check</v-icon>
                {{ product.isInCart ? "In Cart" : "Add to Cart" }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else-if="!loading" class="empty-state py-12">
      <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-package-variant-closed</v-icon>
      <h3 class="empty-title">No products found</h3>
      <p class="empty-subtitle">We couldn't find any products in this category.</p>
      <v-btn color="primary" variant="outlined" @click="fetchBestDeals('')" class="mt-4 rounded-pill">
        Clear Filters
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from "../stores/cartStore";

const router = useRouter();
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
  selectedCategory.value = category;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products${category ? \`/category/\${category}\` : ""}`
    );

    bestDeals.value = response.data.products.map((product) => ({
      title: product.title,
      category: product.category,
      image: product.images[0],
      price: product.price,
      id: product.id,
      isInCart: cartStore.cart.some((item) => item.id === product.id),
    }));
  } catch (error) {
    console.error("Error fetching best deals:", error);
    bestDeals.value = [];
  } finally {
    loading.value = false;
  }
};

const selectCategory = (category) => {
  fetchBestDeals(category);
};

const visitProduct = (productId) => {
  router.push(`/product/${productId}`);
};

const isProductInCart = (product) => {
  return cartStore.cart.some((item) => item.id === product.id);
};

const addToCart = (product) => {
  if (!isProductInCart(product)) {
    cartStore.addToCart(product);
    const item = bestDeals.value.find(p => p.id === product.id);
    if (item) item.isInCart = true;
  } else {
    cartStore.removeFromCart(product);
    const item = bestDeals.value.find(p => p.id === product.id);
    if (item) item.isInCart = false;
  }
};

onMounted(() => {
  fetchBestDeals();
});
</script>

<style scoped>
.explore-container {
  max-width: 1400px;
  padding: 40px 20px;
}

.explore-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding-bottom: 20px;
}

.explore-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.explore-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.back-link {
  text-decoration: none;
}

.back-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

.category-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.category-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.explore-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  background: white;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.explore-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important;
}

.image-wrapper {
  background: #f3f4f6;
  padding: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.03);
}

.product-img {
  mix-blend-mode: multiply;
  border-radius: 8px;
}

.card-content {
  flex-grow: 1;
  padding: 20px;
}

.product-category {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6366f1;
  margin: 0 0 4px 0;
  letter-spacing: 1px;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.action-buttons {
  width: 100%;
}

.visit-btn, .add-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  border-radius: 8px;
  height: 44px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: white;
  border-radius: 16px;
  border: 1px dashed rgba(0,0,0,0.1);
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.empty-subtitle {
  color: #6b7280;
  margin: 0;
}
</style>
