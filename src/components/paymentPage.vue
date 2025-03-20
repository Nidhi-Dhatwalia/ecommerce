<template>
  <div class="payment-container">
    <h1 class="payment-title">Secure Payment</h1>

 
    <form @submit.prevent="handleSubmit" class="payment-form">
 
      <div class="input-field">
        <label for="cardholder-name">Cardholder Name</label>
        <input type="text" id="cardholder-name" v-model="cardholderName" required />
      </div>

 
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

     
      <div class="input-field">
        <label for="country">Country</label>
        <select id="country" v-model="country" required>
          <option value="" disabled selected>Select your country</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>
      </div>

  
      <div class="input-field">
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" v-model="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required />
      </div>

      <div class="input-field">
        <label for="expiry-date">Expiry Date (MM/YY)</label>
        <input type="text" id="expiry-date" v-model="expiryDate" placeholder="MM/YY" required />
      </div>

      <div class="input-field">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="cvv" placeholder="XXX" required />
      </div>

 
      <button type="submit" :disabled="loading" class="submit-btn">Pay Now</button>
    </form>

    
    <div v-if="error" class="error">{{ error }}</div>

 
    <div v-if="loading" class="loading">
      <span class="spinner"></span> Processing...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardholderName: '',
      email: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      loading: false,
      error: null,
    };
  },

  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = null;
 
      if (!this.cardholderName || !this.email || !this.country || !this.cardNumber || !this.expiryDate || !this.cvv) {
        this.error = 'Please fill in all fields.';
        this.loading = false;
        return;
      }
 
      try { 
        setTimeout(() => {
          this.loading = false;
 
          this.$router.push({
            name: 'PaymentConfirmation',  
          });
        }, 2000);
      } catch (err) {
        this.error = 'Payment failed. Please try again.';
        this.loading = false;
      }
    },
  },
};
</script>

 
 

<style scoped>
 
.payment-container {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.payment-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  font-weight: 700;
}

.payment-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.input-field {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

.input-field label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
}

.input-field input,
.input-field select {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
}

.submit-btn {
  background-color: #5469d4;
  color: white;
  font-size: 18px;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 20px;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #4353b3;
}

.error {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}

.loading {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #5469d4;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
  margin-bottom: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>