module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'no-console': 'off',
        'no-extend-native': 'off',
        'no-underscore-dangle': 'off',
        'no-restricted-globals': 'off',
        'class-methods-use-this': 'off'
    }
}
