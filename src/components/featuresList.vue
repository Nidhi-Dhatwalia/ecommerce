<template>
  <div class="container">
    <div class="icon-container">
      <v-icon class="shipping-icon">mdi-truck-fast</v-icon>
      <span class="title">Free Delivery</span>
      <span class="subtitle">To Your Door</span>
    </div>

    <v-divider :thickness="3" class="border-opacity-75" vertical></v-divider>

    <div class="icon-container">
      <v-icon class="shipping-icon">mdi-cash</v-icon>
      <span class="title">Multiple Payment Options</span>
      <span class="subtitle">Check Out <a href="#" class="link">Payments</a></span>
    </div>

    <v-divider :thickness="3" class="border-opacity-75" vertical></v-divider>

    <div class="icon-container">
      <v-icon class="shipping-icon">mdi-clock-outline</v-icon>
      <span class="title">Available for You</span>
      <span class="subtitle"><a href="#" class="link">Online Support</a> 24/7</span>
    </div>

    <v-divider :thickness="3" class="border-opacity-75" vertical></v-divider>

    <div class="icon-container">
      <v-icon class="shipping-icon">mdi-gift</v-icon>
      <span class="title">Order on the Go</span>
      <span class="subtitle"><a href="#" class="link">Track</a> your order</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  padding: 50px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(7, 7, 7, 0.1);
}

.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.shipping-icon {
  font-size: 50px;
  color: #e63946;   
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.shipping-icon:hover {
  transform: scale(1.2);
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.subtitle {
  font-size: 16px;
  color: #555;
}

.link {
  color: #e63946;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}
</style>