<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">圖片</th>
        <th scope="col">產品名稱</th>
        <th scope="col">單價</th>
        <th scope="col">數量</th>
        <th scope="col">小計</th>
        <th scope="col">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in this.cart" :key="item.id">
        <td><img :src="item.product.imageUrl" alt="產品圖片" style="width: 100px; height: auto;"></td>
        <td>{{ item.product.title }}</td>
        <td>{{ item.product.price}}</td>
        <td>
          <div class="editQty" >
            <input v-if="this.edit" type="number" class="form-control qty" min="1" v-model="item.qty">
            <span v-else>{{ item.qty}}</span>
            <font-awesome-icon v-if="this.edit" @click="editQtyCheck(item.id)" :icon="['fas', 'check']" />
            <font-awesome-icon v-else @click="editQty()" :icon="['fas', 'pen-to-square']" />
          </div>
        </td>
        <td>{{ item.final_total}}</td>
        <td><font-awesome-icon @click="deleteCartItem(item.id)" :icon="['fas', 'trash']" /></td>
      </tr>
    </tbody>
  </table>
  總計: {{this.totalPrice}}
  <!-- 也可以用 this.totalPrice2 -->
</template>
<script>
import { useCartStore } from '../store/cart'
import { mapState, mapActions } from 'pinia'
export default {
  data () {
    return {
      // cart: []
      edit: false
    }
  },
  methods: {
    ...mapActions(useCartStore, ['getCart']),
    deleteCartItem (itemId) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${itemId}`
      console.log('itemId', itemId)
      this.axios.delete(url)
        .then((res) => {
          console.log('res', res)
          const cartStore = useCartStore()
          cartStore.getCart()
        })
    },
    editQty () {
      this.edit = true
    },
    // 編輯還找不到qty回傳值
    editQtyCheck (itemId) {
      this.edit = false
      const item = this.cart.find((item) => item.id === itemId) // 找到要編輯的商品 (找到對應的項目)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${itemId}`
      console.log('itemId', itemId)
      const cart = {
        product_id: itemId,
        qty: item.qty
      }
      console.log('cart', cart)
      this.axios.put(url, { data: cart })
        .then((res) => {
          console.log('res', res)
          const cartStore = useCartStore()
          cartStore.getCart()
        })
    }
  },
  computed: {
    ...mapState(useCartStore, ['cart']),
    ...mapState(useCartStore, ['totalPrice']),
    // 計算總價
    totalPrice2 () {
      return this.cart.reduce((acc, item) => acc + item.final_total, 0)
    }
  },
  created () {
    const cartStore = useCartStore()
    cartStore.getCart()
  }
}

</script>
<style scoped>
.qty {
  width: 50px;
  padding: 0;
  margin-right: 10px;
  text-align: center;
}
.editQty {
  display: flex;
  align-items: center;
}
</style>
