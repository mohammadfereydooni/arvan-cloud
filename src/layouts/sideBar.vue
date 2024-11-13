<template>
  <div class="wrapper">
    <div class="sidebar">
      <h2>post</h2>
      <ul>
        <li><router-link to="/home" class="sidebar-link">All Articles</router-link></li>
        <li><router-link to="/home/newArticle" class="sidebar-link">New Article</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.sidebar {
  width: 250px;
  height: 100%;
  background-color: #007bff;
  color: white;
  padding: 20px;
  position: absolute;
}

.sidebar h2 {
  text-align: center;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
}

.sidebar-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.sidebar-link:hover {
  text-decoration: underline;
}

</style>
