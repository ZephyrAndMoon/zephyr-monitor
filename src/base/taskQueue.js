import API from './api'

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
     * @public
     * @param {string} reportUrl 上报的地址
     * @param {object} reportMethod 上报方式对象
     * @param {object} data 上报的数据
     * @return void
     */
    add(reportUrl, reportMethod, data) {
        this.queues.push({ reportUrl, reportMethod, data })
    }

    /**
     * 上报
     * @public
     * @return void
     */
    fire() {
        if (this.queues.length === 0) {
            this.isStop = true
            return
        }
        this.isStop = false
        const item = this.queues.shift()
        if (item.reportUrl) new API(item.reportUrl, item.reportMethod).report(item.data)
        this.fire()
    }
}

export default TaskQueue
