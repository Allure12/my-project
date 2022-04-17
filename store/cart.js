export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
    //添加商品到购物车
    addCart(state,goods){
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult=state.cart.find((x)=>x.goods_id===goods.goods_id)
      if(!findResult){
        // 如果购物车中没有这件商品，则直接 push
        state.cart.push(goods)
      }else{
        // 如果购物车中有这件商品，则只更新数量即可
        findResult.goods_count++
      }
      // console.log(state.cart)
      
      // 读取本地购物车数据
      this.commit('m_cart/saveStronge')
    },
    
    // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
    saveStronge(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    
    // 更新购物车中商品的勾选状态
    updateGoodsState(state,goods){
      const findResult=state.cart.find(x=>x.goods_id===goods.goods_id);
      if(findResult){
        findResult.goods_state=goods.goods_state
        this.commit('m_cart/saveStronge')
      }
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state,goods){
      const findResult=state.cart.find(x=>x.goods_id===goods.goods_id);
      if(findResult){
        findResult.goods_count=goods.goods_count
        this.commit('m_cart/saveStronge')
      }
    },
    
    // 清空购物车中的数据
    delGoodsState(state,goods){
      state.cart=state.cart.filter(x=>x.goods_id!=goods.goods_id)
      this.commit('m_cart/saveStronge')
    },
    
    // 修改所有商品的goods_state
    updateAllGoodsState(state,goods_state){
      state.cart.forEach(item=>item.goods_state=goods_state)
      this.commit('m_cart/saveStronge')
    }
  },
    
  // 模块的 getters 属性，用于加工state中的属性
  getters: {
    // 统计购物车中商品的总数量
    total(state){
      // 再使用 reduce 方法，将购物车商品数量进行累加
      return  state.cart.reduce((total,item)=>total+=item.goods_count,0)
    },
    // 勾选的商品的总数量
    checkedCount(state){
       // 先使用 filter 方法，从购物车中过滤器已勾选的商品
        // 再使用 reduce 方法，将已勾选的商品总数量进行累加
        // reduce() 的返回值就是已勾选的商品的总数量
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    
    // 统计勾选商品的总价格
    checkedGoodsAmount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
    }
  },
}