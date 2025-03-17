<template>
  <v-container
    fluid
    class="banner"
  >
    <div class="overlay"></div>

    <v-row align="center" justify="center" class="text-overlay">
      <v-col cols="12">
        <h2 class="title" :class="{ visible: titleVisible }">Check Out Here</h2>
        <router-link to="/product">
          <v-btn class="shop-button" outlined>Shop Now</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const titleVisible = ref(false);

onMounted(() => {
  titleVisible.value = true;
});
</script>

<style scoped>

.banner {
  position: relative;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: slideBackground 9s infinite ease-in-out;  
  transition: background-position 3s ease-in-out;  
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.text-overlay {
  position: absolute;
  color: white;
  z-index: 2;
  text-align: center;
  width: 100%;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 2s ease, transform 3s ease;
}

.title.visible {
  opacity: 1;
  transform: translateY(0);
}

.shop-button {
  font-size: 1.2rem;
  background-color: white;
  color: black;
  padding: 12px 30px;
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.5s ease;
  border: 2px solid white;
}

.shop-button:hover {
  background: black;
  color: white;
}

  @keyframes slideBackground {
    0% {
      background-image: url('../assets/shopping.jpeg');
    }
    33% {
      background-image: url('../assets/grocery.jpeg');
    }
    66% {
      background-image: url('../assets/beauty.jpeg');
    }
    100% {
      background-image: url('../assets/shopping.jpeg');
    }
  }
</style>
