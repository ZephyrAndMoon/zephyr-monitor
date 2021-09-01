import utils from '../utils/util'
import BaseMonitor from '../base/baseMonitor'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig'

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
                const { message, stack } = error
                const stackMatchInfo = /\((.*)\)/.exec(stack)
                const errorInfo = stackMatchInfo[1]

                if (errorInfo) {
                    const { line, col, fileName } = utils.parseErrorPosition(errorInfo)
                    this.line = line
                    this.col = col
                    this.sourcemapFileName = `${fileName}.map`
                }
                if (Object.prototype.toString.call(vm) === '[object Object]') {
                    this.otherErrorInfo = {
                        componentPosition: utils.formatComponentInfo(vm),
                        propsData: vm.$options.propsData,
                    }
                }
                this.level = ErrorLevelEnum.ERROR
                this.category = ErrorCategoryEnum.VUE_ERROR
                this.msg = message
                this.url = errorInfo
                this.stack = error.stack
                this.recordError()
            } catch (e) {
                console.log('vue错误异常', e)
            }
        }
    }
}
export default VueError
