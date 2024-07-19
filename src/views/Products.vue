<template>
  <Loading :active="isLoading"></Loading>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click="openModal(true)">
          {{ $t("products.addProduct") }}
        </button>
    </div>
    <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">{{ $t("products.category") }}</th>
        <th>{{ $t("products.productName") }}</th>
        <th width="120">{{ $t("products.originPrice") }}</th>
        <th width="120">{{ $t("products.price") }}</th>
        <th width="100">{{ $t("products.activate") }}</th>
        <th width="200">{{ $t("products.edit") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">{{ $t("products.enable") }}</span>
          <span class="text-muted" v-else>{{ $t("products.disable") }}</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">{{ $t("products.edit") }}</button>
            <button class="btn btn-outline-warning btn-sm" @click="openDelModel (item)">{{ $t("products.delete") }}</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @del-item="deleteProduct"></DelModal>
</template>
<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.axios.get(api)
        .then((res) => {
          this.isLoading = false // 取得資料完成後，isLoading改為false
          console.log(res)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
    },
    openModal (isNew, item) {
      console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {} // 清空 tempProduct
      } else {
        this.tempProduct = { ...item } // 淺拷貝 item 到 tempProduct
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal // 取得子元件(內層)的參考
      productComponent.showModal() // 呼叫子元件(內層)的showModal方法
    },
    openDelModel (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      // 新增產品
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯產品
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.axios[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          console.log(res)
          productComponent.hideModal()
          if (res.data.success) {
            this.getProducts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、')
            })
          }
        })
    },
    deleteProduct (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.axios.delete(api)
        .then((res) => {
          console.log(res)
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
