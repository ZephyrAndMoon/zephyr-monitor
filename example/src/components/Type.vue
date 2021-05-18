<template>
<div class="wrapper">
<div class="hello">
    <el-button @click="vueErrorOccurhandler">Vue类型报错</el-button>
    <el-button @click="promiseErrorOccurhandler">promise未捕获异常信息</el-button>
    <el-button @click="consoleErrorOccurhandler">console.error错误信息捕获</el-button>
    <el-button @click="jsErrorOccurhandler">JavaScript错误信息监控</el-button>
    <el-button @click="resourceErrorOccurhandler">资源错误信息捕获</el-button>
  </div>
  <el-button @click="reset" style="display:block;margin:40px auto 0px">重置图片</el-button>
  <img :src="src" alt="测试图片" width="300" height="200" style="margin-top:10px">
</div>
  
</template>

<script>
export default {
  name: 'Type',
  data(){
    return {
      tempSrc:'https://i.ytimg.com/vi/88Z0MKYH_Ns/maxresdefault.jpg',
      src:'https://i.ytimg.com/vi/88Z0MKYH_Ns/maxresdefault.jpg'
    }
  },
  mounted(){
  },
  methods:{
    vueErrorOccurhandler(){
      vueError()
    },
    promiseErrorOccurhandler(){
      fetch('https://no-such-server.blabla') // rejects
        .then(response => response.json())
    },
    consoleErrorOccurhandler(){
      console.Error('A printing error occurred...')
    },
    jsErrorOccurhandler(){
      setTimeout(() => {
        throw new Error('This is a javascript error');
      }, 1000);
    },
    resourceErrorOccurhandler(){
      this.src = ''
    },
    reset(){
      this.src = this.tempSrc
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
