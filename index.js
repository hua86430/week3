const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const url = 'https://vue3-course-api.hexschool.io/';

loginBtn.addEventListener('click', getLoginData);



function getLoginData () {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const user = {
    username,
    password
  };
  axios.post(`${url}admin/signin`, user)
    .then(res => {
      if (res.data.success) {
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `huaToken=${token}; expires=${new Date(expired)}`;
        window.location = "admin.html";
      } else {
        swal(`${res.data.message}`, '帳號或密碼錯誤，請重新輸入', 'error');
      }
    });
}