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
                throw Error('你的浏览器不支持 performance 操作')
            }
            const timing = window.performance.getEntriesByType('navigation')[0]

            const times = {}
            // tcp连接耗时
            times.tcpTime = (timing.connectEnd - timing.connectStart).toFixed(2)

            // DNS 查询时间
            times.dnsTime = (timing.domainLookupEnd - timing.domainLookupStart).toFixed(2)

            // DNS 缓存时间
            times.dnsCacheTime = (timing.domainLookupStart - timing.fetchStart).toFixed(2)

            // 重定向的时间
            times.redirectTime = (timing.redirectEnd - timing.redirectStart).toFixed(2)

            // 数据传输时间
            times.resTime = (timing.responseEnd - timing.responseStart).toFixed(2)

            // First Byte 时间
            times.ttfbTime = (timing.responseStart - timing.fetchStart).toFixed(2)

            // 白屏时间
            times.blankTime = (timing.responseStart - timing.fetchStart).toFixed(2)

            // 解析dom树耗时
            times.analysisTime = (timing.domComplete - timing.domInteractive).toFixed(2)

            // domReadyTime
            times.domReadyTime = (timing.domContentLoadedEventEnd - timing.fetchStart).toFixed(2)

            // 首次可交互时间
            times.firstInteractTime = (timing.domInteractive - timing.fetchStart).toFixed(2)

            // 页面加载完成的时间
            times.loadPageTime = (timing.loadEventStart - timing.fetchStart).toFixed(2)

            // 卸载页面的时间
            times.unloadTime = (timing.unloadEventEnd - timing.unloadEventStart).toFixed(2)

            Object.keys(times).forEach((time) => {
                times[time] = `${times[time]}ms`
            })
            return times
        } catch (e) {
            throw Error(e)
        }
    },

    /**
     * 获取所需资源时间节点信息
     * @public
     * @return {array} 资源时间节点信息数组
     */
    getEntries(usefulResourceType = []) {
        if (!window.performance || !window.performance.getEntries) {
            throw Error('该浏览器不支持performance.getEntries方法')
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
                // http协议版本
                templeObj.nextHopProtocol = item.nextHopProtocol
                // 重定向时间
                templeObj.redirectTime = (item.redirectEnd - item.redirectStart).toFixed(2)
                // dns查询耗时
                templeObj.dnsTime = (item.domainLookupEnd - item.domainLookupStart).toFixed(2)
                // tcp链接耗时
                templeObj.tcpTime = (item.connectEnd - item.connectStart).toFixed(2)
                // 发送请求到接收到响应第一个字符
                templeObj.ttfbTime = (item.responseStart - item.requestStart).toFixed(2)
                // 接收响应的时间（从第一个字符到最后一个字符）
                templeObj.responseTime = (item.responseEnd - item.responseStart).toFixed(2)
                // 请求 + 响应总时间
                templeObj.reqTotalTime = (item.responseEnd - item.requestStart).toFixed(2)
                entryTimesList.push(templeObj)
            }
        })
        return entryTimesList
    },
}

export default pagePerformance
