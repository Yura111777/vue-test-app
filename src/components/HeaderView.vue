<template>
  <nav class="nav">
    <span> Test App Logo </span>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/map">Map</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "HeaderView",
  data() {
    return {
      map: "",
    };
  },
  methods: {},
  mounted() {
    this.map = JSON.parse(localStorage.getItem("map-info"));
  },
};
</script>

<style scoped lang="scss">
.logo-header {
  width: 100px;
}
.nav {
  margin: 50px auto 100px auto;
  max-width: 1000px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    display: flex;
  }
  li {
    list-style: none;
    font-weight: 700;
    margin: 0 10px;
    a {
      color: #2c3e50;
      text-decoration: none;
      transition: color 0.5s ease-in-out;
      &.router-link-active {
        color: dodgerblue;
      }
      &:hover {
        color: lightgray;
      }
    }
  }
}
</style>
