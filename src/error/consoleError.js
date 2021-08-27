import BaseMonitor from '../base/baseMonitor.js'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js'
/**
 * console.error异常
 */
class ConsoleError extends BaseMonitor {
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
		let t = this
		console.Info = function () {
			t.handleLog(
				ErrorLevelEnum.INFO,
				ErrorCategoryEnum.CONSOLE_INFO,
				arguments
			)
		}
	}

	/**
	 * 处理警告
	 * @private
	 * @return void
	 */
	registerWarn() {
		let t = this
		console.Warn = function () {
			t.handleLog(
				ErrorLevelEnum.WARN,
				ErrorCategoryEnum.CONSOLE_WARN,
				arguments
			)
		}
	}

	/**
	 * 处理错误
	 * @private
	 * @return void
	 */
	registerError() {
		let t = this
		console.Error = function () {
			t.handleLog(
				ErrorLevelEnum.ERROR,
				ErrorCategoryEnum.CONSOLE_ERROR,
				arguments
			)
		}
	}

	/**
	 * 处理警告
	 * @private
	 * @param {string} level 错误等级
	 * @param {string} category 错误类别
	 * @param {*} args 其他参数
	 * @return void
	 */
	handleLog(level, category, args) {
		try {
			this.level = level
			let params = [...args]
			this.msg = params.join('\r\n') //换行符分割
			this.url = location.href //当前地址
			this.category = category
			this.recordError()
		} catch (error) {
			console.log('console统计错误异常', level, error)
		}
	}
}

/**
 * 初始化console事件
 */
;(function () {
	//创建空console对象，避免JS报错
	if (!window.console) {
		window.console = {}
	}
	let funcTypes = ['tInfo', 'tWarn', 'tError']
	funcTypes.forEach(func => {
		if (!console[func]) {
			console[func] = function () {}
		}
	})
})()

export default ConsoleError
