import API from '../base/api'
import pagePerformance from './performance'
import BaseMonitor from '../base/baseMonitor'
import { ErrorLevelEnum, ErrorCategoryEnum } from '../base/baseConfig'

class MonitorPerformance extends BaseMonitor {
    /**
     * @constructor
     * @param {object} options
     */
    constructor(options) {
        super(options || {})
        this.url = options.url || ''
        this.category = ErrorCategoryEnum.PERFORMANCE
        this.reportMethod = options.reportMethod || {}
        this.usePerf = !(options.usePerf === false) // 是否上报页面性能数据
        this.useResource = !(options.useResource === false) // 是否上报页面资源数据
        this.usefulResourceType = this._getResourceType(options.usefulResourceType)
        this.performanceInfo = {
            resource: [], // 资源列表
            performance: {}, // 页面性能列表
        }
    }

    /**
     * 记录页面信息
     * @private
     * @param {object} options
     * @return void
     */
    record() {
        try {
            if (this.usePerf) {
                this.performanceInfo.performance = pagePerformance.getTiming()
            }
            if (this.useResource) {
                this.performanceInfo.resource = pagePerformance.getEntries(this.usefulResourceType)
            }
            const result = {
                pageId: this.pageId,
                time: new Date().format('yyyy-MM-dd HH:mm:ss'),
                performance: this.performanceInfo.performance,
                resource: this.performanceInfo.resource,
                markUser: this._generateMarkUser(),
                markUv: this._generateMarkUv(),
                deviceInfo: this._getDeviceInfo(),
            }
            const data = {
                ...this.extendsInfo,
                category: this.category,
                logType: ErrorLevelEnum.INFO,
                logInfo: JSON.stringify(result),
            }
            console.info('[ZephyrMonitor Info]: Performance info', data)
            sessionStorage.setItem('page_performance', JSON.stringify(data))
            // 发送监控数据
            new API(this.url, this.reportMethod).report(data)
            this._clearPerformance()
        } catch (e) {
            console.error('[ZephyrMonitor Error]: Performance information reporting exception', e)
        }
    }

    /**
     * 获取需要上报资源数据类型
     * @private
     * @param {object} options 上报的数据
     * @return {array} 资源数据类型数组
     */
    _getResourceType(typeList = {}) {
        const hasOptions = Object.keys(typeList).length > 0
        const type = new Set(['script', 'css', 'fetch', 'xmlhttprequest', 'link', 'img'])

        if (!hasOptions) {
            return Array.from(type)
        }

        const { useRScript, useRCSS, useRFetch, useRXHR, useRLink, useRImg } = typeList
        if (useRCSS) type.delete('css')
        if (useRImg) type.delete('img')
        if (useRLink) type.delete('link')
        if (useRFetch) type.delete('fetch')
        if (useRScript) type.delete('script')
        if (useRXHR) type.delete('xmlhttprequest')

        return Array.from(type)
    }

    /**
     * 生成随机字符串
     * @private
     * @param {number} len 字符串长度
     * @return {string} 随机字符串
     */
    _randomString(len) {
        const _len = len || 10
        const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
        const maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < _len; i += 1) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd + new Date().getTime()
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
            this.performanceInfo.performance = {}
            this.performanceInfo.resource = []
        }
    }
}

export default MonitorPerformance
