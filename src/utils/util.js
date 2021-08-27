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
		return obj == undefined || obj == '' || obj == null
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
		let name = vm._isVue
			? (vm.$options && vm.$options.name) ||
			  (vm.$options && vm.$options._componentTag)
			: vm.name
		return (
			(name ? 'component <' + name + '>' : 'anonymous component') +
			(vm._isVue && vm.$options && vm.$options.__file
				? ' at ' + (vm.$options && vm.$options.__file)
				: '')
		)
	},

	/**
	 * 获取错误栈的行和列
	 * @param {string} stack
	 * @return {object} {line, col} 返回堆栈错误位置的行与列
	 */
	parseErrorPosition(stack) {
		const fileUrl = stack.slice(stack.lastIndexOf('/') + 1)
		const [fileName, line, col] = fileUrl.split(':')
		return { fileName, line, col }
	},
}
