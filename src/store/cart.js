import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [],
    qty: 1
  }),
  getters: {
    totalItems () {
      return this.cart.reduce((acc, item) => acc + item.qty, 0)
    },
    totalPrice () {
      return this.cart.reduce((acc, item) => acc + item.final_total, 0)
    }
  },
  actions: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          if (res.data.success) {
            this.cart = res.data.data.carts
            console.log('this.cart', this.cart)
          }
        })
    },
    removeFromCart (index) {
      this.cart.splice(index, 1)
    },
    clearCart () {
      this.cart = []
    }
  }
})
