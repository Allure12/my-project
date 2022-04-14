<template>
  <!-- v-if:优化刷新页面闪烁的问题 -->
  <view v-if="goodsInfo.goods_name" class="goods-detail">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" class="swiper-item" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格-->
      <view class="goods-info-price">￥{{goodsInfo.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <view class="goods-info-name">{{goodsInfo.goods_name}}</view>
        <view class="collect">
          <uni-icons type="star" size="26" color="grey"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 快递区域 -->
      <view class="tip">快递：免运费</view>
    </view>
    <!-- 商品详情区域 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航区域 -->
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: [], //存放商品详情数据
        goodsId: '', //存放传进来的参数goods_id
        //底部商品导航
        //通过 options 和 buttonGroup 两个数组，来声明商品导航组件的按钮配置对象
        options: [
          {
            icon: 'shop',
            text: '店铺',
            infoBackgroundColor: '#007aff',
            infoColor: "red"
          },
          {
         		icon: 'cart',
            text: '购物车',
            info: 2
          }
        ],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      // 将参数传进来
      this.goodsId = options.goods_id
      // const goods_id=options.goods_id
      this.getGoodsInfo()
    },
    methods: {
      //* 获取商品详情数据
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: this.goodsId
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决s商品详情图片底部空白间隙的问题
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, "<img style='display:block'")
          .replace(/webp/g, "jpg")

        this.goodsInfo = res.message
      },

      // 点击轮播图预览图片方法
      preview(i) {
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: i,
          // 所有图片 url 地址的数组
          // map方法:遍历pics，将pics中的pics_big存入新数组中
          urls: this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      
      //* 底部商品导航按钮方法
      onClick (e) {
      	console.log(e)
        if(e.content.text=="购物车"){
          uni.switchTab({
            url:'../../pages/cart/cart'
          })
        }
      },
      buttonClick (e) {
      	    console.log(e)
      	    this.options[2].info++
      	  }
    } 
  }
</script>

<style lang="scss">
  // 轮播图样式 
  swiper {
    height: 750rpx;

    .swiper-item {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域样式
  .goods-info-box {
    padding: 16px 8px;
    background-color: #FFFFFF;

    .goods-info-price {
      color: #c00000;
      font-size: 18px;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .goods-info-name {
        padding-right: 8px;
        border-right: 1px solid #efefef;
        font-size: 14px;
      }
      .collect {
        width: 300rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: grey;
      }
    }
    .tip {
      font-size: 12px;
      color: grey;
    }
  }
  
  // 底部商品导航栏固定样式
  .uni-goods-nav{
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .rich-text {
    padding-bottom: 50px;
  }
</style>
