import BaseMonitor from '../base/baseMonitor'
import { ErrorLevelEnum, ErrorCategoryEnum } from '../base/baseConfig.js'

import API from '../base/api'

// 网速检测
class MonitorNetworkSpeed extends BaseMonitor {
	constructor(options) {
		super(options || {})
		this.category = ErrorCategoryEnum.NETWORK_SPEED
		this.pageId = options.pageId || ''
		this.url = options.url || ''
		this.reportMethod = options.reportMethod || {}
		this.timeInterval = 60 * 1000
		this.downloadSize = 255438
		this.filePath =
			'https://file.40017.cn/tcservice/common/imags/network_speed.png'
		this.startTime = 0
		this.endTime = 0
	}

	/**
	 * 上报网络速度
	 * @public
	 */
	reportNetworkSpeed() {
		this._getSpeed()
		//定时上报
		setInterval(() => {
			this._getSpeed()
		}, this.timeInterval)
	}

	/**
	 * 获取当前时间
	 * @private
	 */
	_now() {
		return (
			performance.now() ||
			performance.webkitNow() ||
			performance.msNow() ||
			performance.oNow() ||
			performance.mozNow() ||
			new Date().getTime()
		)
	}

	/**
	 * 通过XHR获取网速
	 * @private
	 */
	_getSpeed() {
		try {
			let fileSize
			let xhr = new XMLHttpRequest()
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 2) {
					this.startTime = Date.now()
				}
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.endTime = Date.now()
					fileSize = xhr.responseText.length
					//单位（KB/s）
					let speed = (
						fileSize /
						((this.endTime - this.startTime) / 1000) /
						1024
					).toFixed(2)
					let extendsInfo = this._getExtendsInfo()
					let data = {
						...extendsInfo,
						category: this.category,
						logType: ErrorLevelEnum.INFO,
						logInfo: JSON.stringify({
							curTime: new Date().format('yyyy-MM-dd HH:mm:ss'),
							pageId: this.pageId,
							networkSpeed: speed,
							deviceInfo: this._getDeviceInfo(),
						}),
					}
					console.log("It's network_speed", data)
					new API(this.url, this.reportMethod).report(data)
				}
			}
			xhr.open('GET', this.filePath + '?rand=' + Math.random(), true)
			xhr.send()
		} catch (error) {
			console.log('测试失败：', error)
		}
	}

	/**
	 * 通过Img获取网速
	 * @private
	 */
	_getSpeedByImg() {
		let img = new Image()
		img.onload = () => {
			this.endTime = this._now()
			this._calcSpeed()
		}
		this.startTime = this._now()
		img.src = this.filePath + '?rand=' + this.startTime
	}

	/**
	 * 计算速度
	 * @private
	 */
	_calcSpeed() {
		let duration = (this.endTime - this.startTime) / 1000
		let bitsLoaded = this.downloadSize * 8
		let speedBps = (bitsLoaded / duration).toFixed(2)
		let speedKbps = (speedBps / 1024).toFixed(2)
		let speedMbps = (speedKbps / 1024).toFixed(2)
		return {
			speedKbps,
			speedMbps,
		}
	}
}

export default MonitorNetworkSpeed
