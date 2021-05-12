import utils from '../utils/utils';
import BaseMonitor from '../base/baseMonitor.js';
import { ErrorCategoryEnum, ErrorLevelEnum } from '../base/baseConfig.js';

/**
 * vue错误
 */
class VueError extends BaseMonitor {
    constructor(params) {
        super(params);
    }

    /**
     * 处理Vue错误提示
     */
    handleError (Vue) {
        if (!Vue) {
            return;
        }
        Vue.config.errorHandler = (error, vm, info) => {
            try {
                let reg = /\n(.*)\n/;
                reg.exec(error.stack);
                let metaData = {
                    message: error.message,
                    stack: RegExp.$1,
                    info: info
                };

                if (Object.prototype.toString.call(vm) === '[object Object]') {
                    metaData.componentPosition = utils.formatComponentInfo(vm);
                    metaData.propsData = vm.$options.propsData;
                }
                this.level = ErrorLevelEnum.WARN;
                this.msg = JSON.stringify(metaData);
                this.category = ErrorCategoryEnum.VUE_ERROR;
                this.recordError();
            } catch (error) {
                console.log('vue错误异常', error);
            }
        };
    }
}
export default VueError;
