<template>
 <header-com/>
  <side-bar/>
  <div class="main-content">
    <div class="table-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import headerCom from "@/layouts/headerCom.vue";
import SideBar from "@/layouts/sideBar.vue";


export default {
  components: {
    SideBar,
    headerCom,
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
}

.table-container {
  margin: 0 0 0 20rem;
}
</style>