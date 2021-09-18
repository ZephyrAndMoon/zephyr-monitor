/**
 * 页面监控
 */
const pagePerformance = {
    /**
     * 获取性能时间节点信息
     * @public
     * @return {object} 性能时间节点信息对象
     */
    getTiming() {
        try {
            if (!window.performance || !window.performance.getEntriesByType) {
                console.warn('[ZephyrMonitor Warn]: Browser does not support performance')
                return {}
            }
            const timing = window.performance.getEntriesByType('navigation')[0]

            const times = {}
            // tcp连接耗时
            times.tcpTime = (timing.connectEnd - timing.connectStart).toFixed(2)

            // DNS 查询耗时
            times.dnsTime = (timing.domainLookupEnd - timing.domainLookupStart).toFixed(2)

            // DNS 查询缓存耗时
            times.dnsCacheTime = (timing.domainLookupStart - timing.fetchStart).toFixed(2)

            // 重定向耗时
            times.redirectTime = (timing.redirectEnd - timing.redirectStart).toFixed(2)

            // 数据传输耗时
            times.resTime = (timing.responseEnd - timing.responseStart).toFixed(2)

            // First Byte 耗时
            times.ttfbTime = (timing.responseStart - timing.fetchStart).toFixed(2)

            // 白屏时长
            times.blankTime = (timing.responseStart - timing.fetchStart).toFixed(2)

            // 解析 dom 树耗时
            times.analysisTime = (timing.domComplete - timing.domInteractive).toFixed(2)

            // dom节点解析完成耗时
            times.domReadyTime = (timing.domContentLoadedEventEnd - timing.fetchStart).toFixed(2)

            // 首次可交互耗时
            times.firstInteractTime = (timing.domInteractive - timing.fetchStart).toFixed(2)

            // 页面加载完成耗时
            times.pageLoadedTime = (timing.loadEventStart - timing.fetchStart).toFixed(2)

            // 卸载页面耗时
            times.unloadTime = (timing.unloadEventEnd - timing.unloadEventStart).toFixed(2)

            Object.keys(times).forEach((time) => {
                times[time] = `${times[time]}ms`
            })
            return times
        } catch (e) {
            console.error('[ZephyrMonitor Error]: Get performance information exceptions', e)
            return {}
        }
    },

    /**
     * 获取所需资源时间节点信息
     * @public
     * @return {array} 资源时间节点信息数组
     */
    getEntries(usefulResourceType = []) {
        if (!window.performance || !window.performance.getEntries) {
            console.warn(
                '[ZephyrMonitor Warn]: This browser does not support the performance.getEntries method',
            )
            return {}
        }
        const entryTimesList = []
        const entryList = window.performance.getEntries()
        if (!entryList || entryList.length === 0) {
            return entryTimesList
        }
        entryList.forEach((item) => {
            const templeObj = {}
            if (usefulResourceType.indexOf(item.initiatorType) > -1) {
                // 请求资源路径
                templeObj.name = item.name
                // 发起资源类型
                templeObj.initiatorType = item.initiatorType
                // http 协议版本
                templeObj.nextHopProtocol = item.nextHopProtocol
                // 重定向耗时
                templeObj.redirectTime = (item.redirectEnd - item.redirectStart).toFixed(2)
                // dns 查询耗时
                templeObj.dnsTime = (item.domainLookupEnd - item.domainLookupStart).toFixed(2)
                // tcp 连接耗时
                templeObj.tcpTime = (item.connectEnd - item.connectStart).toFixed(2)
                // first byte 耗时
                templeObj.ttfbTime = (item.responseStart - item.requestStart).toFixed(2)
                // 响应完成耗时
                templeObj.responseTime = (item.responseEnd - item.responseStart).toFixed(2)
                // 请求响应耗时
                templeObj.reqTotalTime = (item.responseEnd - item.requestStart).toFixed(2)
                entryTimesList.push(templeObj)
            }
        })
        return entryTimesList
    },
}

export default pagePerformance
