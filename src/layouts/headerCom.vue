<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <a class="navbar-brand" href="#">Arvan Challenge</a>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <h5 class="m-0">welcom {{}}</h5>
        <button class="btn btn-outline-info my-2 my-sm-0 ms-auto " type="submit" @click="logOut">Logout</button>
    </div>
  </nav>
</template>

<script>

export default{
  data() {
    return {
      user: 'null'
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
}

</script>