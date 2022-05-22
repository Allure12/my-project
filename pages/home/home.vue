<template>
  <view>
    <!-- 使用自定义搜索组件 -->
    <view class="search-box">
       <my-search @click="gotoSearch"></my-search>
    </view>   
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in picList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id">
           <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
     <!-- 分类导航 -->
     <view class="nav-list">
       <view  class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandle(item)">
         <image :src="item.image_src"></image>
       </view> 
     </view>
     <!-- 楼层区域 -->
     <view class="floor-list">
       <view class="floor-item" v-for="(item,i) in floorList" :key="i">
         <image :src="item.floor_title.image_src" class="floor-title"></image>
         <!-- 楼层图片区域 -->
         <view class="img-box">
           <navigator class="left-img-box" :url="item.product_list[0].url">
             <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
           </navigator>
           <view class="right-img-box" >
             <navigator class="product-list" v-for="(product,p) in item.product_list" :key='p' v-if="p!==0" :url="product.url">
               <image :src="product.image_src" mode="widthFix" :style="{width: product.image_width+'rpx'}"></image>
             </navigator>
           </view>
         </view>  
       </view>
     </view>
  </view>
</template>

<script>
 // 导入自己封装的 mixin 模块
 import badgeMix from '../../mixins/tabbar-badge.js'
 export default {
   // 将 badgeMix 混入到当前的页面中进行使用
   mixins:[badgeMix],
    data() {
      return {
        picList:[], //轮播图数据列表
        navList:[], //分类导航数据列表
        floorList:[], //楼层区域数据列表
      };
    },
    onLoad() {
      this.getPicList(),
      this.getNavList(),
      this.getFloorList()
    },
    methods:{
      //* 获取轮播图数据
      async getPicList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!=200){
          return uni.$showMsg()
        }
        this.picList=res.message
      },   
      //* 获取分类导航数据
      async getNavList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!=200){
          return uni.$showMsg()
        }
        this.navList=res.message
      },
      // 点击分类导航到tabBar页面
      navClickHandle(item){
        if(item.name=="分类"){
          uni.switchTab({
            url:"../cate/cate",
          })
        }  
      },
      
      //* 获取楼层区域数据
      async getFloorList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
        // console.log(res)
        if(res.meta.status!=200){
          return uni.$showMsg()
        }
        // 通过双层foreach循环,处理url地址
        res.message.forEach(floor=>{
          floor.product_list.forEach(product=>{
            product.url='/subpkg/goods_list/goods_list?'+product.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
      },
      // 搜索组件的点击事件
      gotoSearch(){
        uni.navigateTo({
          url:"../../subpkg/search/search?"
        })
      }    
    }
  }
</script>

<style lang="scss">
// search组件的吸顶效果
.search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
// 轮播图样式
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
// 分类导航样式
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
  .nav-item,image{
    width: 128rpx;
    height: 148rpx;
  }
}
//楼层区域样式
  .floor-title{
    width: 100%;
    height: 60rpx;
  }
  .img-box{
    display: flex;
    padding-left: 10rpx;
    .right-img-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
