<template>
  <view>
    <!-- 根据token值判断显示哪个组件 -->
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '../../mixins/tabbar-badge.js'
  import {mapState} from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins:[badgeMix],
    data() {
      return {
        
      };
    },
    computed:{
      // 获取登录的token值
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">

</style>
