import Vue from 'vue';
import App from './App.vue';
import { ErrorMonitor } from '../../dist/ErrorMonitor.min.js';

Vue.config.productionTip = false;

new ErrorMonitor().init({
    url: 'http://localhost:3000', //错误上报地址
    consoleError: true, //配置是否需要记录console.error错误信息
    vueError: true, //配置是否需要记录vue错误信息
    vue: Vue, //如需监控vue错误信息，则需要传入vue
    extendsInfo: {
        //自定义扩展信息，一般用于数据持久化区分
        a: '', //自定义信息a（名称可自定义）可参考测试栗子 module
        b: '', //自定义信息b（名称可自定义）
        getDynamic: () => {
            //获取动态传参  1.4.5版本及以后支持该方式
        }
    }
});


new ErrorMonitor().monitorPerformance({
    pageId: "page_0001",  //页面唯一标示
    url: "'http://localhost:3000",  //信息采集上报地址
    extendsInfo: {   //扩展信息，一般用于数据数据持久化区分
        module: "项目",
        filterOne: "page_0001",
        getDynamic: () => {
            return {
                filterTow: () => { },
            };
        }
    }
});


new Vue({
    render: h => h(App)
}).$mount('#app');
