<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      </div>
      <div class="mb-2">
        <label for="inputEmail" class="sr-only">Email Address</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          placeholder="Email Address"
          required
          autofocus
          v-model="user.username"
        />
      </div>
      <div class="mb-2">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="Password"
          required
          v-model="user.password"
        />
      </div>
      <div class="text-end mt-4">
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          登入
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      console.log('login')
      const api = `${process.env.VUE_APP_API}admin/signin`
      console.log(api)
      this.axios.post(api, this.user)
        .then((res) => {
          console.log('res', res)
        })
    }
  }
}
</script>

<style lang="scss">
// @import "~bootstrap/scss/bootstrap";
</style>
