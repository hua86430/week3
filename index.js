

import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
      url: 'https://vue3-course-api.hexschool.io/'
    };
  },
  methods: {
    login () {
      axios.post(`${this.url}admin/signin`, this.user)
        .then(res => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `huaToken=${token}; expires=${new Date(expired)}`;
            window.location = "admin.html";
          } else {
            swal(`${res.data.message}`, '帳號或密碼錯誤，請重新輸入', 'error');
          }
        })
        .catch((res) => {
          alert(res.data.message);
        });
    }
  }
})
  .mount('#app');