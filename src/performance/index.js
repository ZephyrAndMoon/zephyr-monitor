import API from '../base/api.js'
import pagePerformance from './performance.js'
import BaseMonitor from '../base/baseMonitor'
import { ErrorLevelEnum, ErrorCategoryEnum } from '../base/baseConfig.js'

class MonitorPerformance extends BaseMonitor {
	/**
	 * @constructor
	 * @param {object} options
	 */
	constructor(options) {
		super(options || {})
		this.isPage = !!options.isPage //是否上报页面性能数据
		this.isResource = !!options.isResource //是否上报页面资源数据
		this.usefulType = this._getSourceType(options)
		this.outTime = 50
		this.config = {
			resourceList: [], //资源列表
			performance: {}, //页面性能列表
		}
		this.category = ErrorCategoryEnum.PERFORMANCE
		this.pageId = options.pageId || ''
		this.url = options.url || ''
		this.reportMethod = options.reportMethod || {}
	}

	/**
	 * 记录页面信息
	 * @private
	 * @param {object} options { pageId ：页面标示, url ：上报地址 }
	 * @return void
	 */
	record() {
		try {
			if (this.isPage) {
				this.config.performance = pagePerformance.getTiming()
			}
			if (this.isResource) {
				this.config.resourceList = pagePerformance.getEntries(
					this.usefulType
				)
			}
			let result = {
				curTime: new Date().format('yyyy-MM-dd HH:mm:ss'),
				performance: this.config.performance,
				resourceList: this.config.resourceList,
				markUser: this._generateMarkUser(),
				markUv: this._generateMarkUv(),
				pageId: this.pageId,
				deviceInfo: this._getDeviceInfo(),
			}
			let extendsInfo = this._getExtendsInfo()
			let data = {
				...extendsInfo,
				category: this.category,
				logType: ErrorLevelEnum.INFO,
				logInfo: JSON.stringify(result),
			}
			console.log('report data =', data)
			sessionStorage.setItem('page_performance', JSON.stringify(data))
			//发送监控数据
			new API(this.url, this.reportMethod).report(data)
			this._clearPerformance()
		} catch (error) {
			console.log('性能信息上报异常：', error)
		}
	}

	/**
	 * 获取需要上报资源数据类型
	 * @private
	 * @param {object} options 上报的数据
	 * @return {array} 资源数据类型数组
	 */
	_getSourceType(options) {
		console.log('options: ', options)
		let usefulType = [] //'navigation'
		!!options.isRScript && usefulType.push('script') //资源数据细分，是否上报script数据
		!!options.isRCSS && usefulType.push('css') //资源数据细分，是否上报CSS数据
		!!!!options.isRFetch && usefulType.push('fetch') //资源数据细分，是否上报Fetch数据
		!!options.isRXHR && usefulType.push('xmlhttprequest') //资源数据细分，是否上报XHR数据
		!!options.isRLink && usefulType.push('link') //资源数据细分，是否上报Link数据
		!!options.isRIMG && usefulType.push('img') //资源数据细分，是否上报IMG数据
		return usefulType
	}

	/**
	 * 生成随机字符串
	 * @private
	 * @param {number} len 字符串长度
	 * @return {string} 随机字符串
	 */
	_randomString(len) {
		len = len || 10
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
		var maxPos = $chars.length
		var pwd = ''
		for (let i = 0; i < len; i++) {
			pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos))
		}
		return pwd + new Date().getTime()
	}

	/**
	 * 获取需要上报资源数据类型
	 * @private
	 * @param {object} options 上报的数据
	 */
	_getSourceType(options) {
		let usefulType = [] //'navigation'
		!!options.isRScript && usefulType.push('script') //资源数据细分，是否上报script数据
		!!options.isRCSS && usefulType.push('css') //资源数据细分，是否上报CSS数据
		!!!!options.isRFetch && usefulType.push('fetch') //资源数据细分，是否上报Fetch数据
		!!options.isRXHR && usefulType.push('xmlhttprequest') //资源数据细分，是否上报XHR数据
		!!options.isRLink && usefulType.push('link') //资源数据细分，是否上报Link数据
		!!options.isRIMG && usefulType.push('img') //资源数据细分，是否上报IMG数据
		return usefulType
	}

	/**
	 * 生成用户标识
	 * @private
	 * @return void
	 */
	_generateMarkUser() {
		let psMarkUser = sessionStorage.getItem('ps_markUser') || ''
		if (!psMarkUser) {
			psMarkUser = this._randomString()
			sessionStorage.setItem('ps_markUser', psMarkUser)
		}
		return psMarkUser
	}

	/**
	 * 生成 Uv: Unique Visitor
	 * @private
	 * @return void
	 */
	_generateMarkUv() {
		const date = new Date()
		let psMarkUv = sessionStorage.getItem('ps_markUv') || ''
		const dataTime = sessionStorage.getItem('ps_markUvTime') || ''
		const today = date.format('yyyy/MM/dd 23:59:59')
		if ((!psMarkUv && !dataTime) || date.getTime() > dataTime * 1) {
			psMarkUv = this._randomString()
			sessionStorage.setItem('ps_markUv', psMarkUv)
			sessionStorage.setItem('ps_markUvTime', new Date(today).getTime())
		}
		return psMarkUv
	}

	/**
	 * 清除性能信息
	 * @private
	 * @return void
	 */
	_clearPerformance() {
		if (window.performance && window.performance.clearResourceTimings) {
			performance.clearResourceTimings()
			this.config.performance = {}
			this.config.resourceList = ''
		}
	}
}

export default MonitorPerformance
