import BaseMonitor from '../base/baseMonitor'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig'
/**
 * console.error异常
 */
class ConsoleError extends BaseMonitor {
    /**
     * 注册错误捕获事件
     * @public
     * @return void
     */
    handleRegisterErrorCaptureEvents() {
        this.registerInfo()
        this.registerWarn()
        this.registerError()
    }

    /**
     * 处理信息
     * @private
     * @return void
     */
    registerInfo() {
        const t = this
        console.Info = (...args) => {
            t.handleLog(ErrorLevelEnum.INFO, ErrorCategoryEnum.CONSOLE_INFO, args)
        }
    }

    /**
     * 处理警告
     * @private
     * @return void
     */
    registerWarn() {
        const t = this
        console.Warn = (...args) => {
            t.handleLog(ErrorLevelEnum.WARN, ErrorCategoryEnum.CONSOLE_WARN, args)
        }
    }

    /**
     * 处理错误
     * @private
     * @return void
     */
    registerError() {
        const t = this
        console.Error = (...args) => {
            t.handleLog(ErrorLevelEnum.ERROR, ErrorCategoryEnum.CONSOLE_ERROR, args)
        }
    }

    /**
     * 处理警告
     * @private
     * @param {string} type 信息类别
     * @param {string} category 错误类别
     * @param {*} args 其他参数
     * @return void
     */
    handleLog(type, category, args) {
        try {
            this.logType = type
            const params = [...args]
            this.msg = params.join('\r\n') // 换行符分割
            this.url = location.href // 当前地址
            this.category = category
            this.recordError()
        } catch (error) {
            console.error('[ZephyrMonitor Error]: Console handling error exception', type, error)
        }
    }
}

/**
 * 初始化console事件
 */
;(() => {
    // 创建空console对象，避免JS报错
    if (!window.console) {
        window.console = {}
    }
    const funcTypes = ['tInfo', 'tWarn', 'tError']
    funcTypes.forEach((func) => {
        if (!console[func]) {
            console[func] = () => {}
        }
    })
})()

export default ConsoleError
