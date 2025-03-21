<template>
  <v-container class="product-container">
    <h2 class="section-title">Best Deals</h2>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="(product, index) in bestDeals" :key="index">
        <v-card class="product-card" elevation="2">
          <v-chip class="deal-badge" label small>Best Deal</v-chip>
          <v-card-text>
            <v-img
              :src="product.image"
              height="200px"
              contain
              class="product-image"
            />

            <p class="product-title">{{ product.title }}</p>
            <p class="product-discount">
              Discount: {{ product.discountPercentage }}% Off
            </p>
            <div class="quantity-controls">
              <v-btn
                icon
                size="small"
                @click="decreaseQuantity(index)"
                class="quantity-btn"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="quantity">{{ product.quantity }}</span>
              <v-btn
                icon
                size="small"
                @click="increaseQuantity(index)"
                class="quantity-btn"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>

            <v-btn
              @click="toggleCart(product, index)"
              block
              class="add-to-cart-btn"
              :color="product.isInCart ? 'red' : 'black'"
              dark
            >
              {{ product.isInCart ? "Added" : "Add to Cart" }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <div class="text-center mt-4">
      <router-link to="/explore">
        <v-btn color="red" class="explore-btn" dark> Explore More </v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import axios from "axios";

const cartStore = useCartStore();
const bestDeals = ref([]);

const fetchBestDeals = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    bestDeals.value = response.data.products.map((product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
      image: product.images[0],
      price: product.price,
      discountPercentage: product.discountPercentage,
      quantity: 1,
      isInCart: cartStore.cart.some((item) => item.id === product.id),
    }));
  } catch (error) {
    console.error("Error fetching best deals:", error);
  }
};

onMounted(fetchBestDeals);

const toggleCart = (product, index) => {
  if (!product.isInCart) {
    cartStore.addToCart(product);
    bestDeals.value[index].isInCart = true;
  } else {
    cartStore.removeFromCart(product);
    bestDeals.value[index].isInCart = false;
  }
};

const increaseQuantity = (index) => {
  bestDeals.value[index].quantity++;
};

const decreaseQuantity = (index) => {
  if (bestDeals.value[index].quantity > 1) {
    bestDeals.value[index].quantity--;
  }
};
</script>

<style scoped>
.product-container {
  max-width: 1600px;
   padding: 20px;
  box-shadow: 0 6px 15px rgba(228, 228, 228, 0.5);
  width: 100%;
}

.section-title {
  font-size: 1.75rem;
  color: #333;
  display: flex;
  justify-content: center;
  gap: 600px;
}

.product-card {
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  margin: 40px;
}

.product-card:hover {
  transform: scale(1.05);
}

.deal-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #ff4081;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.product-image {
  border-radius: 10px;
  object-fit: cover;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 10px 0 5px;
  color: #333;
}

.product-category {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 5px;
}

.product-discount {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #ee2e2e;
}

.new-price {
  color: #e91e63;
  margin-left: 5px;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.quantity {
  font-size: 1.1rem;
  margin: 0 10px;
}

.quantity-btn {
  padding: 5px;
}

.v-btn .v-btn__content {
  font-size: 1rem;
}

.add-to-cart-btn {
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  padding: 10px 0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #388e3c;
}

.explore-btn {
  width: 200px;
  font-weight: bold;
  border-radius: 12px;
  padding: 12px 0;
  text-transform: uppercase;
  font-size: 1rem;
}

.explore-btn:hover {
  background-color: #ff4081;
}
</style>
