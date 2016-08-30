/**
* @Author: lancui
* @Date:   2016-08-22 16:08:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-30 18:08:22
*/



module.exports = {
  'root': true,
  extends: 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": false
    }
  },
  'rules': {
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
    "object-shorthand": 1,
    "arrow-body-style": 1,
    "no-new": 0,
    "object-shorthand": 0,
    // "eol-last": 0,
    // "quotes": 0,
    // "strict": 0
  }
}
