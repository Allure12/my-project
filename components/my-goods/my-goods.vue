<!-- 封装goods-list中的item项 -->
<template>
  <view>
    <view class="goods-item">
      <!-- 左侧图片区域 -->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || defaultPic" class="goods-img"></image>
      </view>
      <!-- 右侧商品介绍区域 -->
      <view class="goods-item-right">
        <view class="goods-title">{{goods.goods_name}}</view>
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
  // 定义 props 属性，用来接收外界传递到当前组件的数据
    props:{
      // 商品的信息对象
      goods:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
   
    //给商品金额设置过滤器,保存四舍五入两位小数
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;
    .goods-item-left{
      padding-right: 8px;
      .goods-img{
        width: 200rpx;
        height: 200rpx;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      .goods-price{
        color: #c00000;
      }
    }
  }
</style>
