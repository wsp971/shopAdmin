// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/strongly-recommended', 'airbnb-base'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  globals: {
    document: true,
    window: true,
    // 异步引入
    import: true,
    qq: true
  },
  rules: {
    'no-restricted-globals': ['error', 'event', 'error'],
    'no-use-before-define': ['off'],
    indent: ['error', 2],
    'prefer-destructuring': ['off'],
    // 强制要求在代码的行末加上分号结束
    semi: ['error', 'always'],
    // 关闭代码单行长度限制，没什么作用
    'max-len': [
      'error',
      {
        tabWidth: 2,
        code: 160,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        comments: 1000
      }
    ],
    'no-restricted-syntax': 0,
    // don't require .vue extension when importing
    'import/extensions': ['off'],
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['off'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: false,
      }
    ],
    'no-console': 'off',
    'comma-dangle': ['off', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': ['off', { allowAfterThis: true }],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'one-var': ['off', 'consecutive'],
    'no-continue': ['warn'],
    'no-plusplus': ['off'],
    'import/prefer-default-export': ['off'],
    'linebreak-style': ['error', 'unix'],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          // ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          // ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: false
      }
    ],
    'vue/require-v-for-key': ['warn'],
    // 'quote-props': ['error', 'as-needed'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    "vue/html-end-tags": ['off'],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    // vue 文件中 html 节点的属性必须用双引号
    'vue/html-quotes': ['error'],
    // 不允许 vue 文件中的 html 属性等号的两边有空格
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'import/no-duplicates': ['off'],
    'import/order': ['off'],
    'import/no-self-import': ['off'],
    'import/no-cycle': ['off'],
    'import/no-named-as-default': ['off'],
    'import/named': ['off'],
    'import/no-named-as-default-member': ['off'],
    'import/no-useless-path-segments': ['off']
  }
};
