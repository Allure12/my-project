<template>
  <view>
    <!-- 使用uni-ui提供的搜索组件 -->
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" :placeholder="'请输入搜索内容'" cancelButton="none">请输入搜索内容</uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="search-list" v-if="searchList.length!==0">
      <view class="search-item" v-for="(item,i) in searchList" :key="i" @click="gotoGoodsDetail(item)">
        <view class="search-name">{{item.goods_name}}</view>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史记录 -->
    <view class="search-history" v-else>
      <view class="search-history-title">
        <text>搜索历史</text>
        <uni-icons type="trash-filled" size="18" @click="delHistory" v-if="searchHistory.length!==0"></uni-icons>
      </view>
      <view class="search-history-list">
        <uni-tag :text="item2" v-for="(item2,i2) in history" :key="i2" @click="gotoGoodsList(item2)"></uni-tag>
      </view>
     
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,//延时器
        tw:"", //存放搜索框中的输入内容
        searchList:[], //存放搜索建议
        searchHistory:[], //存放搜素历史
      };
    },
    onLoad() {
      //加载本地存储的搜索历史记录
      this.searchHistory=JSON.parse(uni.getStorageSync('tw') || '[]')
    },
    methods:{
      // 搜索框input事件的处理函数
      input(e){
        clearTimeout(this.timer)
        // 启动延时器，500ms后才会获取到搜素框中输入的数据
        this.timer=setTimeout(()=>{
          this.tw=e
          this.getSearchList() //搜索建议方法
          this.saveSearchHistory() //保存搜索历史方法
        },500)
      },
      
      // 获取搜索建议查询数据
      async getSearchList(){
        if(this.tw.length===0){
          this.searchList=[]
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.tw})
        if(res.meta.status!=200) return uni.$showMsg()
        this.searchList=res.message
      },
      // 点击搜索建议跳转到goods-detail页面
      gotoGoodsDetail(item){
        uni.navigateTo({
          url:'../goods-detail/goods-detail?goods_id='+item.goods_id
        })
      },
      //保存搜索历史方法
      saveSearchHistory(){
        //将searchHistory数组去重：将arr转换为set对象
        const set=new Set(this.searchHistory)
        set.delete(this.tw)
        set.add(this.tw)
        // 将set转换为arr数组
        this.searchHistory=Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('tw',JSON.stringify(this.searchHistory))
      },
      // 删除历史记录
      delHistory(){
        uni.showModal({
          title:"提示",
          content:'是否清空历史记录',
          success:(res)=>{
            if(res.confirm){
              this.searchHistory=[]
              uni.setStorageSync('tw','[]')
            }
          }   
        })   
      },
      
      //点击搜索历史跳转到商品列表页面
      gotoGoodsList(item2){
        uni.navigateTo({
          url:'../goods_list/goods_list?query='+item2
        })
      }
    },
    computed:{
      //将this.searchHistory中添加想新数据放在开头
      history(){
        return [...this.searchHistory].reverse()
      }
    }
  }
</script>

<style lang="scss">
// 给搜索组件设置吸顶效果
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
//搜索建议效果
.search-list{
  padding: 0 5px;
  .search-item{
    font-size: 12px;
    padding: 15px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-name{
      // 文本不允许换行
      white-space: nowrap;
      // 商品部分隐藏
      overflow: hidden;
      // 文本超出后,使用...代替
      text-overflow: ellipsis;
    }
  }
}
//搜素历史样式
.search-history{
  padding: 0 5px;
  .search-history-title{
    padding: 13px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
  }
  .search-history-list{
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
      color: #000000;
      background-color: #efefef;
      border-color: #efefef;
    }
  }
}
</style>
