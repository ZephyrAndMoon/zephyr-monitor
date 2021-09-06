import BaseMonitor from '../base/baseMonitor'
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
                this.level = ErrorLevelEnum.WARN
                this.category = ErrorCategoryEnum.JS_ERROR
                this.msg = msg
                this.url = url
                this.errorObj = error
                this.stack = error.stack
                this.recordError()
            } catch (e) {
                console.log('js错误异常', e)
            }
            return true
        }
    }
}
export default JSError
