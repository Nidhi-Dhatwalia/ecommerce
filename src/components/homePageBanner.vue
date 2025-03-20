<template>
  <v-container fluid class="banner"> 
    <v-carousel 
      cycle
      show-arrows="hover"
      height="100vh"  
      :interval="3000"
      hide-delimiters
    > 
      <v-carousel-item
        v-for="(image, index) in images"
        :key="index"
      > 
        <v-img :src="image" height="100%" width="100%" cover></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'; 
import shoppingImage from '../assets/shopping.jpeg';
import beautyImage from '../assets/beauty.jpg';
import fashionImage from '../assets/fashion.jpg';
 
const images = ref([shoppingImage, beautyImage, fashionImage]);
 
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;  
}

.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.v-img {
  object-fit: cover;  
  height: 100%; 
  width: 100%;         
}
</style>
