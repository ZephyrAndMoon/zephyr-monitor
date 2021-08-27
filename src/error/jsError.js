import BaseMonitor from '../base/baseMonitor.js'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js'
/**
 * 捕获JS错误
 */
class JSError extends BaseMonitor {
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
	handleRegisterErrorCaptureEvents() {
		window.onerror = (msg, url, line, col, error) => {
			try {
				this.level = ErrorLevelEnum.WARN
				this.category = ErrorCategoryEnum.JS_ERROR
				this.msg = msg
				this.url = url
				this.line = line
				this.col = col
				this.errorObj = error
				this.stack = error.stack
				this.recordError()
			} catch (error) {
				console.log('js错误异常', error)
			}
		}
	}
}
export default JSError
