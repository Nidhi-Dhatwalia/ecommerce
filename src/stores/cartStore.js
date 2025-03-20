import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
  
  watch(cart, (newCart) => { 
    localStorage.setItem('cart', JSON.stringify(newCart));
  }, { deep: true });

  const addToCart = (product) => {
    const existingProduct = cart.value.find((item) => item.title === product.title);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else { 
      cart.value.push({ ...product, quantity: 1 });
    }
    cart.value = [...cart.value];
  
  };
  
  const removeFromCart = (index) => {
    cart.value.splice(index, 1);
    cart.value = [...cart.value];   
  };
  

  const clearCart = () => { 
    cart.value = [];
    localStorage.removeItem('cart');
  };

  const isInCart = (productId) => {
    return cart.value.some((item) => item.id === productId);
  };

  return { cart, addToCart, removeFromCart, clearCart,isInCart };
});