<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
        </div>
        <router-link to="/user/cartList">
          <div class="cart">
            <font-awesome-icon class="cartLogo" :icon="['fas', 'cart-shopping']" />
            <div class="cartNum">{{this.totalItems}}</div>
            <!-- 這邊用 this.totalQty 也可以算出購物車項目的總量 -->
          </div>
        </router-link>
    </nav>
    <div class="container-fluid position-relative">
      <ToastMessages></ToastMessages>
      <select v-model="locale">
      <option v-for="item in localeOptions" :key="`locale-${item.lang}`" :value="item.lang">{{ item.name }}</option>
    </select>
      <router-view/>
    </div>
</template>
<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import { useI18n } from 'vue-i18n'
// import { mapState, mapActions } from 'pinia'
// import cartStore from '../store/cart'
import { useCartStore } from '../store/cart' // 修改導入方式，確保正確導入 useCartStore
import { computed } from 'vue'
export default {
  setup () {
    const { t, locale } = useI18n()
    const cartStore = useCartStore() // 使用store
    const getCart = cartStore.getCart
    // 使用 computed 來確保 totalItems 是響應式的
    const totalItems = computed(() => cartStore.totalItems)
    getCart()
    // 相加cart裡面的qty
    const totalQty = cartStore.cart.reduce((acc, item) => acc + item.qty, 0)
    return {
      t,
      locale,
      localeOptions: [
        { lang: 'en', name: 'English' },
        { lang: 'zh', name: '繁體中文' },
        { lang: 'jp', name: '日文' }
      ],
      cart: cartStore.cart, // 從store中獲取cart狀態
      getCart,
      totalQty,
      totalItems
    }
  },
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  onMounted () {
    this.getCart()
    this.totalQty()
  }
  // created () {
  // },
  // computed: {
  //   ...mapState(cartStore, ['cart'])
  // },
  // methods: {
  //   ...mapActions(cartStore, ['addToCart']),
  //   someMethod () {
  //     this.addToCart('productId') // 假設 'productId' 是您想傳遞的參數
  //   }
  // }
}
</script>
<style scoped>
.cart {
  margin:0 20px;
  position: relative;
}
.cartLogo {
  color: white;
  font-size: 26px;

}
.cartNum {
  background-color: red;
  width:18px;
  height:18px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 14px;
  text-align: center;
}
</style>
