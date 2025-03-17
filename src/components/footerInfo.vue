<template>
  <v-footer class="custom-footer text-center d-flex flex-column">
    <v-container>
      <v-row>
   
        <v-col cols="12" md="4">
          <ul class="footer-links">
            <li><a href="#">Shop</a></li>
            <li><a href="#">Stockists</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </v-col>
 
        <v-col cols="12" md="4">
          <ul class="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Store Policy</a></li>
            <li><a href="#">Payment Methods</a></li>
          </ul>
        </v-col>

 
        <v-col cols="12" md="4" class="newsletter">
          <v-text-field
            v-model="email"
            label="Enter your email here..."
            variant="outlined"
            dense
            hide-details
            class="email-input"
          ></v-text-field>

          <v-checkbox v-model="subscribe" label="Yes, subscribe me to your newsletter." class="subscribe-checkbox"></v-checkbox>

          <v-btn color="white" class="subscribe-btn">SUBSCRIBE</v-btn>
        </v-col>
      </v-row>

 
      <v-row class="social-icons">
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" variant="text" class="mx-2"></v-btn>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <div class="footer-bottom">
      &copy; {{ new Date().getFullYear() }} - Built with ❤️ by Your Brand
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribe = ref(false)
const icons = ['mdi-facebook', 'mdi-instagram', 'mdi-pinterest', 'mdi-youtube', 'mdi-twitter']
</script>

<style scoped>
.custom-footer {
  background-color: #0d0d0d;
  color: white;
  padding: 30px 0;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.newsletter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.email-input {
  width: 100%;
  margin-bottom: 10px;
}

.subscribe-checkbox {
  margin-bottom: 10px;
}

.subscribe-btn {
  background-color: white;
  color: black;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.footer-bottom {
  text-align: center;
  margin-top: 10px;
}
</style>