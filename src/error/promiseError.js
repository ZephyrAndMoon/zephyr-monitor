import utils from '../utils/util'
import BaseMonitor from '../base/baseMonitor.js'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js'
/**
 * 捕获未处理的Promise异常
 */

class PromiseError extends BaseMonitor {
	constructor(params) {
		super(params)
	}

	process
	/**
	 * 处理错误
	 */
	handleError() {
		window.addEventListener(
			'unhandledrejection',
			event => {
				console.log(event)
				try {
					if (!event || !event.reason) {
						return
					}
					const { message, stack } = event.reason
					const stackMatchInfo = /at(.*)/.exec(stack)
					const errorPosition = RegExp.$1

					if (errorPosition) {
						const { line, col, fileName } =
							utils.parseErrorPosition(errorPosition)
						this.line = line
						this.col = col
						this.sourcemapFileName = fileName + '.map'
					}
					this.level = ErrorLevelEnum.ERROR
					this.category = ErrorCategoryEnum.PROMISE_ERROR
					this.msg = message || event.reason
					this.url = errorPosition
					this.stack = stack
					
					this.recordError()
				} catch (error) {
					console.log(error)
				}
			},
			true
		)
		// event.preventDefault()
	}
}
export default PromiseError
