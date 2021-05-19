### 1.简介
front-error-monitor 是一款基于 monitorjs_horse 前端监控工具，包含下面几个方面信息监控：
* 前端异常监控
* 页面性能监控
* 设备信息采集



### 2.异常捕获详情
* js错误信息监控；
* 支持vue错误信息监控（需要将vue传入，并设置vueError:true）；
* 支持promise中未捕获异常信息的抓取；
* 支持console.error错误信息捕获;
* 支持资源错误信息捕获。



### 3.页面性能监控
* 重定向的时间；

* DNS 查询时间；

* DNS 缓存时间；

* 卸载页面的时间；

* tcp连接耗时；

* 内容加载完成的时间；

* 解析dom树耗时；

* 白屏时间；

* 页面加载完成的时间；

* ...

  

### 4.设备信息采集
* 设备类型；
* 操作系统；
* 操作系统版本；
* 屏幕高、屏幕宽；
* 当前使用的语言-国家；
* 联网类型；
* 横竖屏；
* 浏览器信息；
* 浏览器指纹；
* userAgent；
* ...

### 5.引入方式
1. 支持es6方式引入

   ```javascript
   import { ErrorMonitor } from "front-error-monitor";
   ```

2. 支持commonjs方式引入

   ```javascript
   const ErrorMonitor = require("front-error-monitor");
   ```

3. 支持AMD方式引入

   ```javascript
   define(['front-error-monitor'],(ErrorMonitor)=>{});
   ```

4. 支持\<script\>标签引入方式

   ```HTML
   <script src="../node_modules/front-error-monitor/dist/vueError.min.js"></script>
   ```

   

### 6.异常监控



#### 用法

```javascript
new ErrorMonitor().init({
    url:"", //错误上报地址
    consoleError:true, //配置是否需要记录console.error错误信息
    vueError:true, //配置是否需要记录vue错误信息
    vue:Vue, //如需监控vue错误信息，则需要传入vue
    extendsInfo:{ //自定义扩展信息，一般用于数据持久化区分
        a:"", //自定义信息a（名称可自定义）可参考测试栗子 module
        b:"", //自定义信息b（名称可自定义）
        getDynamic:()=>{  //获取动态传参  1.4.5版本及以后支持该方式
            
        }
    }
});
```



#### 参数说明

- `url` ：错误上报地址

- `jsError` ：配置是否需要监控js错误 （默认true）

- `promiseError` ：配置是否需要监控promise错误 （默认true）

- `resourceError` ：配置是否需要监控资源错误 （默认true）

- `consoleError `：配置是否需要监控console.error错误 （默认false）

- `vueError` ：配置是否需要记录vue错误信息 （默认false）

- `vue` ： 如需监控vue错误信息，则需要传入vue

- `extendsInfo `：自定义扩展信息，一般用于数据持久化区分

  ```javascript
  { 
      a:"", //自定义信息a（名称可自定义）可参考测试栗子 module
      b:"", //自定义信息b（名称可自定义）
      getDynamic:()=>{  }//获取动态传参  1.4.5版本及以后支持该方式
  }
  ```

  

#### 响应（持久化数据）说明：

- `category `："js_error" 错误类型（枚举）

  `js_error | resource_error | vue_error| promise_error | console_info | console_warn | console_error | unknow_error`

- `logType`："Info" 日志类型（枚举）

  `Error | Warning | Info`

- `logInfo`：记录的信息

- `deviceInfo`：设备信息（JSON字符串）

- `extendsInfo`：自定义扩展信息，一般用于数据持久化区分





### 7.报页面性能Usage



#### 使用

```javascript
new ErrorMonitor().monitorPerformance({
    pageId:"page_0001",  //页面唯一标示
    url:"",  //信息采集上报地址
    extendsInfo:{   //扩展信息，一般用于数据数据持久化区分
        module:"项目",
        filterOne: "page_0001",
        getDynamic:()=>{
            return {
                filterTow:()=>{},
            };
        }
    }
});
```



#### 参数说明

- `pageId`：页面唯一标示
- `url`：信息采集上报地址



#### 响应（持久化数据）说明

```javascript
{
    time: 1565161213722, //上报时间
    deviceInfo: "", //设备信息
    markUser: "",  //用户标示
    markUv: "",  //uv采集
    pageId: "", //页面唯一标示
    performance: {
        analysisTime: 1825, //解析dom树耗时
        appcacheTime: 0,  //DNS 缓存时间
        blankTime: 8, //白屏时间
        dnsTime: 0, //DNS 查询时间
        domReadyTime: 53, //domReadyTime
        loadPage: 1878, //页面加载完成的时间
        redirectTime: 0, //重定向时间
        reqTime: 8, //请求时间
        tcpTime: 0, //tcp连接耗时
        ttfbTime: 1, //读取页面第一个字节的时间
        unloadTime: 0, //卸载页面的时间
    },
    resourceList: [
        {
            dnsTime: 1562.2399999992922, //dns查询耗时
            initiatorType: "img", //发起资源类型
            name: "https://pic.xiaohuochai.site/blog/chromePerformance1.png", //请求资源路径
            nextHopProtocol: "http/1.1", //http协议版本
            redirectTime: 0, //重定向时间
            reqTime: 1.1899999808520079, //请求时间
            tcpTime: 33.76000002026558, //tcp链接耗时
        }
    ],
}
```
