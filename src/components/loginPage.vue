<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center" class="min-height-100vh">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <v-card-title class="login-card-title">Login</v-card-title>
          <v-sheet class="login-sheet">
            <v-form ref="form" v-model="isValid">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                prepend-inner-icon="mdi-account-outline"
                label="Username"
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

              <div class="forgot-password text-center">
                Forget Password? <a href="#">Click Here</a>
              </div>
<br>
              <v-btn
                @click="handleSubmit"
                class="login-btn"
                type="submit"
                color="black"
                block
              >
                Log In
              </v-btn> <br>
              <v-btn
                @click="signUp"
                class="signup-btn"
                type="submit"
                color="blue"
                size="large"
                variant="tonal"
                block
              > 
                Sign Up
              </v-btn>
            </v-form>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isValid: false,
      usernameRules: [
        (inputValue) => !!inputValue || "Username is required",
        (inputValue) => inputValue.length >= 3 || "Username must be at least 3 characters",
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
      this.$refs.form.validate();

      if (!this.isValid) {
        console.log("Please fill in all fields correctly.");
        return;
      }
      this.$router.push("/dashboard");  
    },
    signUp() {
      this.$router.push("/signup");  
    },
  },
};
</script>



<style scoped>
 
.login-container {
  max-width: 1400px;
  margin-top: 50px;
}

.min-height-100vh {
  min-height: 100vh;
}


.login-card {
  background-color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-weight: bold;
}

.login-card-title {
  font-size: 2rem;
  color: #080808;
  font-weight: bold;
  text-align: center;
}


.login-sheet {
  padding: 25px;
  background-color: #ffffff;
  max-width: 500px;
  width: 100%;
}


.input-field {
  margin-bottom: 20px;
  background-color: #f8f8f8;
}

.input-field input {
  padding: 12px;
}

 
.forgot-password {
  font-size: 14px;
  color: rgb(90, 89, 89);
  margin-top: 12px;
}

.forgot-password a {
  text-decoration: none;
  color: #007bff;
}

.forgot-password a:hover {
  text-decoration: underline;
  font-weight: bold;
}

 
.login-btn,
.signup-btn {
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.login-btn:hover { 
  transform: scale(1.05);
}

.signup-btn:hover {
  background-color: #f9fdff;  
  transform: scale(1.05);
}

 

 
</style>
