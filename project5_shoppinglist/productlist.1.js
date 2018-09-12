var products = document.querySelectorAll('.shopping-list > .item');

var data = {
    cartItems: [],
    totalprice: 0
}

var Product = function (id, image, name, quantity, desc, price) {
    this.id = "cart_" + id;
    this.image = image;
    this.name = name;
    this.quantity = quantity;
    this.desc = desc;
    this.price = price;
};


Product.prototype.findIndex = function (id) {
    var ret = -1;
    var index = 0;
    data.cartItems.forEach(function (item) {
        if (item.id === id) {
            ret = index
        }
        index++;
    });
    return ret;
};

Product.prototype.addToCart = function () {
    var cartlist = document.querySelector('.item_list');
    if (findIndex(this.id) >= 0) {
        var cartitem = document.getElementById(this.id);
        var totQuantity = parseInt(cartitem.querySelector(".total-quantity").value) + 1;
        cartitem.querySelector(".total-quantity").value = totQuantity.toString();
        return;
    }
    var cartitem = document.querySelector('.item_sample').cloneNode(true);

    cartitem.id = this.id;
    cartitem.querySelector(".thumb").src = this.image;
    cartitem.querySelector(".name").innerText = this.name;
    cartitem.querySelector(".total-quantity").value = this.quantity;
    cartitem.querySelector(".desc").innerText = desc;
    cartitem.querySelector(".total-price").innerText = this.price;
    // cartitem.querySelector(".delete-btn").addEventListener("click", function (event) {
    //     console.log(cartitem.id);
    //    // cartlist.removeChild(cartitem);
    //     console.log(event.target);
    //     var test = Product.findIndex.bind(this);
    //     console.log(test);
    // //    // data.cartItems.slice(self.findIndex(cartitem.id), 1);
    // //    console.log(data.cartItems);
    // //    data.cartItems.slice(0, 1);
    // //     console.log(data.cartItems);
    // });
    cartitem.classList.remove('display_none');
    data.cartItems.push(this);
    cartlist.insertAdjacentElement('beforeend', cartitem);
};





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
        }

        var cartProduct = new Product(productId,
            productImageUrl,
            productName,
            productQuantity,
            productDesc,
            productPrice);

            cartProduct.addToCart.apply(cartProduct);
        //    cartProduct.addToCart();

    });
});


