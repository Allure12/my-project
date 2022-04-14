<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in goodList" :key='i' @click="gotoGoodsDetail(goods)">
        <!-- 将item项封装到 my-goods 组件中 -->
        <!-- 为 my-goods 组件动态传递 goods 属性的值 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj: {
          query: '', //查询关键词
          cid: '', //分类ID
          pagenum: 1, //页数索引
          pagesize: 10, //每页长度
        },
        goodList: [], //存储商品列表数据
        total: 0,
        isloading:false //定义节流阀,是否正在请求数据
      }
    },
    onLoad(options) {
      // 将跳转页面传递的参数转存到queryObj中
      this.queryObj.query = options.query || '';
      this.queryObj.cid = options.cid || '';
      this.getGoodList()
    },
    methods: {
      //* 获取商品列表数据
      async getGoodList(cb) {
        this.isloading=true
        // 发起请求
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading=false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
          cb && cb()
          
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodList = [...this.goodList, ...res.message.goods]
        this.total = res.message.total
      },
      
      // 点击跳转到goods-detail页面
      gotoGoodsDetail(goods){
        uni.navigateTo({
          url:"../../subpkg/goods-detail/goods-detail?goods_id="+goods.goods_id
        })
      }
    },
    //下拉加载更多
   onReachBottom() {
     // 判断是否加载完毕
     if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg("加载完毕")
     // 节流处理
     if(this.isloading) return
     // 让页码值自增 +1
     this.queryObj.pagenum += 1
     // 重新获取列表数据
     this.getGoodList()
   },
   // 下拉刷新
   onPullDownRefresh() {
     // 重置关键数据
      this.queryObj.pagenum=1
      this.total=0
      this.isloading=false
      this.goodList=[]
      //关闭下拉刷新
      this.getGoodList(()=>uni.stopPullDownRefresh())
   }
 }
</script>

<style lang="scss">

</style>
