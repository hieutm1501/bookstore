const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

const users = [
    {
        "id": 1,
        "email": "admin@gmail.com",
        "password": "123456"
    }
]
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmpasswordValue = confirmpassword.value;

    // Check if email is already registered
    const isEmailRegistered = users.some(user => user.email === emailValue);

    if (isEmailRegistered) {
        alert('Email đã được đăng ký trước đó!');
        return;
    }
    if (emailValue == '' || passwordValue == '' || confirmpasswordValue == '') {
        alert('Không được bỏ trống')
        return
    }
    if (passwordValue != confirmpasswordValue) {
        alert('mật khẩu không khớp')
        return
    }

    // Register new user
    const newUser = {
        email: emailValue,
        password: passwordValue,
        id: users.length + 1
    };
    users.push(newUser);

    alert('Đăng ký thành công!');
    window.location.href = './sign.html';
});

