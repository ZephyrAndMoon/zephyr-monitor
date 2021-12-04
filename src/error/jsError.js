import { log } from '../base/Logger'
import BaseMonitor from '../base/BaseMonitor'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig'

/**
 * 捕获JS错误
 */
class JSError extends BaseMonitor {
    /**
     * 注册错误捕获事件
     * @public
     * @return void
     */
    handleRegisterErrorCaptureEvents() {
        window.onerror = (msg, url, line, col, error) => {
            try {
                this.logType = ErrorLevelEnum.ERROR
                this.category = ErrorCategoryEnum.JS_ERROR
                this.msg = msg
                this.url = url
                this.errorObj = error
                this.stack = error && error.stack
                this.recordError()
            } catch (e) {
                log('error', 'Catching "js_error" error exceptions', e)
            }
            return true
        }
    }
}
export default JSError
