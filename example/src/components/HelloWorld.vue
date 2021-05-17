<template>
  <div class="hello">
  错误测试
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted(){
    this.errorOccurFunction()
  },
  methods:{
    errorOccurFunction(){
      test()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
