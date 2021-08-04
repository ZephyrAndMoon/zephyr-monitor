import API from './api.js'

class TaskQueue {
	/**
	 * @constructor
	 */
	constructor() {
		this.isStop = true
		this.queues = []
	}

	/**
	 * 添加上报信息
	 *
	 * @public
	 * @param {string} reportUrl 上报的地址
	 * @param {object} data 上报的数据
	 */
	add(reportUrl, data) {
		this.queues.push({ reportUrl, data })
	}

	/**
	 * 上报
	 *
	 * @public
	 */
	fire() {
		if (this.queues.length === 0) {
			this.isStop = true
			return
		}
		this.isStop = false
		let item = this.queues.shift()
		item.reportUrl && new API(item.reportUrl).report(item.data)
		this.fire()
	}
}

export default TaskQueue
