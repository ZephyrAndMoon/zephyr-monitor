import DeviceInfo from '../device'
import TaskQueue from './taskQueue'
import { logger } from '../utils/util'
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
    constructor({ pageId, reportUrl, extendsInfo, reportMethod }) {
        this.pageId = pageId || ''
        this.reportUrl = reportUrl // 上报错误地址
        this.extendsInfo = extendsInfo // 扩展信息
        this.reportMethod = reportMethod // 上报方式

        this.category = ErrorCategoryEnum.UNKNOWN_ERROR // 错误类型
        this.logType = ErrorLevelEnum.INFO // 信息类别
        this.msg = {} // 错误信息
        this.url = '' // 错误信息地址
        this.stack = [] // 错误堆栈
        this.otherInfo = {} // 其他错误内容
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
            // 过滤错误上报地址
            if (
                this.reportUrl &&
                this.url &&
                this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0
            ) {
                logger('error', 'Error logging exception', this.msg)
                return
            }
            const errorInfo = this._handleErrorInfo()
            // 记录日志
            taskQueue.add(this.reportUrl, this.reportMethod, errorInfo)
        } catch (error) {
            logger('error', 'Error logging exception', this.msg)
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
            otherInfo: this.otherInfo,
            stack: this.stack,
        }
        const deviceInfo = this._getDeviceInfo()
        const recordInfo = {
            pageId: this.pageId,
            time: new Date().format('yyyy-MM-dd HH:mm:ss'),
            logType: this.logType,
            category: this.category,
            logInfo: JSON.stringify(logInfo),
            deviceInfo: JSON.stringify(deviceInfo),
            extendsInfo: JSON.stringify(this.extendsInfo),
        }
        logger('info', 'Error info', recordInfo)
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
        } catch (e) {
            logger('error', 'Exceptions to obtaining device information', e)
            return ''
        }
    }
}
export default BaseMonitor
