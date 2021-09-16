const INIT_ERROR_RULES = [
    { filed: 'pageId', type: 'String', require: true },
    { filed: 'url', type: 'String', require: true },
    { filed: 'vue', type: 'Function' },
    { filed: 'error', type: 'Object' },
    { filed: 'extendsInfo', type: 'Object' },
    { filed: 'reportMethod', type: 'Object' },
]

const INIT_PERFORMANCE_RULES = [
    { filed: 'pageId', type: 'String', require: true },
    { filed: 'url', type: 'String', require: true },
    { filed: 'usePerf', type: 'Boolean' },
    { filed: 'useResource', type: 'Boolean' },
    { filed: 'reportMethod', type: 'Object' },
    { filed: 'useNetworkSpeed', type: 'Boolean' },
    { filed: 'usefulResourceType', type: 'Array' },
]

export { INIT_ERROR_RULES, INIT_PERFORMANCE_RULES }
