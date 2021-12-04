import { LogEnvironmentEnum } from './baseConfig'

class Logger {
    constructor(env) {
        if (!Logger.instance) {
            Logger.env = env //  production or development
            Logger.instance = this
        }
        return Logger.instance
    }

    static log(type, ...info) {
        if (Logger.env !== LogEnvironmentEnum.PRO) {
            const prefix = {
                info: '[ZephyrMonitor Info]',
                error: '[ZephyrMonitor Error]',
                warn: '[ZephyrMonitor Warning]',
            }
            console[type](prefix[type] || '[ZephyrMonitor Info]', ...info)
        }
    }
}

// 初始化日志打印类
export const initLogger = (env) => new Logger(env)

// 对外暴露日志方法
export const log = (() => Logger.log)()
