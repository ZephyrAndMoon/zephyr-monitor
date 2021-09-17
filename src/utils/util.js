/**
 * 检测数据类型
 * @param {*}
 * @return {boolean}
 */
const judgeType = (obj) => {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

/**
 * 获取当前组件信息
 * @param {object} vm vue实例
 * @return {string} 组件信息
 */
const formatComponentInfo = (vm) => {
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
}

/**
 * 获取报错位置（返回第一个错误的堆栈位置）
 * @param {array} stack 错误堆栈
 * @return {string} 组件信息
 */
const getErrorUrl = (stack = []) => {
    let i = 0
    for (; i < stack.length; i += 1) {
        const { FILE_NAME } = stack[i]
        if (FILE_NAME) return FILE_NAME
    }
    return ''
}

/**
 * 获取报错位置（返回第一个错误的堆栈位置）
 * @param {object} data 校验对象
 * @param {array} validateRules 校验规则数组
 * @return {boolean} 是否通过校验
 */
const validateParameters = (data = {}, validateRules = []) => {
    for (let i = 0; i < validateRules.length; i += 1) {
        const rule = validateRules[i]
        // 先判断是否为必须参数
        if (rule.require && !data[rule.filed]) {
            console.error(`[ZephyrMonitor Error]: Missing necessary parameters "${rule.filed}"`)
            return false
        }

        // 有值的话再进行类型判断
        if (data[rule.filed]) {
            const type = judgeType(data[rule.filed])
            if (type !== rule.type) {
                console.error(
                    `[ZephyrMonitor Error]: Type check failed for parameter "${rule.filed}". Expected ${rule.type}, got ${type}`,
                )
                return false
            }
        }
    }
    return true
}

/**
 * 给 script 标签加上跨域属性
 * @return {void}
 */
const useCrossorigin = () => {
    document.querySelectorAll('script').forEach((dom) => dom.setAttribute('crossorigin', true))
}

export { judgeType, formatComponentInfo, getErrorUrl, validateParameters, useCrossorigin }
