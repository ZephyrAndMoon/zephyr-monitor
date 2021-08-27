import utils from '../utils/util'
import BaseMonitor from '../base/baseMonitor.js'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js'

/**
 * vue错误
 */
class VueError extends BaseMonitor {
	/**
	 * @constructor
	 * @param {object} params
	 */
	constructor(params) {
		super(params)
	}

	/**
	 * 注册错误捕获事件
	 * @public
	 * @return void
	 */
	handleRegisterErrorCaptureEvents(Vue) {
		if (!Vue) {
			return
		}
		Vue.config.errorHandler = (error, vm, info) => {
			try {
				const { message, stack } = error
				const stackMatchInfo = /\((.*)\)/.exec(stack)
				const errorPosition = RegExp.$1

				if (errorPosition) {
					const { line, col, fileName } =
						utils.parseErrorPosition(errorPosition)
					this.line = line
					this.col = col
					this.sourcemapFileName = fileName + '.map'
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
				this.url = errorPosition
				this.stack = error.stack
				this.recordError()
			} catch (error) {
				console.log('vue错误异常', error)
			}
		}
	}
}
export default VueError
