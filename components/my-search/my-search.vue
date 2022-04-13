<template>
  <view class="my-search-container" :style="{'background-color': bgColor}" @click="searchHandle">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="search-title">搜索商品</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props:{
    //   定义bgColor和radius两个属性,动态指定 背景颜色 和 圆角尺寸
      bgColor:{
        type:String,
        default:'#c00000'
      },
      radius:{
        type:Number,
        default:15
      }
    },
    methods:{
      searchHandle(){
        this.$emit('click') //调用tabBar页面的组件事件
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  display: flex;
  align-items: center;
  // background-color: #c00000;
  padding: 0 10px;
  .my-search-box{
    width: 100%;
    height: 36px;
    background-color: #FFFFFF;
    text-align: center;
    line-height: 36px;
    // border-radius: 15px;
    .search-title{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
