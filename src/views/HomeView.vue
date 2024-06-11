<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <!-- <div class="dad">
    <div class="son"></div>
  </div> -->
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created () {
    console.log(process.env.VUE_APP_API)
    console.log(process.env.VUE_APP_PATH)
  }
}
</script>
<style scoped>
/* .dad {
    background-color: #ffa9a9;
    height: 500px;
    width: 700px;
    align-content: center;
}

.son {
    background-color: #afe2ff;
    width: 100px;
    height: 80px;
    margin: auto;
} */
</style>
