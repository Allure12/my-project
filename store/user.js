export default{
  namespaced: true,
  //存储数据
  state:()=>({
    //收货地址
    address:JSON.parse(uni.getStorageSync('address') || '{}')
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