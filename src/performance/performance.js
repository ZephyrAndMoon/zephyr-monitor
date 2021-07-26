/**
 * 页面监控
 */
const pagePerformance = {
	getTiming() {
		try {
			if (!window.performance || !window.performance.getEntriesByType) {
				console.log('你的浏览器不支持 performance 操作')
				return
			}
			const timing = window.performance.getEntriesByType('navigation')[0]
			const loadTime = timing.loadEventEnd - timing.loadEventStart

			let times = {}
			if (loadTime < 0) {
				setTimeout(function () {
					pagePerformance.getTiming()
				}, 200)
				return
			}
			// tcp连接耗时
			times.tcpTime = (timing.connectEnd - timing.connectStart).toFixed(2)

			// DNS 查询时间
			times.dnsTime = (
				timing.domainLookupEnd - timing.domainLookupStart
			).toFixed(2)

			// DNS 缓存时间
			times.dnsCacheTime = (
				timing.domainLookupStart - timing.fetchStart
			).toFixed(2)

			// 重定向的时间
			times.redirectTime = (
				timing.redirectEnd - timing.redirectStart
			).toFixed(2)

			// 数据传输时间
			times.reqTime = (timing.responseEnd - timing.responseStart).toFixed(
				2
			)
			// First Byte 时间
			times.ttfbTime = (
				timing.responseStart - timing.navigationStart
			).toFixed(2)

			// 白屏时间
			times.blankTime = (
				timing.responseStart - timing.navigationStart
			).toFixed(2)

			// 解析dom树耗时
			times.analysisTime = (
				timing.domComplete - timing.domInteractive
			).toFixed(2)

			// domReadyTime
			times.domReadyTime = (
				timing.domContentLoadedEventEnd - timing.navigationStart
			).toFixed(2)

			// 首次可交互时间
			times.firstInteractTime = (
				timing.domInteractive - timing.navigationStart
			).toFixed(2)

			// 页面加载完成的时间
			times.loadPageTime = (
				timing.loadEventStart - timing.navigationStart
			).toFixed(2)

			//卸载页面的时间
			times.unloadTime = (
				timing.unloadEventEnd - timing.unloadEventStart
			).toFixed(2)

			return times
		} catch (e) {
			console.log(e)
		}
	},

	getEntries(usefulType) {
		usefulType = usefulType || []
		if (!window.performance || !window.performance.getEntries) {
			console.log('该浏览器不支持performance.getEntries方法')
			return
		}
		let entryTimesList = []
		let entryList = window.performance.getEntries()
		if (!entryList || entryList.length == 0) {
			return entryTimesList
		}
		entryList.forEach((item, index) => {
			let templeObj = {}
			if (usefulType.indexOf(item.initiatorType) > -1) {
				//请求资源路径
				templeObj.name = item.name
				//发起资源类型
				templeObj.initiatorType = item.initiatorType
				//http协议版本
				templeObj.nextHopProtocol = item.nextHopProtocol
				//重定向时间
				templeObj.redirectTime = (
					item.redirectEnd - item.redirectStart
				).toFixed(2)
				//dns查询耗时
				templeObj.dnsTime = (
					item.domainLookupEnd - item.domainLookupStart
				).toFixed(2)
				//tcp链接耗时
				templeObj.tcpTime = (
					item.connectEnd - item.connectStart
				).toFixed(2)
				//发送请求到接收到响应第一个字符
				templeObj.ttfbTime = (
					item.responseStart - item.requestStart
				).toFixed(2)
				//接收响应的时间（从第一个字符到最后一个字符）
				templeObj.responseTime = (
					item.responseEnd - item.responseStart
				).toFixed(2)
				//请求+响应总时间
				templeObj.reqTotalTime = (
					item.responseEnd - item.requestStart
				).toFixed(2)
				entryTimesList.push(templeObj)
			}
		})
		return entryTimesList
	},
}

export default pagePerformance
