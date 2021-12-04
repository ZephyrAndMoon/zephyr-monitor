import { log } from '../base/Logger'
/**
 * 检测数据类型
 * @param {*}
 * @return {boolean}
 */
const judgeType = (obj) => Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')

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
 * 参数校验
 * @param {object} data 校验对象
 * @param {array} validateRules 校验规则数组
 * @return {boolean} 是否通过校验
 */
const paramsValidator = (data = {}, validateRules = []) => {
    for (let i = 0; i < validateRules.length; i += 1) {
        const { filed, require, type, validator = {} } = validateRules[i]

        const { fn: validatorFn, message: validatorMessage } = validator

        // 先判断是否为必须参数
        if (require && !data[filed]) {
            log('error', `Missing necessary parameters "${filed}"`)
            return false
        }

        // 有值的话再进行类型判断
        if (data[filed]) {
            if (judgeType(data[filed]) !== type) {
                log(
                    'error',
                    `Type check failed for parameter "${filed}". Expected ${type}, but got ${type}`,
                )
                return false
            }
        }

        // 有校验方法时
        if (validatorFn && !validatorFn(data[filed])) {
            log('error', validatorMessage || 'Parameter check error')
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

/**
 * 检测是否符合 url 格式
 * @private
 * @param {string} url 检测的url
 * @return {boolean} 拼接的字符串
 */
const checkUrl = (url) => url && /^[hH][tT][tT][pP]([sS]?):\/\//.test(url)

export { checkUrl, judgeType, formatComponentInfo, getErrorUrl, paramsValidator, useCrossorigin }
