<template>
  <v-app>
    <v-container fluid> 
      <v-row class="section-spacing">
        <v-col cols="12" class="mb-4">
          <navBar />
        </v-col>
      </v-row>
 
      <v-row class="section-spacing">
        <v-col cols="12" class="mb-4">
          <homePageBanner />
        </v-col>
        <v-col cols="12" class="mb-4">
          <productList />
        </v-col>

        <v-col cols="12" class="mb-4">
          <featuresList />
        </v-col>
      </v-row>
 
      <v-row class="section-spacing">
        <v-col cols="12" class="mb-4">
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
v-row {
  margin: 10px;
}

v-col {
  padding: 0;
}
 
.section-spacing {
  margin-top: 30px;
  margin-bottom: 30px;
}
 
.container { 
  margin: 0 auto;
  width: 100%;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);  
}
</style>

 