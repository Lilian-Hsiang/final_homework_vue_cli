<template>
  <div class="card" style="width: 18rem">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      v-if="product.imagesUrl"
    >
      <div class="carousel-indicators">
        <button
          class="carouselBtn"
          v-for="(image, index) in product.imagesUrl"
          :key="index"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          :data-bs-slide-to="index"
          :class="{ active: index === currentImageIndex }"
          :aria-label="'Slide' + (index + 1)"
          aria-current="true"
          @click="carousel(index)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(image, index) in product.imagesUrl"
          :key="index"
          class="carousel-item"
          :class="{ active: index === currentImageIndex }"
        >
          <img :src="image" class="d-block w-100" :alt="`Slide ${index + 1}`" />
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
          @click="carousel(currentImageIndex - 1)"
          v-if="currentImageIndex > 0"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
          v-else
          disabled
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          v-if="currentImageIndex < product.imagesUrl.length - 1"
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
          @click="carousel(currentImageIndex + 1)"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
          v-else
          disabled
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <img
      v-else
      :src="product.imageUrl"
      class="card-img-top"
      :alt="product.name"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.content }}</h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <span class="originPrice">原價 ${{ product.origin_price }}</span><span>特價 ${{ product.price }}</span>
      <br/>
      <div class="btn">
        <button class="btn btn-secondary" @click="getProduct(product.id)">查看更多</button>
        <button class="btn btn-primary" @click="addToCart" :disabled="this.status.loadingItem === product.id">
          <div v-if="this.status.loadingItem === product.id" class="spinner-border spinner-border-sm loadingIcon" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product', 'status'],
  data () {
    return {
      currentImageIndex: 0 // 初始設置為第一張圖片
    }
  },
  methods: {
    carousel (index) {
      this.currentImageIndex = index // 更新當前圖片索引
      console.log('Index:', index)
      console.log('Image URL:', this.product.imagesUrl[index])
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
      console.log('Product ID:', id)
    },
    addToCart () {
      this.$emit('add-to-cart', this.product.id) // 發送事件給父元件，並傳遞商品 ID
    }
  }
}
</script>
<style scoped>
.carouselBtn {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid pink;
  background-color: #fff;
  margin: 0 5px;
}
.card{
  margin: 10px;
}
.originPrice{
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
}
.btn{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.loadingIcon {
  margin-right:5px;
  margin-top: 4px;
}
</style>
