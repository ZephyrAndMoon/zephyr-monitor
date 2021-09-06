/**
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = (fmt) => {
    let _fmt = fmt
    const o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
        'H+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
    }
    const week = {
        0: '/u65e5',
        1: '/u4e00',
        2: '/u4e8c',
        3: '/u4e09',
        4: '/u56db',
        5: '/u4e94',
        6: '/u516d',
    }
    if (/(y+)/.test(_fmt)) {
        _fmt = _fmt.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(_fmt)) {
        const judgeLengthMoreThan2 = RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468'
        const judgeLengthMoreThan1 = RegExp.$1.length > 1 ? judgeLengthMoreThan2 : ''
        _fmt = _fmt.replace(RegExp.$1, judgeLengthMoreThan1 + week[`${this.getDay()}`])
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(_fmt)) {
            _fmt = _fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
            )
        }
    })
    return _fmt
}

Error.prepareStackTrace = (error, structuredStackTrace) => {
    return structuredStackTrace.map((item) => ({
        FILE_NAME: item.getFileName(),
        FUNC_NAME: item.getFunctionName(),
        COLUMN_NUMBER: item.getColumnNumber(),
        LINE_NUMBER: item.getLineNumber(),
    }))
}
