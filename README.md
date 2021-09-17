<h1 align="center">欢迎使用 ZephyrMonitor 👋🏼</h1> 

前端监控工具，对于前端线上产生的 **错误（JavaScript、Promise、Resource、Vue）** 进行收集上报，支持自定义 **console** 输出信息上报，支持跨域 **Javascript** 文件错误信息定位；监控 **首屏性能** 以及 **页面资源** 的加载状态，计算其多个 **关键性能节点**数据提供于页面性能优化参考；在这些基础上提供项目运行的 **设备信息**，例如：*机型、网络环境、浏览器信息、分辨率* 等信息；支持自定义间隔时间上报当前页面的 **网速情况**。

> 可以将错误信息上报到服务端，对其中的堆栈信息进行 `sourcemap` 的解析来定位原文件中的报错位置，便于解决项目中的错误。
>
> 具体使用例子请见：[zephyr-monitor-use-demo](https://github.com/ZephyrAndMoon/zephyr-monitor-use-demo)

<br />

## ⚙️ 安装或构建

### npm

```
npm install zephyr-monitor
```

### 构建

```shell
git clone git@github.com:ZephyrAndMoon/zephyr-monitor.git

npm install / cnpm install / yarn install

npm run build
# 打包文件会输出为 dist/ZephyrMonitor.min.js 
```

<br />

## 🔗 引入

```html
<!-- <script> 标签引入 -->
<script src="ZephyrMonitor.min.js"></script>
```

```javascript
// ES module
import ZephyrMonitor from "zephyr-monitor";

// CommonJS
const ZephyrMonitor = require("zephyr-monitor");
```

<br />

## 📖 使用

```javascript
// 错误监控初始化代码
ZephyrMonitor.initError({
    pageId:"",  // 页面标示
    url:"", // 上报地址
});


// 页面性能监控初始化代码
ZephyrMonitor.initPerformance({
    pageId:"",  // 页面标示
    url:"",  // 上报地址
    useNetworkSpeed:true, // 是否定时间隔上报网速情况 默认为false
});
```

<br />

## 💡 方法参数

### ZephyrMonitor.initError

- **pageId**

  类型：`String`（必须）

  介绍：页面标识

- **url**

  类型：`String`（必须）

  介绍：错误上报地址

- **reportMethod**

  类型：`Object`

  介绍：信息上报方式，默认使用 XHR 上传 （如果传入子参数多于一个的话，默认顺序 Img - Fetch - Beacon - XHR）

  - `reportMethod.useImg: Boolean`  默认 `false`，使用 Img 标签上传
  - `reportMethod.useFetch: Boolean`  默认 `false`，使用 Fetch 方法上传
  - `reportMethod.useBeacon: Boolean`  默认 `false`，使用 beacon 方法上传

- **error**

  类型：`Object`

  介绍：捕获的错误类型对象，默认捕获  JavaScript 类型、资源类型、Promise 类型错误

  - `error.vue: Boolean`  默认 `false`，捕获 Vue 类型错误
  - `error.console: Boolean`  默认 `false`，捕获打印输出类型错误

  - `error.js: Boolean`  默认 `true`，捕获 Javascript 类型错误
  - `error.resource: true`  默认 `true`，捕获资源加载类型错误
  - `error.promise: Boolean`  默认 `true`，捕获 Promise 类型错误

- **vue**

  类型：`Vue`

  介绍：开启 Vue 类型错误捕获时需要传入 Vue 实例

- **extendsInfo**

  类型：`String`

  介绍：额外需要传入的自定义扩展信息



### ZephyrMonitor.initPerformance

- **pageId**

  类型：`String`（必须）

  介绍：页面标识

- **url**

  类型：`String`（必须）

  介绍：错误上报地址

- **useCrossorigin**

  类型：`Boolean`

  介绍：是否开启远程 JavaScript 文件中报错的错误信息定位

- **usePerf**

  类型：`Boolean`（必须）

  介绍：是否启用页面性能监控，默认 `true`

- **useResource**

  类型：`Boolean`（必须）

  介绍：是否启用资源加载监控，默认 `true`

- **usefulResourceType**

  类型：`Object`

  介绍：监控加载的资源类型，默认为 `script/css/fetch/xmlhttprequest/link/img`，配置子参数以后清空默认类型以配置项为准

  - `usefulResourceType.useRScript: Boolean`  默认 `false`，监控 script 标签类型资源加载情况
  - `usefulResourceType.useRCSS: Boolean`  默认 `false`，监控 css 标签类型资源加载情况
  - `usefulResourceType.useRLink: Boolean`  默认 `false`，监控 link 标签类型资源加载情况
  - `usefulResourceType.useRImg: Boolean`  默认 `false`，监控 img 标签类型资源加载情况
  - `usefulResourceType.useRFetch: Boolean`  默认 `false`，监控 Fetch 获取的资源加载情况
  - `usefulResourceType.useRXHR: Boolean`  默认 `false`，监控 XHR 获取的资源加载情况

- **reportMethod**

  类型：`Object`

  介绍：与 `FrontEndMonitor.initError` 中此参数相同

- **useNetworkSpeed**

  类型：`Boolean`

  介绍：是否开启定时网速信息上报，默认 `false`，间隔时间默认为 `60s`

- **timeInterval**

  类型：`Number`

  介绍：定时上报网速信息的间隔时长


<br />

## 🔎 上报信息参数

### 错误信息对象

```javascript
{
    pageId: String,        // 页面标识
    time: String,          // 报错时间
    category: String,      // 错误类型
    logType: String,       // 信息类别
    logInfo: {				    
        url: String,       // 报错地址
        stack: String,     // 错误堆栈（未解析）
        errorInfo: String, // 报错信息
        otherInfo: Object  // 其他信息
    },
    deviceInfo: Object,    // 设备信息，详情见下方"设备信息对象"描述
    extendsInfo: Object    // 自定义扩展信息
}
```

### 页面性能信息对象

```javascript
{
    pageId: String,                   // 页面标识
    time: String,                     // 报错时间
    markUser: String,                 // 用户标识
    markUv: String,                   // Unique Visitor
    deviceInfo: Object,               // 设备信息，详情见下方"设备信息对象"描述
    performance: {
        analysisTime: String,         // 解析 dom 树耗时
        blankTime: String,            // 白屏时间
        dnsCacheTime: String,         // DNS 缓存时间
        dnsTime: String,              // DNS 查询时间
        domReadyTime: String,         // dom 加载完成时间
        firstInteractTime: String,    // 首次可交互时间
        loadPageTime: String,         // 页面加载完成的时间
        redirectTime: String,         // 重定向的时间
        resTime: String,              // 数据传输时间
        tcpTime: String,              // tcp 连接耗时
        ttfbTime: String,             // First Byte 时间
        unloadTime: String,           // 卸载页面的时间
    },
    resource:[
        {
            dnsTime: String,          // dns 查询耗时
            initiatorType: String,    // 发起资源类型
            name: String,             // 请求资源路径/资源名
            nextHopProtocol: String,  // http 协议版本
            redirectTime: String,     // 重定向时间
            reqTotalTime: String,     // 请求响应总时间
            responseTime: String,     // 接收响应的时间
            tcpTime: String,          // tcp 连接耗时
            ttfbTime: String,         // First Byte 时间
        }
   ]
}
```


### 网速信息对象

```javascript
{
  pageId: String,        // 页面标识
  time: String,          // 记录时间
  category: String,      // 日志类型
  logType: String,       // 信息类别
  networkSpeed: Object,  // 网速
  deviceInfo: Object,    // 设备信息，详情见下方"设备信息对象"描述
  extendsInfo: Object    // 自定义扩展信息
}
```

### 设备信息对象

```javascript
{
    deviceType: String,        // 设备类型
    browserInfo: {
        name: String,          // 浏览器名称
        version: String,       // 浏览器版本
    },
    engineInfo: {
        name: String,          // 内核名称
        version: String,       // 内核版本
    },
    deviceInfo: {
        identified: Boolean,   // 设备信息识别状态
        manufacturer: String,  // 设备制造产商
        model: String,         // 设备模型
        type: String,          // 设备类别
    },
    OSInfo:{
        name: String,          // 操作系统名称
        version: String,       // 操作系统版本
    },
    fingerprint: String,       // 浏览器指纹
    language: String,          // 当前使用语言
    netWork: String,           // 网络状态
    orientation: String,       // 横竖屏状态
    screenHeight: Number,      // 设备高度
    screenWidth: Number,       // 设备宽度
    userAgent: String          // 设备 UA 信息
}
```


