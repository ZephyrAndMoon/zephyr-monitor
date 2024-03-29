import { log } from './Logger'
import { judgeType } from '../utils/util'

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
        const { useImg, useFetch, useBeacon } = this.reportMethod

        const _data = {}
        Object.entries(data).forEach(([key, value]) => {
            _data[key] = ['Array', 'Object'].includes(judgeType(value))
                ? JSON.stringify(value)
                : value
        })

        if (useImg) {
            this._sendInfoByImg(_data) // 图片上报数据
        } else if (useFetch) {
            this._sendInfoByFetch(_data) // Fetch上报数据
        } else if (useBeacon) {
            this._sendInfoByNavigator(_data) // Beacon上报数据
        } else {
            this._sendInfoByXHR(_data) // XHR上报数据
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
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(dataStr)
        } catch (error) {
            log('error', 'XHR request exception', error)
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
            log(
                'warn',
                'The current browser does not support fetch, the default method of XHR reporting data is used',
            )
            this._sendInfoByXHR(data)
        } catch (error) {
            log('error', 'XHR request exception', error)
        }
    }

    /**
     * 通过img上报数据
     * @private
     * @param {object} data 上报的数据
     * @return void
     */
    _sendInfoByImg(data) {
        try {
            const img = new Image()
            img.src = `${this.url}?v=${new Date().getTime()}&${this._formatParams(data)}`
        } catch (error) {
            log('error', 'IMG request exception', error)
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
}
export default API
