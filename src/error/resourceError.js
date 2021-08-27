import BaseMonitor from '../base/baseMonitor.js'
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js'
/**
 * 资源加载错误
 */
class ResourceError extends BaseMonitor {
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
		window.addEventListener(
			'error',
			event => {
				try {
					if (!event) {
						return
					}
					let target = event.target || event.srcElement
					var isElementTarget =
						target instanceof HTMLScriptElement ||
						target instanceof HTMLLinkElement ||
						target instanceof HTMLImageElement
					if (!isElementTarget) {
						return // js error不再处理
					}
					this.level = ErrorLevelEnum.ERROR
					this.category = ErrorCategoryEnum.RESOURCE_ERROR
					this.msg = '加载 ' + target.tagName + ' 资源错误'
					this.url = target.src || target.href
					this.recordError()
				} catch (error) {
					console.log('资源加载收集异常', error)
				}
				event.preventDefault()
			},
			true
		)
	}
}
export default ResourceError
