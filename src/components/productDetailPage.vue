<template>
  <v-container class="product-detail-container" v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <img :src="product.images[0]" height="400px" alt="Product Image" />

        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="product-detail-card">
          <v-card-title class="product-title">{{ product.title }}</v-card-title>
          <v-card-subtitle class="product-category">{{
            product.category
          }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Price:</strong> ${{ product.price }}</p>
            <p><strong>Rating:</strong> {{ product.rating }} / 5</p>
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
      <v-btn
        @click="addToCart"
        color="primary"
        class="action-btn add-to-cart-btn"
      >
        Add to Cart
      </v-btn>

      <v-btn @click="buyNow" color="red" class="action-btn buy-now-btn">
        Buy Now
      </v-btn>

      <v-btn @click="goBack" color="grey" class="back-button">
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
import { useCartStore } from "../stores/cartStore";

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
    quantity: 1,
    images: product.value.images,
  });
  router.push({ name: "paymentPage", query: { productId: product.value.id } });
};

const goToPayment = () => {
  router.push({ name: "paymentPage", query: { productId: product.value.id } });
};

const goBack = () => {
  router.push({ name: "explorePage" });
};

onMounted(() => {
  fetchProductDetail();
});
</script>

<style scoped>
.product-detail-container {
  margin-top: 30px;
}

.v-card {
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.product-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
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
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.action-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  text-transform: uppercase;
  border-radius: 6px;
  font-weight: 500;
}

.add-to-cart-btn {
  background-color: #1976d2;
  color: white;
  transition: all 0.3s ease;
  width: 20%;
}

.add-to-cart-btn:hover {
  background-color: #1565c0;
}

.buy-now-btn {
  background-color: #d32f2f;
  color: white;
  transition: all 0.3s ease;
  width: 20%;
}

.buy-now-btn:hover {
  background-color: #c62828;
}

.back-button {
  margin-top: 20px;
  font-size: 1rem;
  width: 20%;
}

.back-button .v-icon {
  margin-right: 8px;
}

.payment-button {
  background-color: #4caf50;
  color: white;
  border-radius: 6px;
}

.payment-button:hover {
  background-color: #388e3c;
}

.product-detail-container h1 {
  text-align: center;
  font-weight: 600;
  color: #333;
}
</style>
