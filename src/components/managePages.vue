<template>
  <v-app>
    <v-container fluid class="full-width-container"> 
      <v-row class="section-spacing">
        <v-col>
          <navBar />
        </v-col>
      </v-row>

      <v-row class="section-spacing">
        <v-col cols="12">
          <homePageBanner />
        </v-col>
        <v-col cols="12">
          <productList />
        </v-col>

        <v-col cols="12">
          <featuresList />
        </v-col>
      </v-row>

      <v-row class="section-spacing">
        <v-col cols="12">
          <footerInfo />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import navBar from '../components/navBar.vue';
import homePageBanner from  '../components/homePageBanner.vue';
import productList from  '../components/productList.vue';
import featuresList from '../components/featuresList.vue';
import footerInfo from  '../components/footerInfo.vue';
</script>

<style scoped>
.full-width-container {
  width: 100vw;
  margin: 0;  
  padding: 0;  
} 

.container {
  width: 100%;  
}
</style>
