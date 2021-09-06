import utils from '../utils/util'
import BaseMonitor from '../base/baseMonitor'
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
                    this.level = ErrorLevelEnum.ERROR
                    this.category = ErrorCategoryEnum.PROMISE_ERROR
                    this.url = utils.getErrorUrl(stack)
                    this.msg = message || event.reason
                    this.stack = stack
                    this.recordError()
                } catch (error) {
                    console.log(error)
                }
                event.preventDefault()
            },
            true,
        )
    }
}
export default PromiseError
