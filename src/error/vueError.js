import BaseMonitor from '../base/baseMonitor'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig'
import { formatComponentInfo, getErrorUrl, logger } from '../utils/util'

/**
 * vue错误
 */
class VueError extends BaseMonitor {
    /**
     * 注册错误捕获事件
     * @public
     * @return void
     */
    handleRegisterErrorCaptureEvents(Vue) {
        if (!Vue) {
            return
        }
        // eslint-disable-next-line no-param-reassign
        Vue.config.errorHandler = (error, vm) => {
            try {
                const { message, stack = [] } = error
                if (Object.prototype.toString.call(vm) === '[object Object]') {
                    this.otherErrorInfo = {
                        componentPosition: formatComponentInfo(vm),
                        propsData: vm.$options.propsData,
                    }
                }
                this.logType = ErrorLevelEnum.ERROR
                this.category = ErrorCategoryEnum.VUE_ERROR
                this.url = getErrorUrl(stack)
                this.msg = message
                this.stack = stack
                this.recordError()
            } catch (e) {
                logger('error', 'Catching "vue_error" error exceptions', e)
            }
        }
    }
}
export default VueError
