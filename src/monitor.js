import { JsError, VueError, ConsoleError, PromiseError, ResourceError } from './error'
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
        const _options = options || {}
        this.vueError = _options.vueError
        this.consoleError = _options.consoleError
        this.jsError = !(_options.jsError === false)
        this.promiseError = !(_options.promiseError === false)
        this.resourceError = !(_options.resourceError === false)

        const reportUrl = _options.url
        const extendsInfo = _options.extendsInfo || {}
        const reportMethod = _options.reportMethod || {}
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
        if (this.vueError && _options.vue) {
            new VueError(param).handleRegisterErrorCaptureEvents(_options.vue)
        }
    }

    /**
     * 监听页面性能
     * @public
     * @param {*} options
     * @return void
     */
    monitorPerformance(options) {
        const _options = options || {}
        // 网络状态监控
        new MonitorNetworkSpeed(_options).reportNetworkSpeed()
        // 页面性能监控
        const recordFunc = () => new MonitorPerformance(_options).record()
        window.removeEventListener('unload', recordFunc)
        window.addEventListener('load', recordFunc)
    }
}

export default FrontEndMonitor
