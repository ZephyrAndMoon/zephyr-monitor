/**
 * 数据持久化
 */
class API {
	/**
	 * @constructor
	 *
	 * @param {string} string 上报的 url
	 */
	constructor(url) {
		this.url = url
	}

	/**
	 * 上报信息（默认方式）
	 *
	 * @public
	 * @param {object} data 上报的数据
	 * @param {boolean} isFetch 是否优先通过fetch上报
	 */
	report(data, isFetch) {
		if (!this._checkUrl(this.url)) {
			console.log('上报信息url地址格式不正确,url=', this.url)
			return
		}
		console.log('上报地址：' + this.url)
		this._sendInfo(data, isFetch)
	}

	/**
	 * 发送信息
	 * @private
	 * @param {object} data 上报的数据
	 * @param {boolean} isFetch 是否优先通过fetch上报
	 */
	_sendInfo(data, isFetch) {
		let dataStr = JSON.stringify(data)
		try {
			if (fetch && isFetch) {
				fetch(this.url, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: dataStr,
					mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
					keepalive: true,
				})
				return
			}
		} catch (error) {
			console.log('fetch请求异常', error)
		}
		try {
			var xhr = new XMLHttpRequest()
			xhr.open('POST', this.url, true)
			//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.send(dataStr)
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * 通过img上报数据
	 *
	 * @private
	 * @param {object} data 上报的数据
	 */
	_reportByImg(data) {
		if (!this.checkUrl(this.url)) {
			console.log('上报信息url地址格式不正确,url=', this.url)
			return
		}
		try {
			var img = new Image()
			img.src =
				this.url +
				'?v=' +
				new Date().getTime() +
				'&' +
				this._formatParams(data)
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * sendBeacon上报
	 *
	 * @private
	 * @param {object} data 上报的数据
	 */
	_reportByNavigator(data) {
		navigator.sendBeacon && navigator.sendBeacon(this.url, data)
	}

	/**
	 * 格式化参数
	 *
	 * @private
	 * @param {object} data 传递的参数
	 * @return {string} 拼接的字符串
	 */
	_formatParams(data) {
		var arr = []
		for (var name in data) {
			arr.push(
				encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
			)
		}
		return arr.join('&')
	}

	/**
	 * 检测是否符合 url 格式
	 *
	 * @private
	 * @param {string} url 检测的url
	 * @return {boolean} 拼接的字符串
	 */
	_checkUrl(url) {
		if (!url) return false
		var urlRule = /^[hH][tT][tT][pP]([sS]?):\/\//
		return urlRule.test(url)
	}
}
export default API
