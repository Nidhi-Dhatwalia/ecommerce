 
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      isAuthenticated: false,  // Initially, user is not authenticated
    }),
    actions: {
      login() {
        this.isAuthenticated = true;  // Set this to true when the user logs in
      },
      logout() {
        this.isAuthenticated = false;  // Set this to false when the user logs out
      },
    },
  });
  
  