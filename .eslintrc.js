module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'no-extend-native': 'off',
        'no-underscore-dangle': 'off',
        'no-restricted-globals': 'off',
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
}
