<template>
  <div id="app">
    <Type msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Type from './components/Type.vue'

export default {
  name: 'App',
  components: {
    Type
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
