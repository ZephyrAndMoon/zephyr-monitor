/**
 * 错误类型枚举
 */
export const ErrorCategoryEnum = {
    // js 错误
    JS_ERROR: 'js_error',
    // 资源引用错误
    RESOURCE_ERROR: 'resource_error',
    // 跨域错误
    CROSS_SCRIPT_ERROR: 'cross_script_error',
    // Vue 错误
    VUE_ERROR: 'vue_error',
    // Promise 错误
    PROMISE_ERROR: 'promise_error',
    // 控制台错误 console.info
    CONSOLE_INFO: 'console_info',
    // 控制台错误 console_warn
    CONSOLE_WARN: 'console_warn',
    // 控制台错误 console_error
    CONSOLE_ERROR: 'console_error',
    // 未知异常
    UNKNOWN_ERROR: 'unknown_error',
    // 性能上报
    PERFORMANCE: 'performance',
    // 网速上报
    NETWORK_SPEED: 'network_speed',
}

/**
 * 错误level枚举
 */
export const ErrorLevelEnum = {
    // 错误信息
    ERROR: 'Error',
    // 警告信息
    WARN: 'Warning',
    // 日志信息
    INFO: 'Info',
}

export const LogEnvironmentEnum = {
    DEV: 'development',
    PRO: 'production',
}
