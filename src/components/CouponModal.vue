<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
  <div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增優惠券</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
              v-model="tempCoupon.title" placeholder="請輸入優惠券標題">
          </div>

          <div class="mb-3">
            <label for="code" class="form-label">優惠碼</label>
            <textarea type="text" class="form-control" id="code"
              v-model.number="tempCoupon.code" placeholder="請輸入優惠碼"></textarea>
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">到期日</label>
            <input type="date" class="form-control" id="due_date"
              v-model="date">
          </div>

          <div class="mb-3">
            <label for="percent" class="form-label">折扣百分比</label>
            <input type="number" class="form-control" id="percent"
              v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled"
                      id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
    </div>
    <!-- tempCoupon: {{this.tempCoupon}} <br>
    coupon: {{this.coupon}} <br>
    date: {{this.date}} <br>
    dueDate: {{this.dueDate}} -->
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon, date)">確認</button>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
// import modalMixin from '@/mixins/modalMixin'
export default {
  // mixins: [modalMixin],
  props: {
    coupon: {},
    dueDate: String // dueDate 是由外部傳入的屬性，用來接收外部的資料
  },
  // emits: ['update-coupon'],
  data () {
    return {
      modal: {},
      tempCoupon: {
        is_enabled: 0
      }, // 外層的資料傳送的接收
      date: ''
    }
  },
  methods: {
    showModal () {
      this.modal.show()
      this.date = this.dueDate
    },
    hideModal () {
      this.modal.hide()
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      // 將時間格式改為 YYYY-MM-DD
      console.log('this.tempCoupon.due_date', this.tempCoupon.due_date)
      // 這段程式碼在轉換日期之前檢查 this.tempCoupon.due_date 和 this.due_date 是否存在且有效，如果不是，則記錄一個錯誤並返回，避免進一步的轉換操作。這樣可以避免遇到 "Invalid time value" 的錯誤。
      if (!this.tempCoupon.due_date) {
        console.error('Invalid due_date')
        return
      }
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      console.log('dateAndTime', dateAndTime)
      this.date = dateAndTime[0]
    },
    date (newVal, oldVal) {
      // 這段程式碼在轉換日期之前檢查 this.tempCoupon.due_date 和 this.due_date 是否存在且有效，如果不是，則記錄一個錯誤並返回，避免進一步的轉換操作。這樣可以避免遇到 "Invalid time value" 的錯誤。
      if (!this.date) {
        console.error('Invalid due_date')
        return
      }
      this.tempCoupon.due_date = Math.floor(new Date(this.date) / 1000)
      console.log(`date 從 ${oldVal} 變更為 ${newVal}`)
      // this.date = this.dueDate
    },
    // 監聽 dueDate prop 的變化
    dueDate (newVal, oldVal) {
    // 當 dueDate 變化時，這裡會被執行
      console.log(`dueDate 從 ${oldVal} 變更為 ${newVal}`)
    }
  },
  created () {
    if (this.dueDate) {
      this.date = this.dueDate
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
    // this.modal.show()
  }
}
</script>
