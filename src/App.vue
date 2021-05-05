<template>
  <div id="app">
    <div id="nav">
      <HomeNav v-if="$route.meta.isShowNav"></HomeNav>
    </div>

    <keep-alive>
      <router-view />
    </keep-alive>
    
  </div>
</template>

<script>
import HomeNav from '@/components/HomeNav.vue'



export default {

  components: {
    HomeNav,
  },

}
</script>
<style>
/* body{
   background: #f0f0f0;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}
/* 
#nav a {
  font-weight: bold;
  color: #2c3e50;
} 

#nav a.router-link-exact-active {
  color: #2c644b;
} */
</style>
