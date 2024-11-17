<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px; background-color: #f5f7f9;">
      <h2 class="text-center mb-4">LOGIN</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              :class="{'is-invalid': emailError}"
              required
          />
        </div>
        <div class="mb-2">
          <label for="password" class="form-label">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              :class="{'is-invalid': passwordError}"
              required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Login</button>

        <div v-if="errors" class="invalid-feedback">
          {{ errors }}
        </div>
      </form>
      <div class="text-center mt-3">
        <router-link to="/register" class="fw-bold">Register Now</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { loginUser } from '@/services/apiService';
import notificationService from "@/services/notificationService";

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errors: {},
    };
  },
  methods: {
    async handleLogin() {

      this.emailError = !this.email;
      this.passwordError = !this.password;
      this.errors = {};

      if (this.emailError || this.passwordError) {
        return;
      }

      const loginData = {
        user: {
          email: this.email,
          password: this.password
        }
      };

      try {
        const result = await loginUser(loginData);
        const token = result.user;

        localStorage.setItem('authToken', token.token);
        localStorage.setItem('username', token.username);


        this.$router.push('/home');
      } catch (result) {
        if (result.response.data.errors) {
          notificationService.error("email or password invalid!");
        }else {
          notificationService.error(result.response.data.errors);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
