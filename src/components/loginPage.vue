<template>
  <div class="login-container min-height-100vh">
    <div class="login-wrapper glass-panel premium-shadow">
      <div class="login-branding">
        <h1 class="brand-title">E-Commerce</h1>
        <p class="brand-subtitle">Discover premium products today.</p>
      </div>
      <div class="login-card">
        <h2 class="login-card-title">Welcome Back</h2>
        <div class="login-sheet">
          <form @submit.prevent="handleLogin">
            <div class="input-field">
              <input v-model="username" type="text" placeholder="Username" required />
            </div>
            <div class="input-field">
              <input v-model="password" type="password" placeholder="Password" required />
            </div>
            <button class="login-btn" type="submit" :disabled="loading">
              <span v-if="!loading">Login</span>
              <v-progress-circular v-else indeterminate color="white" size="20"></v-progress-circular>
            </button>
          </form>
          <div class="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  methods: {
   async handleLogin() {
    this.loading = true;
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          expiresInMins: 30, 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      } 
      const data = await response.json();

      if (data && data.accessToken) { 
        localStorage.setItem('authToken', data.accessToken); 
        this.$router.push({ name: 'managePages' });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      this.loading = false;
    }
  },
},
};
</script>

<style scoped> 
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  padding: 20px;
} 

.login-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 900px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
}

.login-branding {
  flex: 1;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
}

.brand-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.brand-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.login-card {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-card-title {
  font-size: 2rem;
  color: var(--text-primary);
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
}

.login-sheet {
  width: 100%;
}

.input-field {
  margin-bottom: 20px;
}

.input-field input {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.input-field input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  outline: none;
  background-color: #ffffff;
}

.forgot-password {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 15px;
}

.forgot-password a {
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-password a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.login-btn {
  color: white;
  background-color: var(--primary-color);
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  background-color: var(--primary-hover);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
  }
  .login-branding {
    padding: 30px 20px;
  }
  .brand-title {
    font-size: 2rem;
  }
}
</style>
