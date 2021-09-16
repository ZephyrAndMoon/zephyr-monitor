import UA from 'ua-device'

const DeviceInfo = (() => {
    const root = typeof self !== 'undefined' ? self : this
    const _window = root || {}
    // 变量库
    const VariableLibrary = {
        navigator: typeof root.navigator !== 'undefined' ? root.navigator : {},
        // 信息map
        infoMap: {
            engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
            browser: [
                'Safari',
                'Chrome',
                'Edge',
                'IE',
                'Firefox',
                'Firefox Focus',
                'Chromium',
                'Opera',
                'Vivaldi',
                'Yandex',
                'Arora',
                'Lunascape',
                'QupZilla',
                'Coc Coc',
                'Kindle',
                'Iceweasel',
                'Konqueror',
                'Iceape',
                'SeaMonkey',
                'Epiphany',
                '360',
                '360SE',
                '360EE',
                'UC',
                'QQBrowser',
                'QQ',
                'Baidu',
                'Maxthon',
                'Sogou',
                'LBBROWSER',
                '2345Explorer',
                'TheWorld',
                'XiaoMi',
                'Quark',
                'Qiyu',
                'Wechat',
                'Taobao',
                'Alipay',
                'Weibo',
                'Douban',
                'Suning',
                'iQiYi',
            ],
            os: [
                'Windows',
                'Linux',
                'Mac OS',
                'Android',
                'Ubuntu',
                'FreeBSD',
                'Debian',
                'iOS',
                'Windows Phone',
                'BlackBerry',
                'MeeGo',
                'Symbian',
                'Chrome OS',
                'WebOS',
            ],
            device: ['Mobile', 'Tablet', 'iPad'],
        },
    }
    // 引入ua-device依赖
    const deviceType = VariableLibrary.navigator.userAgent || {} // 获取userAgent信息
    const deviceUaInfo = new UA(deviceType)
    // 方法库
    const MethodLibrary = (() => {
        return {
            // 获取匹配库
            getMatchMap(u) {
                return {
                    // 内核
                    Trident: u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
                    Presto: u.indexOf('Presto') > -1,
                    WebKit: u.indexOf('AppleWebKit') > -1,
                    Gecko: u.indexOf('Gecko') > -1,
                    // 浏览器
                    Safari: u.indexOf('Safari') > -1,
                    Chrome: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
                    IE: u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
                    Edge: u.indexOf('Edge') > -1,
                    Firefox: u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
                    'Firefox Focus': u.indexOf('Focus') > -1,
                    Chromium: u.indexOf('Chromium') > -1,
                    Opera: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
                    Vivaldi: u.indexOf('Vivaldi') > -1,
                    Yandex: u.indexOf('YaBrowser') > -1,
                    Arora: u.indexOf('Arora') > -1,
                    Lunascape: u.indexOf('Lunascape') > -1,
                    QupZilla: u.indexOf('QupZilla') > -1,
                    'Coc Coc': u.indexOf('coc_coc_browser') > -1,
                    Kindle: u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
                    Iceweasel: u.indexOf('Iceweasel') > -1,
                    Konqueror: u.indexOf('Konqueror') > -1,
                    Iceape: u.indexOf('Iceape') > -1,
                    SeaMonkey: u.indexOf('SeaMonkey') > -1,
                    Epiphany: u.indexOf('Epiphany') > -1,
                    360: u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
                    '360EE': u.indexOf('360EE') > -1,
                    '360SE': u.indexOf('360SE') > -1,
                    UC: u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
                    QQBrowser: u.indexOf('QQBrowser') > -1,
                    QQ: u.indexOf('QQ/') > -1,
                    Baidu: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
                    Maxthon: u.indexOf('Maxthon') > -1,
                    Sogou: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
                    LBBROWSER: u.indexOf('LBBROWSER') > -1,
                    '2345Explorer': u.indexOf('2345Explorer') > -1,
                    TheWorld: u.indexOf('TheWorld') > -1,
                    XiaoMi: u.indexOf('MiuiBrowser') > -1,
                    Quark: u.indexOf('Quark') > -1,
                    Qiyu: u.indexOf('Qiyu') > -1,
                    Wechat: u.indexOf('MicroMessenger') > -1,
                    Taobao: u.indexOf('AliApp(TB') > -1,
                    Alipay: u.indexOf('AliApp(AP') > -1,
                    Weibo: u.indexOf('Weibo') > -1,
                    Douban: u.indexOf('com.douban.frodo') > -1,
                    Suning: u.indexOf('SNEBUY-APP') > -1,
                    iQiYi: u.indexOf('IqiyiApp') > -1,
                    // 系统或平台
                    Windows: u.indexOf('Windows') > -1,
                    Linux: u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
                    'Mac OS': u.indexOf('Macintosh') > -1,
                    Android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
                    Ubuntu: u.indexOf('Ubuntu') > -1,
                    FreeBSD: u.indexOf('FreeBSD') > -1,
                    Debian: u.indexOf('Debian') > -1,
                    'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
                    BlackBerry: u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
                    MeeGo: u.indexOf('MeeGo') > -1,
                    Symbian: u.indexOf('Symbian') > -1,
                    iOS: u.indexOf('like Mac OS X') > -1,
                    'Chrome OS': u.indexOf('CrOS') > -1,
                    WebOS: u.indexOf('hpwOS') > -1,
                    // 设备
                    Mobile:
                        u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
                    Tablet: u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
                    iPad: u.indexOf('iPad') > -1,
                }
            },
            // 在信息map和匹配库中进行匹配
            matchInfoMap() {
                const _this = this
                const ua = VariableLibrary.navigator.userAgent || {}
                const match = MethodLibrary.getMatchMap(ua)
                Object.keys(VariableLibrary.infoMap).forEach((info) => {
                    for (let i = 0; i < VariableLibrary.infoMap[info].length; i += 1) {
                        const value = VariableLibrary.infoMap[info][i]
                        if (match[value]) {
                            _this[info] = value
                        }
                    }
                })

                return _this
            },
            // 获取当前操作系统
            getOS() {
                return this.os
            },
            // 获取操作系统版本
            getOSVersion() {
                const ua = VariableLibrary.navigator.userAgent || {}
                this.osVersion = ''
                // 系统版本信息
                const osVersion = {
                    Windows() {
                        const v = ua.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
                        const oldWindowsVersionMap = {
                            6.4: '10',
                            6.3: '8.1',
                            6.2: '8',
                            6.1: '7',
                            '6.0': 'Vista',
                            5.2: 'XP',
                            5.1: 'XP',
                            '5.0': '2000',
                        }
                        return oldWindowsVersionMap[v] || v
                    },
                    Android() {
                        return ua.replace(/^.*Android ([\d.]+);.*$/, '$1')
                    },
                    iOS() {
                        return ua.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
                    },
                    Debian() {
                        return ua.replace(/^.*Debian\/([\d.]+).*$/, '$1')
                    },
                    'Windows Phone': () => {
                        return ua.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
                    },
                    'Mac OS': () => {
                        return ua.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
                    },
                    WebOS() {
                        return ua.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
                    },
                }
                if (osVersion[this.os]) {
                    this.osVersion = osVersion[this.os]()
                    if (this.osVersion === ua) {
                        this.osVersion = ''
                    }
                }
                return this.osVersion
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
                return this.device || 'PC'
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
                        VariableLibrary.navigator.browserLanguage ||
                        VariableLibrary.navigator.language
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
            // 浏览器信息
            getBrowserInfo() {
                const _this = this

                const u = VariableLibrary.navigator.userAgent || {}

                const _mime = (option, value) => {
                    const { mimeTypes } = VariableLibrary.navigator
                    return Object.keys(mimeTypes).some((key) => mimeTypes[key][option] === value)
                }

                const match = MethodLibrary.getMatchMap(u)

                let is360 = false
                if (_window.chrome) {
                    const chromeVision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
                    if (chromeVision > 36 && _window.showModalDialog) {
                        is360 = true
                    } else if (chromeVision > 45) {
                        is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
                    }
                }
                if (match.Baidu && match.Opera) {
                    match.Baidu = false
                }
                if (match.Mobile) {
                    match.Mobile = !(u.indexOf('iPad') > -1)
                }
                if (is360) {
                    if (_mime('type', 'application/gameplugin')) {
                        match['360SE'] = true
                    } else if (
                        VariableLibrary.navigator &&
                        typeof VariableLibrary.navigator.connection.saveData === 'undefined'
                    ) {
                        match['360SE'] = true
                    } else {
                        match['360EE'] = true
                    }
                }
                if (match.IE || match.Edge) {
                    const navigatorTop = window.screenTop - window.screenY
                    switch (navigatorTop) {
                        case 71: // 无收藏栏,贴边
                            break
                        case 74: // 无收藏栏,非贴边
                            break
                        case 99: // 有收藏栏,贴边
                            break
                        case 102: // 有收藏栏,非贴边
                            match['360EE'] = true
                            break
                        case 75: // 无收藏栏,贴边
                            break
                        case 105: // 有收藏栏,贴边
                            break
                        case 104: // 有收藏栏,非贴边
                            match['360SE'] = true
                            break
                        default:
                            break
                    }
                }

                const browerVersionMap = {
                    Safari() {
                        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
                    },
                    Chrome() {
                        return u
                            .replace(/^.*Chrome\/([\d.]+).*$/, '$1')
                            .replace(/^.*CriOS\/([\d.]+).*$/, '$1')
                    },
                    IE() {
                        return u
                            .replace(/^.*MSIE ([\d.]+).*$/, '$1')
                            .replace(/^.*rv:([\d.]+).*$/, '$1')
                    },
                    Edge() {
                        return u.replace(/^.*Edge\/([\d.]+).*$/, '$1')
                    },
                    Firefox() {
                        return u
                            .replace(/^.*Firefox\/([\d.]+).*$/, '$1')
                            .replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
                    },
                    'Firefox Focus': () => {
                        return u.replace(/^.*Focus\/([\d.]+).*$/, '$1')
                    },
                    Chromium() {
                        return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
                    },
                    Opera() {
                        return u
                            .replace(/^.*Opera\/([\d.]+).*$/, '$1')
                            .replace(/^.*OPR\/([\d.]+).*$/, '$1')
                    },
                    Vivaldi() {
                        return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
                    },
                    Yandex() {
                        return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
                    },
                    Arora() {
                        return u.replace(/^.*Arora\/([\d.]+).*$/, '$1')
                    },
                    Lunascape() {
                        return u.replace(/^.*Lunascape[/\s]([\d.]+).*$/, '$1')
                    },
                    QupZilla() {
                        return u.replace(/^.*QupZilla[/\s]([\d.]+).*$/, '$1')
                    },
                    'Coc Coc': () => {
                        return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
                    },
                    Kindle() {
                        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
                    },
                    Iceweasel() {
                        return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
                    },
                    Konqueror() {
                        return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
                    },
                    Iceape() {
                        return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
                    },
                    SeaMonkey() {
                        return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
                    },
                    Epiphany() {
                        return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
                    },
                    360() {
                        return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
                    },
                    '360SE': () => {
                        const hash = {
                            63: '10.0',
                            55: '9.1',
                            45: '8.1',
                            42: '8.0',
                            31: '7.0',
                            21: '6.3',
                        }
                        const chromeVision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
                        return hash[chromeVision] || ''
                    },
                    '360EE': () => {
                        const hash = {
                            69: '11.0',
                            63: '9.5',
                            55: '9.0',
                            50: '8.7',
                            30: '7.5',
                        }
                        const chromeVision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
                        return hash[chromeVision] || ''
                    },
                    Maxthon() {
                        return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
                    },
                    QQBrowser() {
                        return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
                    },
                    QQ() {
                        return u.replace(/^.*QQ\/([\d.]+).*$/, '$1')
                    },
                    Baidu() {
                        return u.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, '$1')
                    },
                    UC() {
                        return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
                    },
                    Sogou() {
                        return u
                            .replace(/^.*SE ([\d.X]+).*$/, '$1')
                            .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
                    },
                    LBBROWSER() {
                        const hash = {
                            57: '6.5',
                            49: '6.0',
                            46: '5.9',
                            42: '5.3',
                            39: '5.2',
                            34: '5.0',
                            29: '4.5',
                            21: '4.0',
                        }
                        const chromeVision = navigator.userAgent.replace(
                            /^.*Chrome\/([\d]+).*$/,
                            '$1',
                        )
                        return hash[chromeVision] || ''
                    },
                    '2345Explorer': () => {
                        return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
                    },
                    TheWorld() {
                        return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
                    },
                    XiaoMi() {
                        return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
                    },
                    Quark() {
                        return u.replace(/^.*Quark\/([\d.]+).*$/, '$1')
                    },
                    Qiyu() {
                        return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
                    },
                    Wechat() {
                        return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
                    },
                    Taobao() {
                        return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
                    },
                    Alipay() {
                        return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
                    },
                    Weibo() {
                        return u.replace(/^.*weibo__([\d.]+).*$/, '$1')
                    },
                    Douban() {
                        return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
                    },
                    Suning() {
                        return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
                    },
                    iQiYi() {
                        return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
                    },
                }
                _this.browserVersion = ''
                if (browerVersionMap[_this.browser]) {
                    _this.browserVersion = browerVersionMap[_this.browser]()
                    if (_this.browserVersion === u) {
                        _this.browserVersion = ''
                    }
                }

                if (_this.browser === 'Edge') {
                    _this.engine = 'EdgeHTML'
                }
                if (_this.browser === 'Chrome' && parseInt(_this.browserVersion, 10) > 27) {
                    _this.engine = 'Blink'
                }
                if (_this.browser === 'Opera' && parseInt(_this.browserVersion, 10) > 12) {
                    _this.engine = 'Blink'
                }
                if (_this.browser === 'Yandex') {
                    _this.engine = 'Blink'
                }

                return `${_this.browser}（版本: ${_this.browserVersion}&nbsp;&nbsp;内核: ${_this.engine}）`
            },
        }
    })()
    // 逻辑层
    const LogicLibrary = (() => {
        return {
            DeviceInfoObj(params) {
                const _params = params || { domain: '' }
                // 建立匹配库，将部分信息绑定到 this 上
                MethodLibrary.matchInfoMap()
                const info = {
                    deviceType: MethodLibrary.getDeviceType(), // 设备类型
                    // browserInfo: MethodLibrary.getBrowserInfo(), // 浏览器信息
                    browserInfo: deviceUaInfo.browser, // 浏览器信息
                    // OS: MethodLibrary.getOS(), // 操作系统
                    // OSVersion: MethodLibrary.getOSVersion(), // 操作系统版本
                    deviceInfo: deviceUaInfo.device, // 设备信息
                    engineInfo: deviceUaInfo.engine, // 引擎信息
                    OSInfo: deviceUaInfo.os, // 操作系统信息
                    screenWidth: _window.screen.width, // 屏幕宽
                    screenHeight: _window.screen.height, // 屏幕高
                    netWork: MethodLibrary.getNetwork(), // 联网类型
                    orientation: MethodLibrary.getOrientationStatus(), // 横竖屏
                    language: MethodLibrary.getLanguage(), // 当前使用的语言-国家
                    fingerprint: MethodLibrary.createFingerprint(_params.domain), // 浏览器指纹
                    userAgent: VariableLibrary.navigator.userAgent, // 包含 appCodeName,appName,appVersion,language,platform 等
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
    // 对外暴露方法
    return {
        getDeviceInfo: LogicLibrary.DeviceInfoObj,
    }
})()

export default DeviceInfo
