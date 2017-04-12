# vue-mobile

> vue components for mobile

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit test
npm run unit
```

## usage

use Vue from CDN and global component register
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <vm-group :title="message">
      <vm-cell title="Github"></vm-cell>
    </vm-group>
  </div>

  <script src="http://cdn.bootcss.com/vue/2.2.6/vue.min.js"></script>
  <script src="path_to_your_lib/vue-mobile/dist/components/common.js"></script>
  <script src="path_to_your_lib/vue-mobile/dist/components/Group.js"></script>
  <script src="path_to_your_lib/vue-mobile/dist/components/Cell.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
  </script>
</body>
</html>
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
