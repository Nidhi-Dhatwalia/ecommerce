<template>
  <div class="login-container">
    <v-sheet class="login-form" elevation="4">
      <h1>Log In To Your Account</h1>
      <v-form ref="form" v-model="isValid">
        <v-text-field
          v-model="emailAddress"
          :rules="emailRules"
          prepend-inner-icon="mdi-email-outline"
          label="Email Address"
          required
          class="input-field"
        />
        <v-text-field
          v-model="password"
          prepend-inner-icon="mdi-lock-outline"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
          class="input-field"
        />
        
        <div class="forgot-password">
          Forget Password? <a href="#">Click Here</a>
        </div>
        
        <v-btn
          @click="handleSubmit"
          class="login-btn"
          type="submit"
          color="primary"
          block
        >
          Log In
        </v-btn>

        <div class="sign-up-link">
          Don't have an account? <a @click="signUp" href="#">Sign Up</a>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      emailAddress: "",
      password: "",
      isValid: false,
      emailRules: [
        (inputValue) => !!inputValue || "Email is required",
        (inputValue) => /.+@.+\..+/.test(inputValue) || "Enter a valid email",
      ],
      passwordRules: [
        (inputValue) => !!inputValue || "Password is required",
        (inputValue) =>
          inputValue.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    handleSubmit() {
      // Validate the form
      this.$refs.form.validate();
      if (!this.isValid) {
        console.log("Please fill in all fields correctly.");
        return;
      }

      const loginData = {
        username: this.emailAddress,
        password: this.password,
        expiresInMins: 30,
      };

      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.token) {
            console.log("Login successful, token:", data.token);
            this.$router.push({ name: "dashboard" });
          } else {
            console.log("Login failed:", data.message || "Unknown error");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    },

    signUp() {
      this.$router.push({ name: "sign-up" });
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
  background-color: #ecf0f1;
  padding: 0 20px;
}

.login-form {
  padding: 40px;
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #34495e;
  font-size: 24px;
  margin-bottom: 30px;
}

.input-field {
  margin-bottom: 20px;
}

.forgot-password {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.forgot-password a {
  color: #3498db;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.login-btn {
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  letter-spacing: 1px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #2980b9;
}

.sign-up-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.sign-up-link a {
  color: #3498db;
  text-decoration: none;
}

.sign-up-link a:hover {
  text-decoration: underline;
}
</style>
