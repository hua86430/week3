
const app = Vue.createApp({

  data () {
    return {
      url: 'https://vue3-course-api.hexschool.io/',
      path: "hua430",
      productData: [],
      modelObj: {
        modelStatus: ""
      },
      productObj: {
        imagesUrl: []
      }
    };
  },
  methods: {
    getData () {
      axios.get(`${this.url}api/${this.path}/admin/products`)
        .then((res) => {
          if (res.data.success) {
            this.productData = res.data.products;
            console.log(this.productData);
          }
        })
        .catch((res) => {
          swal('錯誤', '產品資料取得失敗', 'error');
        });
    },
    updateProduct (status, item) {
      if (status == "create") {
        myProductModal.show();
        this.productObj = {
          imagesUrl: []
        };
        this.modelObj.modelStatus = "新增";
      }
      else if (status == 'edit') {
        myProductModal.show();
        this.productObj = {
          ...item
        };
        this.modelObj.modelStatus = "編輯";
      }
      else if (status == 'delete') {
        myDeleteModal.show();
        this.productObj = {
          ...item
        };
        this.modelObj.modelStatus = "刪除";
      }
    },
    editProduct () {
      if (this.modelObj.modelStatus == "新增") {
        axios.post(`${this.url}api/${this.path}/admin/product`, { data: this.productObj })
          .then((res) => {
            if (res.data.success) {
              swal('成功', `${res.data.message}`, 'success');
              this.getData();
              myProductModal.hide();
            } else {
              swal('錯誤', '欄位不得為空', 'error');
            }
          })
          .catch((res) => {
            console.log(res.data.message);
          });
      }
      if (this.modelObj.modelStatus == "編輯") {
        axios.put(`${this.url}api/${this.path}/admin/product/${this.productObj.id}`, { data: this.productObj })
          .then((res) => {
            swal('成功', `${res.data.message}`, 'success');
            this.getData();
            myProductModal.hide();
          })
          .catch((res) => {
            console.log(res.data.message);
          });
      }
      if (this.modelObj.modelStatus == "刪除") {
        axios.delete(`${this.url}api/${this.path}/admin/product/${this.productObj.id}`)
          .then((res) => {
            swal('成功', `${res.data.message}`, 'success');
            this.getData();
            myDeleteModal.hide();
          })
          .catch((res) => {
            console.log(res.data.message);
          });
      }
    },
    addImage () {
      if (this.productObj.imagesUrl == "") {
        this.productObj.imagesUrl = [];
      }
      if (this.productObj.imagesUrl[this.productObj.imagesUrl.length - 1] !== "")
        this.productObj.imagesUrl.push("");
    },
    delImage () {
      this.productObj.imagesUrl.splice(this.productObj.imagesUrl.length - 1, 1);
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)huaToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.getData();
  },
  mounted () {
    myProductModal = new bootstrap.Modal(document.querySelector('#productModal'));
    myDeleteModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
  }
}).mount("#app");