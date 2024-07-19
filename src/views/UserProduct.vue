<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Library</li>
      </ol>
    </nav>
    <div class="grid text-center flex">
      <div class="g-col-6">
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button
              v-for="(image, index) in product.imagesUrl"
              :key="index"
              type="button"
              :data-bs-slide-to="index"
              :class="{ active: index === currentImageIndex }"
              :aria-label="'Slide'+ (index+1)"
              data-bs-target="#carouselExampleIndicators"
              class="active"
              aria-current="true"
              @click="carousel(index)"
            ></button>
          </div>
          <div class="carousel-inner">
            <div
              class="carousel-item"
              v-for="(image, index) in product.imagesUrl"
              :key="index"
              :class="{ active: index === currentImageIndex }"
            >
              <img :src="image" class="d-block w-100" :alt="'Slide'+ (index+1)">
            </div>
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
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            @click="carousel(currentImageIndex + 1)"
            v-if="product.imagesUrl && currentImageIndex < product.imagesUrl.length - 1"
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
      <div class="g-col-6 productDescription">
        <h2>{{ product.content }}</h2>
        <p>商品細節: {{ product.description }}</p>
        <p> 原價: $ {{ product.origin_price }}</p>
        <p> 特價: $ {{ product.price }}</p>
        <div class="cartNum"><font-awesome-icon @click="minusQty" :icon="['fas', 'minus']" class="icon"/><input class="num" type="text" v-model="this.quantity"><font-awesome-icon @click="addQty" :icon="['fas', 'plus']" class="icon"/></div>
        <button class="btn btn-primary" @click="addCart" :disabled="this.status.loadingItem === this.id">
          <div v-if="this.status.loadingItem === this.id" class="spinner-border spinner-border-sm loadingIcon" role="status">
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
  data () {
    return {
      product: {},
      id: '',
      currentImageIndex: 0, // 初始設置為第一張圖片
      status: {
        loadingItem: '' // 對應品項id
      },
      quantity: 1
    }
  },
  created () {
    this.id = this.$route.params.productId
    console.log('this.id', this.id)
    this.getProduct()
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      console.log('product id', this.id)
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log('res', res)
            this.product = res.data.product
            console.log('product', this.product)
          }
        })
    },
    addCart (id) {
      id = this.id
      console.log('id', id)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: this.quantity
      }
      this.axios.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log('res', res)
        })
    },
    carousel (index) {
      this.currentImageIndex = index
    },
    addQty () {
      this.quantity += 1
    },
    minusQty () {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    }
  }
}
</script>
<style scoped>
.carousel {
  width: 100%;
}
.flex {
  display: flex;
}
.productDescription {
  width:100%;
  margin: 20px 50px;
}
.num{
  width: 50px;
  text-align: center;
  margin: 0 10px;
}
.icon {
  cursor: pointer;
}
.cartNum {
  margin: 10px;
}
</style>
