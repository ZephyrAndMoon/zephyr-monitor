import UAParser from 'ua-parser-js'

const DeviceInfo = (() => {
    const root = typeof self !== 'undefined' ? self : this
    const _window = root || {}

    const UALibrary = (() => {
        return {
            navigator: root.navigator,
            ...UAParser(root.navigator.userAgent || {}),
        }
    })()

    const MethodLibrary = (() => {
        return {
            // 获取浏览器
            getBrowser() {
                return UALibrary.browser
            },
            // 获取浏览器内核
            getEngine() {
                return UALibrary.engine
            },
            // 获取操作系统
            getOS() {
                return UALibrary.os
            },
            // 获取设备信息
            getDeviceInfo() {
                return this.getDeviceType() !== 'PC' ? UALibrary.device : null
            },
            // 获取匹配库
            getMatchMap(u) {
                return {
                    Mobile:
                        u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
                    Tablet: u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
                    iPad: u.indexOf('iPad') > -1,
                }
            },
            // 获取横竖屏状态
            getOrientationStatus() {
                let orientationStatus = ''
                const orientation = window.matchMedia('(orientation: portrait)')
                if (orientation.matches) {
                    orientationStatus = '竖屏'
                } else {
                    orientationStatus = '横屏'
                }
                return orientationStatus
            },
            // 获取设备类型
            getDeviceType() {
                const deviceType = ['Mobile', 'Tablet', 'iPad']
                const match = MethodLibrary.getMatchMap(UALibrary.navigator.userAgent || {})
                for (let i = 0; i < deviceType.length; i += 1) {
                    const value = deviceType[i]
                    if (match[value]) {
                        return value
                    }
                }
                return 'PC'
            },
            // 获取网络状态
            getNetwork() {
                const netWork =
                    navigator && navigator.connection && navigator.connection.effectiveType
                return netWork
            },
            // 获取当前语言
            getLanguage() {
                this.language = (() => {
                    const language =
                        UALibrary.navigator.browserLanguage || UALibrary.navigator.language
                    const arr = language.split('-')
                    if (arr[1]) {
                        arr[1] = arr[1].toUpperCase()
                    }
                    return arr.join('_')
                })()
                return this.language
            },
            // 生成浏览器指纹
            createFingerprint(domain) {
                function bin2hex(s) {
                    let i
                    let l
                    let n
                    let o = ''
                    const _s = s
                    for (i = 0, l = _s.length; i < l; i += 1) {
                        n = _s.charCodeAt(i).toString(16)
                        o += n.length < 2 ? `0${n}` : n
                    }
                    return o
                }
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const txt = domain || window.location.host
                ctx.textBaseline = 'top'
                ctx.font = "14px 'Arial'"
                ctx.textBaseline = 'tencent'
                ctx.fillStyle = '#f60'
                ctx.fillRect(125, 1, 62, 20)
                ctx.fillStyle = '#069'
                ctx.fillText(txt, 2, 15)
                ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
                ctx.fillText(txt, 4, 17)
                const b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
                const bin = atob(b64)
                const crc = bin2hex(bin.slice(-16, -12))
                const fingerprint = crc
                return fingerprint
            },
        }
    })()

    const LogicLibrary = (() => {
        return {
            DeviceInfoObj(params) {
                const _params = params || { domain: '' }
                // 建立匹配库，将部分信息绑定到 this 上
                const info = {
                    deviceType: MethodLibrary.getDeviceType(), // 设备类型
                    deviceInfo: MethodLibrary.getDeviceInfo(), // 设备信息
                    browserInfo: MethodLibrary.getBrowser(), // 浏览器信息
                    OS: MethodLibrary.getOS(), // 操作系统
                    screenWidth: _window.screen.width, // 屏幕宽
                    screenHeight: _window.screen.height, // 屏幕高
                    engineInfo: MethodLibrary.getEngine(), // 引擎信息
                    netWork: MethodLibrary.getNetwork(), // 联网类型
                    language: MethodLibrary.getLanguage(), // 当前使用的语言-国家
                    orientation: MethodLibrary.getOrientationStatus(), // 横竖屏
                    fingerprint: MethodLibrary.createFingerprint(_params.domain), // 浏览器指纹
                    userAgent: UALibrary.navigator.userAgent, // 包含 appCodeName,appName,appVersion,language,platform 等
                }
                if (!_params.info || _params.info.length === 0) {
                    return info
                }
                const infoTemp = {}
                Object.keys(info).forEach((i) => {
                    _params.info.forEach((item) => {
                        if (item.toLowerCase() === i.toLowerCase()) {
                            infoTemp[i] = info[i]
                        }
                    })
                })
                return infoTemp
            },
        }
    })()

    return {
        getDeviceInfo: LogicLibrary.DeviceInfoObj,
    }
})()

export default DeviceInfo
