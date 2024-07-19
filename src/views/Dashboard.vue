<template>
    <Navbar></Navbar>
    <div class="container-fluid position-relative">
      <ToastMessages></ToastMessages>
      <select v-model="locale">
      <option v-for="item in localeOptions" :key="`locale-${item.lang}`" :value="item.lang">{{ item.name }}</option>
    </select>
      <router-view/>
    </div>
</template>
<script>
import emitter from '@/methods/emitter'
import Navbar from '@/components/Navbar.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import { useI18n } from 'vue-i18n'
export default {
  setup () {
    const { t, locale } = useI18n()
    return {
      t,
      locale,
      localeOptions: [
        { lang: 'en', name: 'English' },
        { lang: 'zh', name: '繁體中文' },
        { lang: 'jp', name: '日文' }
      ]
    }
  },
  components: {
    Navbar,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    // eslint-disable-next-line no-useless-escape
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    console.log(token)
    this.axios.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.axios.post(api, this.user)
      .then((res) => {
        console.log(res)
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  }
}
</script>
