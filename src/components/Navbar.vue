<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link class="nav-link" to="/dashboard/products">{{ $t("navbar.products") }}</router-link>
          <router-link class="nav-link" to="/user/cartList">{{ $t("navbar.orders") }}</router-link>
          <router-link class="nav-link" to="/dashboard/coupons">{{ $t("navbar.coupons") }}</router-link>
          <router-link class="nav-link" to="/dashboard/logout">{{ $t("navbar.logout") }}</router-link>
        </div>
        <!-- <span class="navbar-text"> Navbar text with an inline element </span> -->
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      console.log(api)
      this.axios.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            console.log('res', res)
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
