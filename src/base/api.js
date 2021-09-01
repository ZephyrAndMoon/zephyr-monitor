/**
 * 数据持久化
 */
class API {
    /**
     * @constructor
     * @param {string} string 上报的 url
     */
    constructor(url, reportMethod) {
        this.url = url
        this.reportMethod = reportMethod
    }

    /**
     * 上报信息（默认方式）
     * @public
     * @param {object} data 上报的数据
     * @return void
     */
    report(data) {
        if (!this._checkUrl(this.url)) {
            console.log('上报信息url地址格式不正确,url=', this.url)
            return
        }
        console.log(`上报地址：${this.url}`)
        const { useImg, useFetch, useBeacon } = this.reportMethod
        if (useImg) {
            this._sendInfoByImg(data) // 图片上报数据
        } else if (useFetch) {
            this._sendInfoByFetch(data) // Fetch上报数据
        } else if (useBeacon) {
            this._sendInfoByNavigator(data) // Beacon上报数据
        } else {
            this._sendInfoByXHR(data) // XHR上报数据
        }
    }

    /**
     * 通过 XHR 上报数据
     * @private
     * @param {object} data 上报的数据
     * @return void
     */
    _sendInfoByXHR(data) {
        const dataStr = JSON.stringify(data)
        try {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', this.url, true)
            // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(dataStr)
        } catch (error) {
            console.log('XHR请求异常', error)
        }
    }

    /**
     * 通过 Fetch 上报数据
     * @private
     * @param {object} data 上报的数据
     * @return void
     */
    _sendInfoByFetch(data) {
        const dataStr = JSON.stringify(data)
        try {
            if (fetch) {
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
            console.warn('当前浏览器不支持fetch，采用默认方式XHR上报数据')
            this._sendInfoByXHR(data)
        } catch (error) {
            console.log('fetch请求异常', error)
        }
    }

    /**
     * 通过img上报数据
     * @private
     * @param {object} data 上报的数据
     * @return void
     */
    _sendInfoByImg(data) {
        if (!this._checkUrl(this.url)) {
            console.log('上报信息url地址格式不正确,url=', this.url)
            return
        }
        try {
            const img = new Image()
            img.src = `${this.url}?v=${new Date().getTime()}&${this._formatParams(data)}`
        } catch (error) {
            console.log('img请求异常', error)
        }
    }

    /**
     * sendBeacon上报
     * @private
     * @param {object} data 上报的数据
     * @return void
     */
    _sendInfoByNavigator(data) {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        if (navigator.sendBeacon) navigator.sendBeacon(this.url, formData)
    }

    /**
     * 格式化参数
     * @private
     * @param {object} data 传递的参数
     * @return {string} 拼接的字符串
     */
    _formatParams(data) {
        const arr = []
        Object.keys(data).forEach((name) =>
            arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`),
        )

        return arr.join('&')
    }

    /**
     * 检测是否符合 url 格式
     * @private
     * @param {string} url 检测的url
     * @return {boolean} 拼接的字符串
     */
    _checkUrl(url) {
        if (!url) return false
        const urlRule = /^[hH][tT][tT][pP]([sS]?):\/\//
        return urlRule.test(url)
    }
}
export default API
