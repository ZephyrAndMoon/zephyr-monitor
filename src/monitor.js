import {
	JsError,
	VueError,
	ConsoleError,
	PromiseError,
	ResourceError,
} from './error'
import MonitorPerformance from './performance'
import MonitorNetworkSpeed from './performance/networkSpeed'
import './utils/extends'

class FrontEndMonitor {
	/**
	 * @constructor
	 */
	constructor() {
		this.jsError = true
		this.vueError = false
		this.promiseError = true
		this.resourceError = true
		this.consoleError = false
	}

	/**
	 * 处理异常信息初始化
	 * @public
	 * @param {*} options
	 * @return void
	 */
	init(options) {
		options = options || {}
		this.vueError = options.vueError
		this.consoleError = options.consoleError
		this.jsError = !(options.jsError === false)
		this.promiseError = !(options.promiseError === false)
		this.resourceError = !(options.resourceError === false)

		let reportUrl = options.url
		let extendsInfo = options.extendsInfo || {}
		let reportMethod = options.reportMethod || {}
		let param = { reportUrl, extendsInfo, reportMethod }

		if (this.jsError) {
			new JsError(param).handleRegisterErrorCaptureEvents()
		}
		if (this.promiseError) {
			new PromiseError(param).handleRegisterErrorCaptureEvents()
		}
		if (this.resourceError) {
			new ResourceError(param).handleRegisterErrorCaptureEvents()
		}
		if (this.consoleError) {
			new ConsoleError(param).handleRegisterErrorCaptureEvents()
		}
		if (this.vueError && options.vue) {
			new VueError(param).handleRegisterErrorCaptureEvents(options.vue)
		}
	}

	/**
	 * 监听页面性能
	 * @public
	 * @param {*} options
	 * @return void
	 */
	monitorPerformance(options) {
		options = options || {}
		// 网络状态监控
		new MonitorNetworkSpeed(options).reportNetworkSpeed()
		// 页面性能监控
		let recordFunc = () => new MonitorPerformance(options).record()
		window.removeEventListener('unload', recordFunc)
		window.addEventListener('load', recordFunc)
	}
}

export default FrontEndMonitor
