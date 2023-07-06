const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let products = [];
let cart = [];


// Lấy dữ liệu 
fetch('https://64a6c3cd096b3f0fcc808775.mockapi.io/product')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    });

// Hiển thị ban đầu
function displayProducts(products) {
    productList.innerHTML = '';
    for (let product of products) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
        <form>
            <a href="${product.id}" class="single-book__img">
                <img src="${product.img}" alt="single book and cd">
            </a>
            <h4 class="single-book__title">${product.name}</h4>
            <span class="single-book__price" data-value="${product.price}">$${product.price}</span> <br>
            <input type="hidden" name="product_id" value="${product.id}">
            <input type="hidden" name="product_name" value="${product.name}">
            <input type="hidden" name="product_img" value="${product.img}">
            <input type="hidden" name="product_price" value="${product.price}">
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" value="1" min="1"> 
            <button type="submit" class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        </form>
        `;
        productList.appendChild(productItem);
    }

    function addToCart(event) {
        event.preventDefault();
        const form = event.target;
        const productId = form.product_id.value;
        const cartname = form.product_name.value;
        const cartimg = form.product_img.value;
        const cartprice = form.product_price.value;
        const quantity = form.quantity.value;

        const data = {
            productId: productId,
            productName: cartname,
            productImg: cartimg,
            productPrice: cartprice,
            quantity: quantity
        };

        fetch('https://64a6c3cd096b3f0fcc808775.mockapi.io/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                cart = data;
                updateCartIcon();
            })
            .catch(error => console.log(error));
        alert('thêm vào giỏ hàng thành công');
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', addToCart);
    });
}

// Lắng nghe sự kiện nhập liệu vào ô tìm kiếm.
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm và hiển thị danh sách sản phẩm lọc được lên trang web.
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || product.price.toLowerCase().includes(searchTerm);
    });

    displayProducts(filteredProducts);
});

// hàm sắp xếp danh sách sản phẩm từA đến Z
function sortProductsAz() {
    products.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // đổi tên sản phẩm thành chữ in hoa
        var nameB = b.name.toUpperCase(); // đổi tên sản phẩm thành chữ in hoa
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    displayProducts(products);
}

// hàm sắp xếp danh sách sản phẩm từ Z đến A
function sortProductsZa() {
    products.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // đổi tên sản phẩm thành chữ in hoa
        var nameB = b.name.toUpperCase(); // đổi tên sản phẩm thành chữ in hoa
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
    displayProducts(products);
}

// lấy các phần tử DOM tương ứng với hai nút click
var sortAzButton = document.querySelector('#sort-az');
var sortZaButton = document.querySelector('#sort-za');

// thêm sự kiện click cho hai nút
sortAzButton.addEventListener('click', function () {
    sortProductsAz();
});

sortZaButton.addEventListener('click', function () {
    sortProductsZa();
});

// Hiển thị chi tiết sản phẩm
function showProductDetail(product) {
    const productDetailOverlay = document.getElementById('product-detail-overlay');
    const productDetail = document.getElementById('product-detail');
    const productDetailImage = document.getElementById('product-detail-image');
    const productDetailName = document.getElementById('product-detail-name');
    const productDetailPrice = document.getElementById('product-detail-price');

    productDetailImage.src = product.img;
    productDetailName.textContent = product.name;

    productDetailPrice.textContent = `$${product.price}`;

    productDetailOverlay.style.display = 'block';
    productDetail.style.display = 'block';
}

// Ẩn popup chi tiết sản phẩm
function hideProductDetail() {
    const productDetailOverlay = document.getElementById('product-detail-overlay');
    const productDetail = document.getElementById('product-detail');

    productDetailOverlay.style.display = 'none';
    productDetail.style.display = 'none';
}

// Thêm sự kiện click cho phần tử a để hiển thị chi tiết sản phẩm
productList.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        const productId = event.target.parentNode.getAttribute('href');
        const product = products.find(product => product.id == productId);
        showProductDetail(product);
    }
});

// Thêm sự kiện click cho nút đóng popup chi tiết sản phẩm
const productDetailCloseButton = document.getElementById('product-detail-close');
productDetailCloseButton.addEventListener('click', hideProductDetail);

// Thêm sự kiện click cho overlay để đóng popup chi tiết sản phẩm
const productDetailOverlay = document.getElementById('product-detail-overlay');
productDetailOverlay.addEventListener('click', hideProductDetail);