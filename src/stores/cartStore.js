import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
  

  watch(cart, (newCart) => {
    console.log('Cart updated:', newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }, { deep: true });

  const addToCart = (product) => {
    const existingProduct = cart.value.find((item) => item.title === product.title);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    cart.value = [...cart.value]; // Ensure reactivity
    console.log(cart.value); // Log cart state
  };
  
  
  const removeFromCart = (index) => {
    cart.value.splice(index, 1);
    cart.value = [...cart.value];  // Reactivity ensure karne ke liye.
  };
  

  const clearCart = () => {
    console.log('Clearing cart...');
    cart.value = [];
    localStorage.removeItem('cart');
  };

  return { cart, addToCart, removeFromCart, clearCart };
});
