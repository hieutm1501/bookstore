const cartList = document.getElementById('cart-list');
let cart = [];

fetch('https://64a6c3cd096b3f0fcc808775.mockapi.io/carts')
    .then(response => response.json())
    .then(data => {
        cart = data;
        // console.log(data);
        displayProducts(cart);
    });

function displayProducts(cart) {
    cartList.innerHTML = '';
    for (let item of cart) {
        console.log(item);
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <form>
            <div class="cart__item">
            <img src="${item.productImg}" alt="Product image" class="cart__item-img">
            <div class="cart__item-details">
                <h3 class="cart__item-title">${item.productName}</h3>
                <p class="cart__item-price">$${item.productPrice}</p>
                <div class="cart__item-quantity">
                    <label for="quantity">Số lượng:</label>
                    <input type="number" name="quantity" value="${item.quantity}" min="1" max="10">
                </div>
            </div>
            <button class="cart__item-remove">Xóa</button>
        </div>
        </form>
`;
        cartList.appendChild(cartItem);
    }
}