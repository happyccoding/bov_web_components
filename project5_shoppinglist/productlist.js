
var products = document.querySelectorAll('.shopping-list > .item');
var cartlist = document.querySelector('.item_list');
var itemCount = document.querySelector('#item_count');
var itemTotal = document.querySelector('#item_total');


var data = {
    cartItems: [],
    subTotal: 0
}

const PROMO_CODES = [
    {
        code: '10OFF',
        discount: 0.10
    },
    {
        code: '15OFF',
        discount: 0.15
    }
]

var findIndex = function (id) {
    var ret = -1;
    var index = 0;
    data.cartItems.forEach(function (item) {
        if (item.id === id) {
            ret = index;
            return;
        }
        index++;
    });
    return ret;
};

var caculatePromotion = function () {
    var ret = -1;
    var index = 0;
    data.cartItems.forEach(function (item) {
        if (item.id === id) {
            ret = index;
            return;
        }
        index++;
    });
    return ret;
};

document.querySelector('#coupon-btn').addEventListener("click", function (event) {
    var discount = 0;
    PROMO_CODES.forEach(function (item) {
        var userInput = document.querySelector('#couponInput').value;
        if (item.code === userInput) {
            discount = item.discount;
            return;
        }
    });

    var subTotal = data.subTotal - (data.subTotal*discount);
    itemTotal.innerText = subTotal;
});

var Product = function (id, image, name, quantity, desc, price) {
    this.id = "cart_" + id;
    this.image = image;
    this.name = name;
    this.quantity = quantity;
    this.desc = desc;
    this.price = price;

    var removeItem = function (cartitem) {
        cartlist.removeChild(cartitem);
        var idxCartItem = findIndex(cartitem.id);
        if (idxCartItem >= 0) {
            data.cartItems.splice(idxCartItem, 1);
        }
    }

    var increaseQuantity = function (cartitem) {
        var idxCartItem = findIndex(cartitem.id);
        data.cartItems[idxCartItem].quantity += 1;
        cartitem.querySelector(".total-quantity").value = data.cartItems[idxCartItem].quantity;
    }

    var decreaseQuantity = function (cartitem) {
        var idxCartItem = findIndex(cartitem.id);
        data.cartItems[idxCartItem].quantity -= 1;
        if (data.cartItems[idxCartItem].quantity < 0) {
            removeItem(cartitem);
        } else {
            cartitem.querySelector(".total-quantity").value = data.cartItems[idxCartItem].quantity;
        }
    }

    var changeQuantity = function (cartitem, value) {
        var idxCartItem = findIndex(cartitem.id);
        data.cartItems[idxCartItem].quantity = value;
        cartitem.querySelector(".total-quantity").value = value;
    }


    var calculateTotal = function () {
        var subTotal = 0;
        data.cartItems.forEach(function (item) {
            subTotal += item.price.slice(1) * item.quantity;
        });

        itemCount.innerText = data.cartItems.length;
        itemTotal.innerText = '$' + subTotal;

        data.subTotal = subTotal;

    }

    this.addToCart = function () {
        var idxCartItem = findIndex(this.id);
        if (idxCartItem >= 0) {
            var cartitem = document.getElementById(this.id);
            data.cartItems[idxCartItem].quantity += 1;
            cartitem.querySelector(".total-quantity").value = data.cartItems[idxCartItem].quantity;
            calculateTotal();
            return;
        }
        var cartitem = document.querySelector('.item_sample').cloneNode(true);

        cartitem.id = this.id;
        cartitem.querySelector(".thumb").src = this.image;
        cartitem.querySelector(".name").innerText = this.name;
        cartitem.querySelector(".total-quantity").value = this.quantity;
        cartitem.querySelector(".desc").innerText = desc;
        cartitem.querySelector(".total-price").innerText = this.price;
        cartitem.querySelector(".delete-btn").addEventListener("click", function (event) {
            removeItem(cartitem);
            calculateTotal();
        });
        cartitem.querySelector(".plus-btn").addEventListener("click", function (event) {
            increaseQuantity(cartitem);
            calculateTotal();
        });
        cartitem.querySelector(".minus-btn").addEventListener("click", function (event) {
            decreaseQuantity(cartitem);
            calculateTotal();
        });
        cartitem.querySelector(".total-quantity").addEventListener("change", function (event) {
            changeQuantity(cartitem, event.target.value);
            calculateTotal();
        });


        cartitem.classList.remove('display_none');
        data.cartItems.push(this);
        cartlist.insertAdjacentElement('beforeend', cartitem);

        calculateTotal();
    }
}

products.forEach(function (node) {
    node.addEventListener('click', function (event) {
        if (event.target.matches(".cartbtn")) {
            var product = event.currentTarget;
            var productId = product.id;
            var productImageUrl = product.querySelector('.thumb').src;
            var productName = product.querySelector("h3").innerText;
            var productQuantity = 1;
            var productDesc = product.querySelector("p").innerText.slice(0, 34);
            var productPrice = product.querySelector("label").innerText;

            var cartProduct = new Product(productId,
                productImageUrl,
                productName,
                productQuantity,
                productDesc,
                productPrice);

            cartProduct.addToCart();
        }

    });
});


