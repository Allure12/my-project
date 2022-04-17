<template>
  <view>
    <view class="cart-container" v-if="cart.length!=0">
      <!-- 使用收货地址组件 -->
      <view class="adress">
        <my-adress></my-adress>
      </view>
      <!-- 购物车商品列表区域 -->
      <view class="cart-list">
        <!-- 购物车商品列表标题-->
        <view class="cart-title">
          <uni-icons type="shop" size="20"></uni-icons>
          <text>购物车</text>
        </view>
        <!-- 购物车商品列表商品信息部分-->
        <!-- uni-swipe-action 是最外层滑动触发选项的容器 -->
        <uni-swipe-action>
          <view class="goods-list" v-for="(item,i) in cart" :key="i">
            <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
            <uni-swipe-action-item :right-options="options" @click="delGoods(item)">
              <!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
              <my-goods :goods="item" :showRadio="true" :showNum="true" @change="radioChangeHandler"
                @numChange="numChangeHandler"></my-goods>
            </uni-swipe-action-item>
          </view>
        </uni-swipe-action>
      </view>

      <!-- 商品结算组件 -->
      <view class="goods-settle">
        <my-settle></my-settle>
      </view>
    </view>

    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="@/static/cart_empty@2x.png" class="empty-img"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  //按需导入vuex中的mapState函数
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        //配置滑动right-options样式
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },

    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'delGoodsState']),
      //radio点击事件
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      //number-box点击事件
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 删除购物车中的商品
      delGoods(item) {
        this.delGoodsState(item)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  //购物车商品列表标题样式
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;

    .uni-icons {
      margin-right: 10px;
    }
  }
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    font-size: 12px;
    color: grey;
    .empty-img{
      width: 90px;
      height: 90px;
      margin-bottom: 15px;
    }
  }
</style>
