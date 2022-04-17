<!-- 购物车结算组件 -->
<template>
  <view>
    <view class="settle">
      <!-- 是否全选 -->
      <label class="radio" @click="changeAllState">
        <radio :checked="checkedRadio" color="#c00000" /><text>全选</text>
      </label>
      <!-- 合计金额 -->
      <view class="total">
        <view>合计:</view>
        <view class="price">￥{{checkedGoodsAmount}}</view>
      </view>
      <!-- 结算按钮 -->
      <view class="js">
        <text>结算({{checkedCount}})</text>
      </view>
      
    </view>
  </view>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      // 判断全选是否需要勾选
      checkedRadio(){
        return this.checkedCount === this.total
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      // label 的点击事件处理函数,全选/反选功能
      changeAllState(){
        this.updateAllGoodsState(!this.checkedRadio)
      }
    }
  }
</script>

<style lang="scss">
  .settle{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    .radio{
      font-size: 14px;
    }
    .total{
      display: flex;
      font-size: 14px;
      .price{
        color: #c00000;
      }
    }
    .js{
      min-width: 100px;
      height: 100%;
      background-color: #c00000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 14px;
    }
  }
</style>
