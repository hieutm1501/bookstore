const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

const users = [
    {
        "id": 1,
        "email": "admin@gmail.com",
        "password": "123456"
    }
]
form.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let item of users) {
        if (email.value === item.email && password.value === item.password) {
            alert('Đăng nhập thành công!');
            window.location.href = '/';
            return;
        }
    }
    alert('Đăng nhập không thành công!');
});