<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px; background-color: #f5f7f9;">
      <h2 class="text-center mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="username" class="form-label">User</label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
              :class="{'is-invalid': v$.username.$error}"
              required
          />
          <div v-if="v$.username.$error" class="text-danger mt-1">Required field</div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              :class="{'is-invalid': v$.email.$error}"
              required
          />
          <div v-if="v$.email.$error" class="text-danger mt-1">
            {{ v$.email.$errors[0]?.$message || 'Invalid email format' }}
          </div>
        </div>
        <div class="mb-2">
          <label for="password" class="form-label">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              :class="{'is-invalid': v$.password.$error}"
              required
          />
          <div v-if="v$.password.$error" class="text-danger mt-1">Required field</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Register</button>
      </form>
      <div class="text-center mt-3">
        <router-link to="/" class="fw-bold">Register Now</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { registerUser } from '@/services/apiService';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      username: { required },
      email: { required, email },
      password: { required },
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  methods: {
    async handleRegister() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        console.log("فرم دارای خطاست");
        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
        username: this.username,
      };

      console.log(userData)
      try {
        const result = await registerUser(userData);
        console.log("ثبت‌نام موفقیت‌آمیز:", result);

        const token = result.user.token;
        localStorage.setItem('authToken', token);


        this.$router.push('/home');
      } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
      }
    }
  },
};
</script>



<style scoped>
</style>
