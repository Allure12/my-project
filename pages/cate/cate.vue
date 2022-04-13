<template>
  <view>
    <!-- 使用自定义搜索组件 -->
    <!-- <my-search :bgColor="'#000000'" :radius="10"></my-search> -->
    <my-search @click="gotoSearch"></my-search>
    
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}" >
        <block v-for="(item,i) in scrollList" :key="i">
           <view :class="['left-scroll-view-item',i===active? 'active':'']" @click="cateClickHandle(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view v-for="(item2,i2) in scrollLevel2" :key="i2">
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="getGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
        
       
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0, //当前设备可用高度
        scrollList: [], //商品分类列表
        active:0, //激活项索引
        scrollLevel2:[], //二级分类列表
        scrollLevel3:[], //三级分类列表
        scrollTop:0  //滚轮优化

      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值,需要减去搜索组件的高度
      this.wh = sysInfo.windowHeight-50
      this.getScrollList()
    },
    methods:{
      // * 获取商品分类数据
      async getScrollList(){
        const {data:res}=await uni.$http.get('/api/public/v1/categories')
        // console.log(res)
        if(res.meta.status!=200) return uni.$showMsg()
        this.scrollList=res.message
        this.scrollLevel2=res.message[0].children  //二级分类初始化
        this.scrollLevel3=res.message[0].children
      },
      // 一级目录点击事件
      cateClickHandle(i){
        this.active=i
        // 重新为二级分类赋值
        this.scrollLevel2=this.scrollList[i].children
        this.scrollTop=this.scrollTop===0? 1:0  //优化滚动
      },
      //三级目录点击跳转页面
      getGoodsList(item3){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?cid="+item3.cat_id
        })
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
  .scroll-view-container {
    display: flex;
    // 左侧分类样式
    .left-scroll-view {
      width: 120px;
      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;
        &.active{
          background-color: #FFFFFF;
          position: relative;
          &::before{
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position:absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
    // 右侧分类样式
    .right-scroll-view{
      .cate-lv2-title{
        text-align: center;
        font-weight: bold;
        padding: 15px 0;
      }
      .cate-lv3-list{
        display: flex;
        flex-wrap: wrap;
        .cate-lv3-item{
          width: 33.3%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          margin-bottom: 10px;
          image{
            width: 60px;
            height: 60px;
          }
        }
      }
    }
  }
</style>
