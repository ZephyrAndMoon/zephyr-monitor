import { JsError, VueError, ConsoleError, PromiseError, ResourceError } from './error'
import { initLogger } from './base/Logger'
import MonitorPerformance from './performance'
import MonitorNetworkSpeed from './performance/networkSpeed'
import { paramsValidator, setCrossorigin } from './utils/util'
import { INIT_ERROR_RULES, INIT_PERFORMANCE_RULES } from './utils/validateRules'
import { LogEnvironmentEnum } from './base/baseConfig'
import './utils/extends'

class ZephyrMonitor {
    /**
     * @constructor
     */
    constructor({ pageId, useCrossorigin, useLogger }) {
        this.pageId = pageId
        this.useLogger = useLogger
        this.useCrossorigin = useCrossorigin

        // 初始化打印日志工具
        initLogger(!(this.useLogger === false) ? LogEnvironmentEnum.DEV : LogEnvironmentEnum.PRO)
    }

    /**
     * 处理异常信息初始化
     * @public
     * @param {*} options
     * @return void
     */
    initError(options) {
        // 校验初始化参数
        if (!paramsValidator(options, INIT_ERROR_RULES)) return

        if (this.useCrossorigin) setCrossorigin()

        const vueError = options.error.vue
        const consoleError = options.error.console
        const jsError = !(options.error.js === false)
        const promiseError = !(options.error.promise === false)
        const resourceError = !(options.error.resource === false)

        const pageId = this.pageId || ''
        const reportUrl = options.url
        const extendsInfo = options.extendsInfo || {}
        const reportMethod = options.reportMethod || {}

        const param = { pageId, reportUrl, extendsInfo, reportMethod }

        if (jsError) {
            new JsError(param).handleRegisterErrorCaptureEvents()
        }
        if (promiseError) {
            new PromiseError(param).handleRegisterErrorCaptureEvents()
        }
        if (resourceError) {
            new ResourceError(param).handleRegisterErrorCaptureEvents()
        }
        if (consoleError) {
            new ConsoleError(param).handleRegisterErrorCaptureEvents()
        }
        if (vueError && options.vue) {
            new VueError(param).handleRegisterErrorCaptureEvents(options.vue)
        }
    }

    /**
     * 监听页面性能
     * @public
     * @param {*} options
     * @return void
     */
    initPerformance(options) {
        // 校验初始化参数
        if (!paramsValidator(options, INIT_PERFORMANCE_RULES)) return

        const finalOption = {
            ...options,
            pageId: this.pageId,
        }

        // 网络状态监控
        if (finalOption.useNetworkSpeed) {
            new MonitorNetworkSpeed(finalOption).reportNetworkSpeed()
        }
        // 页面性能监控
        const recordFunc = () => new MonitorPerformance(finalOption).record()
        window.removeEventListener('unload', recordFunc)
        window.addEventListener('load', recordFunc)
    }
}

export default ZephyrMonitor
