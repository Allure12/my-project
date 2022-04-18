<!-- 用户信息组件 -->
<template>
  <view class="my-userinfo-container">
    <!-- 用户头像和名称 -->
    <view class="user-info">
      <image :src="userInfo.avatarUrl" class="logo"></image>
      <text>{{userInfo.nickName}}</text> 
    </view>
    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第二行店铺商品信息 -->
      <view class="goods-info">
        <view class="goods-item">
          <text>8</text>
          <text>收藏的店铺</text>
        </view>
        <view class="goods-item">
          <text>14</text>
          <text>收藏的商品</text>
        </view>
        <view class="goods-item">
          <text>1</text>
          <text>关注的商品</text>
        </view>
        <view class="goods-item">
          <text>84</text>
          <text>足迹</text>
        </view>
      </view>
      <!-- 第三行我的订单 -->
      <view class="order-info">
        <view class="order-title">我的订单 </view>
        <view class="order-container">
          <view class="order-item">
              <image src="../../static/my-icons/icon1.png" class="img"></image>
              <text>待付款</text>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon2.png" class="img"></image>
              <text>待收货</text>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon3.png" class="img"></image>
              <text>退款/退货</text>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon4.png" class="img"></image>
              <text>全部订单</text>
            </view>
          </view>
        </view>
       
      <!-- 最后一行基本操作 -->
      <view class="config-info">
        <view class="config-item">
          <text>收货地址</text>
          <uni-icons type="forward" size="18"></uni-icons>
        </view>
        <view class="config-item">
          <text>联系客服</text>
          <uni-icons type="forward" size="18"></uni-icons>
        </view>
        <view class="config-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="forward" size="18"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-userInfo",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['userInfo'])
    },
    methods:{
      ...mapMutations('m_user',['saveUserInfo','saveToken']),
      // 退出登录方法
      // 第一种写法
    /*  async logout(){
        const [err,res]=await uni.showModal({
          title:"提示",
          content:'是否退出系统'
        }).catch(err=>err)
        if(res&&res.confirm){
          this.saveUserInfo({})
          this.saveToken('')
        }
      } */
      // 第二种写法
      logout(){
        uni.showModal({
         title:"提示",
         content:'是否退出系统',
         success: (succ) => {
           if(succ.confirm){
             this.saveUserInfo({})
             this.saveToken('')
           }else if(succ.cancel){
             return
           }
           
         },
         fail: (err) => err
        })
      }
    }
  }
</script>

<style lang="scss">
.my-userinfo-container{
  // 设置底色
  background-color: #f4f4f4;
  // 用户信息样式
  .user-info{
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 16px;
    .logo{
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 2px 2px 5px black;
      margin-bottom: 10px;
    }
  }
  // 面板样式
  .panel-list{
    position: relative;
    top:-10px;
    padding: 0 10px;
    // 第一层面板
    .goods-info{
      display: flex;
      justify-content: space-around;
      background-color: white;
      border-radius: 5px;
      padding: 10px 0;
      font-size: 14px;
      .goods-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    // 第二层面板
    .order-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      margin-top: 5px;
      border-radius: 5px;
      .order-title{
        font-size: 15px;
        line-height: 45px;
        padding-left: 10px;
        border-bottom: 1px solid #f4f4f4;
      }
      .order-container{
        display: flex;
        justify-content: space-around;
        font-size: 13px; 
        padding: 10px 0;
        .order-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    // 第三个面板
    .config-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      margin-top: 5px;
      border-radius: 5px;
      .config-item{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #f4f4f4;
        font-size: 14px;
      }
    }
  }
  
}
</style>
