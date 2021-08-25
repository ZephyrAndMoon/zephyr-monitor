import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { FrontEndMonitor } from '../../src/index'

Vue.config.productionTip = false

Vue.use(ElementUI)

new FrontEndMonitor().init({
	url: 'http://localhost:3000/monitor', //错误上报地址
	consoleError: true, //配置是否需要记录console.error错误信息
	vueError: true, //配置是否需要记录vue错误信息
	vue: Vue, //如需监控vue错误信息，则需要传入vue
	extendsInfo: {
		getDynamic: () => {
			//获取动态传参
		},
	},
})

new FrontEndMonitor().monitorPerformance({
	pageId: 'page_0001', //页面唯一标示
	url: 'http://localhost:3000/monitor', //信息采集上报地址
	extendsInfo: {
		//扩展信息，一般用于数据数据持久化区分
		module: '测试项目',
		filterOne: 'page_0001',
		getDynamic: () => {
			return {
				filterTow: () => {},
			}
		},
	},
})

new Vue({
	render: h => h(App),
}).$mount('#app')
