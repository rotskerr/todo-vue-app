export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    showMessage(text) {
      this.message = text
      setTimeout(() => {
        this.message = ''
      }, 2000)
    }
  }
}