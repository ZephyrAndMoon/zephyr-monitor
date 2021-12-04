import { checkUrl } from './util'

const INIT_ERROR_RULES = [
    {
        filed: 'url',
        type: 'String',
        require: true,
        validator: { fn: checkUrl, message: '不是有效的 url 路径' },
    },
    { filed: 'vue', type: 'Function' },
    { filed: 'error', type: 'Object' },
    { filed: 'extendsInfo', type: 'Object' },
    { filed: 'reportMethod', type: 'Object' },
]

const INIT_PERFORMANCE_RULES = [
    { filed: 'url', type: 'String', require: true },
    { filed: 'usePerf', type: 'Boolean' },
    { filed: 'useResource', type: 'Boolean' },
    { filed: 'reportMethod', type: 'Object' },
    { filed: 'useNetworkSpeed', type: 'Boolean' },
    { filed: 'usefulResourceType', type: 'Array' },
    { filed: 'timeInterval', type: 'Number' },
]

export { INIT_ERROR_RULES, INIT_PERFORMANCE_RULES }
