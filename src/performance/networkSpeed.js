import API from '../base/Api'
import { log } from '../base/Logger'
import BaseMonitor from '../base/BaseMonitor'
import { ErrorLevelEnum, ErrorCategoryEnum } from '../base/baseConfig'

// 网速检测
class MonitorNetworkSpeed extends BaseMonitor {
    /**
     * @constructor
     * @param {object} options
     */
    constructor(options) {
        super(options || {})
        this.category = ErrorCategoryEnum.NETWORK_SPEED
        this.url = options.url || ''
        this.reportMethod = options.reportMethod || {}
        this.timeInterval = options.timeInterval || 60 * 1000

        this.startTime = 0
        this.endTime = 0
        this.downloadSize = 67185
        this.filePath = 'https://markdowncun.oss-cn-beijing.aliyuncs.com/20210909211826.png'
    }

    /**
     * 上报网络速度
     * @public
     * @return void
     */
    reportNetworkSpeed() {
        this._getSpeed()
        // 定时上报
        setInterval(() => {
            this._getSpeed()
        }, this.timeInterval)
    }

    /**
     * 获取当前时间
     * @private
     * @return {number} 时间戳
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
     * @return void
     */
    _getSpeed() {
        try {
            let fileSize
            const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 2) {
                    this.startTime = Date.now()
                }
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.endTime = Date.now()
                    fileSize = xhr.responseText.length
                    // 单位（KB/s）
                    const speed = (
                        fileSize /
                        ((this.endTime - this.startTime) / 1000) /
                        1024
                    ).toFixed(2)
                    const data = {
                        pageId: this.pageId,
                        time: new Date().format('yyyy-MM-dd HH:mm:ss'),
                        category: this.category,
                        logType: ErrorLevelEnum.INFO,
                        networkSpeed: speed,
                        deviceInfo: this._getDeviceInfo(),
                        ...this.extendsInfo,
                    }
                    log('info', 'NetSpeed info', data)
                    new API(this.url, this.reportMethod).report(data)
                }
            }
            xhr.open('GET', `${this.filePath}?rand=${Math.random()}`, true)
            xhr.send()
        } catch (e) {
            log('error', 'Internet speed test failed', e)
        }
    }

    /**
     * 通过Img获取网速
     * @private
     * @return void
     */
    _getSpeedByImg() {
        const img = new Image()
        img.onload = () => {
            this.endTime = this._now()
            this._calcSpeed()
        }
        this.startTime = this._now()
        img.src = `${this.filePath}?rand=${this.startTime}`
    }

    /**
     * 计算速度
     * @private
     * @return {object} { speedKbps:千比特每秒, speedMbps:比特每秒 }
     */
    _calcSpeed() {
        const duration = (this.endTime - this.startTime) / 1000
        const bitsLoaded = this.downloadSize * 8
        const speedBps = (bitsLoaded / duration).toFixed(2)
        const speedKbps = (speedBps / 1024).toFixed(2)
        const speedMbps = (speedKbps / 1024).toFixed(2)
        return {
            speedKbps,
            speedMbps,
        }
    }
}

export default MonitorNetworkSpeed
