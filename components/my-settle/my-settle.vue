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
      <view class="js" @click="settleHandler">
        <text>结算({{checkedCount}})</text>
      </view>
      
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        //时间3s
        seconds:3,
        timer:null, //定时器
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      ...mapGetters('m_user',['addStr']),
      ...mapState('m_user',['token']),
      // 判断全选是否需要勾选
      checkedRadio(){
        return this.checkedCount === this.total
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      // label 的点击事件处理函数,全选/反选功能
      changeAllState(){
        this.updateAllGoodsState(!this.checkedRadio)
      },
      // 判断是否可以进行结算
      settleHandler(){
        if(!this.checkedCount) return uni.$showMsg('请选择商品')
        if(!this.addStr) return uni.$showMsg('请选择地址')
        if(!this.token) this.showLoginTip()
      },
      showTip(n){
        uni.showToast({
          title:'请登录后再结算，'+n+'s后进入登录页',
          icon:'none',
          // 为页面添加透明遮罩，防止点击穿透
          mask:true,
          // 1.5 秒后自动消失
          duration:1500
        })
      },
      showLoginTip(){
        // 把 data 中的秒数重置成 3 秒
        this.seconds=3
        this.showTip(this.seconds)
        // 每1s执行一次
        this.timer=setInterval(()=>{
          this.seconds--;
          // 2. 判断秒数是否 <= 0
          if(this.seconds<=0){
            clearInterval(this.timer);
            // 2.2 跳转到 my 页面
            uni.switchTab({
              url:"/pages/my/my",             
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }    
          this.showTip(this.seconds)    
        },1000)   
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
