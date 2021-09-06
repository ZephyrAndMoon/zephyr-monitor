export default {
    /**
     * 检测数据类型
     * @param {*}
     * @return {boolean}
     */
    type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
    },

    /**
     * 是否为null
     * @param {*} obj
     * @return {boolean}
     */
    isFunction(obj) {
        return this.type(obj) === 'Function'
    },

    /**
     * 是否为null
     * @param {*} obj
     * @return {boolean}
     */
    isArray(obj) {
        return this.type(obj) === 'Array'
    },

    /**
     * 是否为null
     * @param {*} obj
     * @return {boolean}
     */
    isNull(obj) {
        return obj === undefined || obj === '' || obj == null
    },

    /**
     * 对象是否为空
     * @param {*} obj
     * @return {boolean}
     */
    objectIsNull(obj) {
        return JSON.stringify(obj) === '{}'
    },

    /**
     * 是否是对象
     * @param {*} obj
     * @return {boolean}
     */
    isObject(obj) {
        return this.type(obj) === 'Object'
    },

    /**
     * 获取当前组件信息
     * @param {object} vm vue实例
     * @return {string} 组件信息
     */
    formatComponentInfo(vm) {
        if (vm.$root === vm) return 'root'
        const name = vm._isVue
            ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag)
            : vm.name
        return (
            (name ? `component <${name}>` : 'anonymous component') +
            (vm._isVue && vm.$options && vm.$options.__file
                ? ` at ${vm.$options && vm.$options.__file}`
                : '')
        )
    },

    /**
     * 获取报错位置（返回第一个错误的堆栈位置）
     * @param {array} stack 错误堆栈
     * @return {string} 组件信息
     */
    getErrorUrl(stack = []) {
        let i = 0
        for (; i < stack.length; i += 1) {
            const { FILE_NAME } = stack[i]
            if (FILE_NAME) return FILE_NAME
        }
        return ''
    },
}
