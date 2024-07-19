<template>
    <div class="container">
        <div class="row">
        <div class="col">
            <h2>優惠券管理</h2>
        </div>
        </div>
        <div class="row">
        <div class="col">
            <button class="btn btn-primary" type="button" @click="openModal(true)">建立新優惠券</button>
        </div>
        </div>
        <div class="row">
        <div class="col">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">優惠券名稱</th>
                <th scope="col">優惠碼</th>
                <th scope="col">折扣百分比</th>
                <th scope="col">到期日</th>
                <th scope="col">是否啟用</th>
                <th scope="col">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coupon in coupons" :key="coupon.id">
                <td>{{ coupon.title }}</td>
                <td>{{ coupon.code }}</td>
                <td>{{ coupon.percent }}%</td>
                <td>{{ $filters.date(coupon.due_date) }}</td>
                <td>
                  <span class="text-success" v-if="coupon.is_enabled===1">啟用</span>
                  <span class="text-muted" v-else>不啟用</span>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" @click="openModal(false, coupon.id)">編輯</button>
                    <button class="btn btn-danger" @click="openDelModel(coupon.id)">刪除</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
        <!-- tempCoupon: {{this.tempCoupon}} {{typeof(this.tempCoupon)}} <br/>
        date: {{this.date}} {{typeof(this.date)}} -->
    </div>
    <CouponModal ref="couponModal" :coupon="tempCoupon" :dueDate="date" @update-coupon="updateCoupon"></CouponModal>
    <DelModal ref="delModal" :item="tempCoupon" @del-item="deleteCoupon"></DelModal>
</template>
<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  components: {
    CouponModal,
    DelModal
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {
      },
      isNew: false,
      date: ''
    }
  },
  inject: ['emitter'],
  methods: {
    getCoupons () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            console.log('res', res)
            this.coupons = res.data.coupons
            console.log('this.coupons', this.coupons)
          }
        })
    },
    openModal (isNew, item) {
      item = this.coupons.find((coupon) => coupon.id === item)
      console.log(isNew, item)
      if (isNew) {
        // this.date = '' // 清空due_date
        this.tempCoupon = {
          title: '',
          code: '',
          percent: 100,
          is_enabled: 0
        } // 清空tempCoupon，回到初始值
      } else {
        this.tempCoupon = { ...item } // 淺拷貝 item 到 tempProduct
        this.date = this.tempCoupon.due_date // 設置 due_date 為當前優惠券的 due_date
      }
      console.log('this.tempCoupon', this.tempCoupon)
      console.log('item', item)
      this.isNew = isNew
      console.log('isNew', isNew)
      const couponModal = this.$refs.couponModal // 取得子元件(內層)的參考
      couponModal.showModal()
    },
    openDelModel (item) {
      item = this.coupons.find((coupon) => coupon.id === item)
      console.log(item)
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updateCoupon (item) {
      item = this.coupons.find((coupon) => coupon.id === item.id)
      // this.tempCoupon = item // 這邊是淺拷貝 item 到 tempCoupon，這樣無法更新內容，所以不能這樣寫
      console.log('item', item)
      console.log('this.tempCoupon', this.tempCoupon)
      // 新增優惠券
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 編輯優惠券
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      const couponModal = this.$refs.couponModal
      this.axios[httpMethod](api, { data: this.tempCoupon })
        .then((res) => {
          console.log('res', res)
          couponModal.hideModal()
          if (res.data.success) {
            this.getCoupons()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗'
            })
          }
        })
      console.log('httpMethod', httpMethod)
      console.log('api', api)
    },
    deleteCoupon (item) {
      // item = this.coupons.find((coupon) => coupon.id === item)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.axios.delete(url)
        .then((res) => {
          console.log('res', res)
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getCoupons()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功'
          })
        })
    }
  },
  created () {
    this.getCoupons()
  }

}
</script>
<style scoped>
</style>
