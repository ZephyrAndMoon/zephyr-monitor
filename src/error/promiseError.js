import { log } from '../base/Logger'
import BaseMonitor from '../base/BaseMonitor'
import { getErrorUrl } from '../utils/util'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig'

/**
 * 捕获未处理的Promise异常
 */

class PromiseError extends BaseMonitor {
    /**
     * 注册错误捕获事件
     * @public
     * @return void
     */
    handleRegisterErrorCaptureEvents() {
        window.addEventListener(
            'unhandledrejection',
            (event) => {
                try {
                    if (!event || !event.reason) {
                        return
                    }
                    const { message, stack } = event.reason
                    this.logType = ErrorLevelEnum.ERROR
                    this.category = ErrorCategoryEnum.PROMISE_ERROR
                    this.url = getErrorUrl(stack)
                    this.msg = message || event.reason
                    this.stack = stack
                    this.recordError()
                } catch (e) {
                    log('error', 'Catching "promise_error" error exceptions', e)
                }
                event.preventDefault()
            },
            true,
        )
    }
}
export default PromiseError
