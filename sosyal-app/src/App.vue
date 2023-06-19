<template>
  <div>
  <Navbar/>
  <router-view/>
</div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default{
  components:{Navbar},
  setup(){}
}


</script>

<style>
html,body{
  background:#dad7cd;
}
</style>
