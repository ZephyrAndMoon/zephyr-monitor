import DeviceInfo from '../device'
import TaskQueue from './taskQueue'
import { ErrorLevelEnum, ErrorCategoryEnum } from './baseConfig'

const taskQueue = new TaskQueue()

// 监控基类
class BaseMonitor {
    /**
     * @constructor
     * @param {object} params 初始化参数
     * @param {string} params.reportUrl 上报路径
     * @param {object} params.extendsInfo 扩展信息
     * @param {object} params.reportMethod 上报方式
     */
    constructor({ reportUrl, extendsInfo, reportMethod }) {
        this.category = ErrorCategoryEnum.UNKNOWN_ERROR // 错误类型
        this.level = ErrorLevelEnum.INFO // 错误等级
        this.msg = {} // 错误信息
        this.url = '' // 错误信息地址
        this.stack = [] // 错误堆栈
        this.otherErrorInfo = {} // 其他错误内容

        this.reportUrl = reportUrl // 上报错误地址
        this.extendsInfo = extendsInfo // 扩展信息
        this.reportMethod = reportMethod // 上报方式
    }

    /**
     * 记录错误信息
     * @public
     * @return void
     */
    recordError() {
        this._handleRecordError()
        // 延迟记录日志
        setTimeout(() => {
            if (taskQueue.isStop) taskQueue.fire() // 停止则fire
        }, 100)
    }

    /**
     * 记录错误日志
     * @private
     * @return void
     */
    _handleRecordError() {
        try {
            if (!this.msg) {
                return
            }
            // 过滤掉错误上报地址
            if (
                this.reportUrl &&
                this.url &&
                this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0
            ) {
                console.log('统计错误接口异常', this.msg)
                return
            }
            const errorInfo = this._handleErrorInfo()
            console.log(`\nIt's ${this.category}`, errorInfo)
            // 记录日志
            taskQueue.add(this.reportUrl, this.reportMethod, errorInfo)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 处理错误信息
     * @private
     * @return {object} 错误信息对象
     */
    _handleErrorInfo() {
        const logInfo = {
            url: this.url,
            errorInfo: this.msg,
            otherErrorInfo: this.otherErrorInfo,
            stack: this.stack,
        }
        const deviceInfo = this._getDeviceInfo()
        const recordInfo = {
            time: new Date().format('yyyy-MM-dd HH:mm:ss'),
            logType: this.level,
            category: this.category,
            logInfo: JSON.stringify(logInfo),
            deviceInfo: JSON.stringify(deviceInfo),
            extendsInfo: JSON.stringify(this.extendsInfo),
        }
        console.log('错误信息: ', recordInfo)
        return recordInfo
    }

    /**
     * 获取设备信息
     * @private
     * @return {object} 设备信息对象
     */
    _getDeviceInfo() {
        try {
            const deviceInfo = DeviceInfo.getDeviceInfo()
            return deviceInfo
        } catch (error) {
            console.log(error)
            return ''
        }
    }
}
export default BaseMonitor
