<template>
  <div class="login-container min-height-100vh">
    <div class="login-card">
      <h2 class="login-card-title">Login</h2>
      <div class="login-sheet">
        <form @submit.prevent="handleLogin">
          <div class="input-field">
            <input v-model="username" type="text" placeholder="Username" required />
          </div>
          <div class="input-field">
            <input v-model="password" type="password" placeholder="Password" required />
          </div>
          <button class="login-btn" type="submit">Login</button>
        </form>
        <div class="forgot-password">
          <a href="#">Forgot Password?</a>
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
    };
  },
  methods: {
   async handleLogin() {
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

    console.log(data);  
 
    if (data && data.accessToken) { 
      localStorage.setItem('authToken', data.accessToken); 
 
      console.log('Redirecting to managePages...');
      this.$router.push({ name: 'managePages' });
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
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
  background: linear-gradient(135deg, #f2f2f2 0%, #d1d1d1 100%);
} 
.login-card {
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-weight: bold;
  width: 100%;
  max-width: 400px;
  padding: 30px;
}

.login-card-title {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

 
.login-sheet {
  width: 100%;
}

 
.input-field {
  margin-bottom: 20px;
}

.input-field input {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: border 0.3s;
}

.input-field input:focus {
  border-color: #007bff;
  outline: none;
}

 
.forgot-password {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 10px;
}

.forgot-password a {
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
}

.forgot-password a:hover {
  text-decoration: underline;
}

 
.login-btn {
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.login-btn:hover {
  transform: scale(1.05);
  background-color: #0056b3;
}
</style>
