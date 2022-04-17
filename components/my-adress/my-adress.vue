<template>
  <view>
    <!-- 选择收货地址按钮 -->
    <view class="address-choose" v-if="JSON.stringify(address)==='{}'">
      <button type="primary" size="mini" @click="chooseAdress">请选择收货地址+</button>  
    </view>
    <!-- 展示收货信息 -->
    <view class="adress-info" @click="chooseAdress" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="userName">收货人：<text>{{address.userName}}</text></view>
        </view>   
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="forward" size="20"></uni-icons>
        </view>  
      </view>
      <view class="row2">
        <view class="adress">收货地址：</view>
        <text>{{addStr}}</text>
        
      </view>
    </view>
    <!-- 底部彩色边框 -->
    <image src="@/static/cart_border@2x.png" class="border-color"></image>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-adress",
    data() {
      return {
        
      };
    },
    computed:{
      // 2.2 把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
       ...mapState('m_user',['address']),
       ...mapGetters('m_user',['addStr'])
    },
    methods:{
      // 选择收货地址
      async chooseAdress(){
         // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
         //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err,succ] = await uni.chooseAddress().catch(err=>err);
        // 2. 用户成功的选择了收货地址
        if(err===null && succ.errMsg==="chooseAddress:ok"){
          // 3.3 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
          this.saveAddress(succ)
        }
      },
      // 3.1 把 m_user 模块中的 updateAddress 函数映射到当前组件
      ...mapMutations('m_user',['saveAddress'])
    }
  }
</script>

<style lang="scss">
  // 底部边框线的样式
  .border-color{
    display: block;
    width: 100%;
    height: 5px;
  }
  // 选择收货地址的盒子
  .address-choose{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 渲染收货信息的盒子
  .adress-info{
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    padding: 0 5px;
    .row1{
      display: flex;
      justify-content: space-between;
      .row1-right{
        display: flex;
        align-items: center;
        .phone{
          margin-right: 5px;
        }
      }
    }
    .row2{
      display: flex;
      margin-top: 10px;
      .adress{
        white-space: nowrap;
      }
    }
  }
</style>
