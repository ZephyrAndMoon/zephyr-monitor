import { JsError, VueError, ConsoleError, PromiseError, ResourceError } from './error'
import MonitorPerformance from './performance'
import MonitorNetworkSpeed from './performance/networkSpeed'
import { ValidateParameters } from './utils/util'
import { INIT_ERROR_RULES, INIT_PERFORMANCE_RULES } from './utils/validateRules'
import './utils/extends'

class ZephyrMonitor {
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
    static initError(options) {
        // 校验初始化参数
        if (!ValidateParameters(options, INIT_ERROR_RULES)) return

        this.vueError = options.error.vue
        this.consoleError = options.error.console
        this.jsError = !(options.error.js === false)
        this.promiseError = !(options.error.promise === false)
        this.resourceError = !(options.error.resource === false)

        const reportUrl = options.url
        const extendsInfo = options.extendsInfo || {}
        const reportMethod = options.reportMethod || {}
        const param = { reportUrl, extendsInfo, reportMethod }

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
    static initPerformance(options) {
        // 校验初始化参数
        if (!ValidateParameters(options, INIT_PERFORMANCE_RULES)) return

        // 网络状态监控
        if (options.useNetworkSpeed) {
            MonitorNetworkSpeed(options).reportNetworkSpeed()
        }
        // 页面性能监控
        const recordFunc = () => MonitorPerformance(options).record()
        window.removeEventListener('unload', recordFunc)
        window.addEventListener('load', recordFunc)
    }
}

export default ZephyrMonitor
