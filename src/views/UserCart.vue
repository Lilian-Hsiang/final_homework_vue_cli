<template>
  <div class="flex">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :status="status"
      @add-to-cart="addCart"
    ></ProductCard>
  </div>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '../store/cart'
import { mapState, mapActions } from 'pinia'
export default {
  components: {
    ProductCard
  },
  data () {
    return {
      products: [],
      // product: {},
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          console.log('products', this.products)
        }
      })
    },
    addCart (productId) {
      console.log('productId', productId)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = productId
      // request body
      const cart = {
        product_id: productId,
        qty: 1
      }
      this.axios.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log('res', res)
        })
    },
    // 使用pinia狀態管理庫useCartStore裡的getCart方法
    ...mapActions(useCartStore, ['getCart'])
  },
  computed: {
    // 使用pinia狀態管理庫useCartStore裡的cart狀態
    ...mapState(useCartStore, ['cart'])
  },
  created () {
    this.getProducts()
    const cartStore = useCartStore() // 獲取 store 的實例
    cartStore.getCart() // 現在可以正確調用 getCart 方法
  }
}
</script>
<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
