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
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
  </view>
</template>

<script>
  // 从 vuex 中按需导出方法
  import {mapState,mapMutations,mapGetters} from 'vuex'

  export default {
    computed:{
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      ...mapState('m_cart',['cart']),
      // 把 m_cart 模块中名称为 total 的 getter 映射到当前页面中使用
      ...mapGetters('m_cart',['total'])
    },
    watch:{
      // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
      total:{
        // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
        immediate:true,
        handler(newVal){
          // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
          const findResult=this.options.find((x)=>x.text==="购物车")
          if(findResult){
             // 3. 动态为购物车按钮的 info 属性赋值
            findResult.info=newVal
          }
        } 
      }
    },
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
            info: 0
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
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart',['addCart']),
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
      // 左侧按钮方法
      onClick (e) {
      	// console.log(e)
        if(e.content.text=="购物车"){
          uni.switchTab({
            url:'../../pages/cart/cart'
          })
        }
      },
      // 右侧按钮方法
      buttonClick (e) {
        // 1. 判断是否点击了 加入购物车 按钮
      	if(e.content.text=="加入购物车"){
      	  // 2. 组织一个商品的信息对象
          const goods={
            goods_id: this.goodsInfo.goods_id,       // 商品的Id
            goods_name: this.goodsInfo.goods_name,   // 商品的名称
            goods_price: this.goodsInfo.goods_price, // 商品的价格
            goods_count: 1,                           // 商品的数量
            goods_small_logo: this.goodsInfo.goods_small_logo, // 商品的图片
            goods_state: true                         // 商品的勾选状态
          }
          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addCart(goods)
      	}
      }
    },
    
    
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
