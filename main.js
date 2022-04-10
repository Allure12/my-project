// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入网络请求的包
import {
  $http
} from "@escook/request-miniprogram"

uni.$http = $http

// 设置请求跟路径
$http.baseUrl = "https://www.uinav.com"

// 请求开始之前
$http.beforeRequest = function(options) {
  // 加载效果
  uni.showLoading({
    title: "加载中"
  })
}
// 请求之后
$http.afterRequest = function(options) {
  // 关闭加载效果
  uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = "请求失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
