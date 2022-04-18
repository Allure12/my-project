<!-- 登录组件 -->
<template>
  <view class="bgcolor">
    <view class="login-container">
      <uni-icons type="contact" size="100" color="grey"></uni-icons>
      <button type="primary" class="login-btn" @click="getUserProfile">一键登录</button>
      <view class="login-tip">登录后尽享更多权益</view>
    </view>
    <view class="bgcolor-bottom"></view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['saveUserInfo','saveToken','updateRedirectInfo']),
      // 获取用户信息
      getUserProfile() {
        uni.getUserProfile({
          desc: '登录',
          success: (res) => {
            this.saveUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: () => {
            uni.$showMsg('您取消了登录授权')
          }
        })
      },
      
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')

        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 写个死数据
        const loginResult={
          message:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
          },
          meta: { msg: "登录成功", status: 200 }
        }
        
        // 换取 token
        // const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功！')
        this.saveToken(loginResult.message.token)
        this.navigateBack() 
      },  
      
      // 返回登录之前的页面
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType=="switchTab"){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=>{
               this.updateRedirectInfo(null)
            },
          })
        }
        
      }
    }
  }
</script>

<style lang="scss">
    .login-container {
      height: 750rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f8f8f8;
      position: relative;
      overflow: hidden;
    
      .login-btn {
        width: 300px;
        border-radius: 100px;
        background-color: #c00000;
        font-size: 16px;
        margin: 15px 0;
      }
    
      .login-tip {
        font-size: 12px;
        color: grey;
      }
    
      // 绘制登录盒子底部的半椭圆造型
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 40px;
        border-radius: 100%;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(50%);
      }
    }
    .bgcolor-bottom{
      width: 100%;
      height: 180px;
      background-color:white;
    }

</style>
