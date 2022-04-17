<!-- 封装goods-list中的item项 -->
<template>
  <view>
    <view class="goods-item">
      <!-- 左侧图片区域 -->
      <view class="goods-item-left">
        <!-- 添加最前面的勾选框，使用radio组件 -->
        <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="updateCheck"/>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-img"></image>
      </view>
      <!-- 右侧商品介绍区域 -->
      <view class="goods-item-right">
        <view class="goods-title">{{goods.goods_name}}</view>
        <view class="goods-num">
          <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
          <!-- 添加商品数量选择框，使用uni-number-box组件 -->
          <uni-number-box :min="1" :value="goods.goods_count" background="#efefef" v-if="showNum" @change="numCheck"></uni-number-box>
        </view>
        
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
      },
      // 控制radio组件的显示或隐藏
      showRadio:{
        type:Boolean,
        default:false
      },
      // 控制uni-number-bo组件的显示或隐藏
      showNum:{
        type:Boolean,
        default:false
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
    },
    methods:{
      // radio 组件的点击事件处理函数
      updateCheck(){
        this.$emit('change',{
          goods_id:this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state:!this.goods.goods_state
        })
      },
      // number-box的change事件函数
      numCheck(val){  //val获取最新的数值
        this.$emit('numChange',{
          goods_id:this.goods.goods_id,
          goods_count:+val  
        })
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8px;
      .goods-img{
        width: 200rpx;
        height: 200rpx;
      }
    }
    .goods-item-right{
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: space-between;
      font-size: 13px;
      .goods-num{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goods-price{
          font-size: 16px;
          color: #c00000;
        }
      }
      
    }
  }
</style>
