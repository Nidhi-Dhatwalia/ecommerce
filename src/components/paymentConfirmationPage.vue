<template>
  <div class="confirmation-container">
    <h2>Payment Confirmation</h2>

    <div class="confirmation-details">
      <p><strong>Product Name:</strong> {{ productName }}</p>
      <p><strong>Price:</strong> ${{ (productPrice / 100).toFixed(2) }}</p>
      <p><strong>Tracking Number:</strong> {{ trackingNumber }}</p>
    </div>

    <router-link to="/dashboard" class="home-link">Go to Home</router-link>
  </div>
</template>

<script setup>
 
const productName =  'Unknown Product';
const productPrice =   0;
const trackingNumber =  'Not Available';
</script>

<style scoped>
.confirmation-container {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.confirmation-details {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}

.confirmation-details p {
  margin: 10px 0;
}

.home-link {
  margin-top: 20px;
  color: #5469d4;
  text-decoration: underline;
}
</style>
