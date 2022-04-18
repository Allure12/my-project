export default{
  namespaced: true,
  //存储数据
  state:()=>({
    //收货地址
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录成功之后的 token 字符串
    token:uni.getStorageSync('token') || '',
    // 用户信息
    userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),
  // 方法
  mutations:{
    // 将addressList数据存储到vuex中
    saveAddress(state,addressList){
      state.address=addressList
      this.commit('m_user/saveStronge')
    },
    saveStronge(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
      uni.setStorageSync('token',state.token)
    },
    // 将userInfo数据存储到vuex中
    saveUserInfo(state,userInfo){
      state.userInfo=userInfo
      this.commit('m_user/saveStronge')
    },
    //将token存储到vuex中
    saveToken(state,token){
      state.token=token
      this.commit("m_user/saveStronge")
    },
    // 更新重定向的信息对象
    updateRedirectInfo(state,info){
      state.redirectInfo=info
      console.log(state.redirectInfo)
    }
  },
  //数据包装器
  getters:{
    //地址拼接
    addStr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    },
  }
}