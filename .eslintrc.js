/**
* @Author: lancui
* @Date:   2016-08-31 14:08:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-09-08 19:09:86
*/



module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    '$': true
  },
  // add your custom rules here
  'rules': {
    'eol-last': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "semi": 0,
    "comma-dangle": 0,
    "global-require": 0,
    "no-alert": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "max-len": 0,
    "func-names": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": 1,
    "object-shorthand": 0,
    "arrow-body-style": 1,
    "no-new": 0,
    "prefer-template": 0,
    "prefer-const": 1,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/require-extension": 0,
    "no-unused-expressions": 0,
    "no-irregular-whitespace": 0,
    "space-before-function-paren": 0,
    'no-extra-boolean-cast': 0,
    'no-eval': 0
  }
}
