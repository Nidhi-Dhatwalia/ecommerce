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
  const existingProduct = cart.value.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
      image: Array.isArray(product.images) ? product.images[0] : product.image || "",
   
    });
  }
  cart.value = [...cart.value];  
};

const removeFromCart = (product) => {
  const index = cart.value.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
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