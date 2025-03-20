<template>
  <v-container class="product-detail-container" v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-img
  :src="product.images[0] "
  height="400px"
  alt="Product Image"
/>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="product-detail-card">
          <v-card-title class="product-title">{{ product.title }}</v-card-title>
          <v-card-subtitle class="product-category">{{ product.category }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Price:</strong> ${{ product.price }}</p>
            <p><strong>Rating:</strong> {{ product.rating }} ★</p>
            <p>
              <strong>Discount:</strong> {{ product.discountPercentage }}% off
            </p>
            <p><strong>Shipping :</strong> {{ product.shippingInformation }}</p>
            <p>
              <strong> Warranty :</strong> {{ product.warrantyInformation }}
            </p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong> Stock:</strong> {{ product.stock }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="action-buttons">
      <v-btn @click="addToCart" color="yellow" class="action-btn add-to-cart-btn">
        ADD TO CART
      </v-btn>
      <v-btn @click="buyNow" color="orange" class="action-btn buy-now-btn">
        BUY NOW
      </v-btn>
    </div>

    <div class="back-button-container">
      <v-btn @click="goBack" color="primary" class="back-button">
        <v-icon left>mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from '../stores/cartStore';

const route = useRoute();
const router = useRouter();
const product = ref();

const fetchProductDetail = async () => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${route.params.productId}`
    );
    product.value = response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const addToCart = () => {
  const cartStore = useCartStore();
  cartStore.addToCart({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    quantity: 1,
    images: product.value.images,
  });
};

const buyNow = () => {
  const cartStore = useCartStore();
  cartStore.addToCart({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
 
    images: product.value.images,
  });
  router.push({ name: "paymentPage" });
};

const goBack = () => {
  router.push({ name: 'explorePage' });
};

onMounted(() => {
  fetchProductDetail();
});
</script>

<style scoped>
.product-detail-container {
  max-width: 1400px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.v-card {
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.product-title {
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.product-category {
  font-size: 1.1rem;
  font-weight: 500;
  color: #777;
}

.product-detail-card {
  padding: 20px;
}

.v-img {
  border-radius: 8px;
  object-fit: cover;
}

.action-buttons {
  display: flex;
  flex-direction: row; 
  gap: 15px;
  margin-top: 20px;
 
}

.action-btn {
  width: 24%;
  padding: 10px;
  font-size: 1.1rem;
  text-transform: uppercase;
  border-radius: 6px;
  font-weight: 530;
}

.back-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.back-button {
  width: 150px;
}
</style>