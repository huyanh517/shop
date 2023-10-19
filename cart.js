let total = 0

function loadCartData() {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/cart",
        success: function (response) {
            if (response.length < 1) {
                $(".cart-container").html('<h1>Your Cart is Empty</>')
            } else {
                $(".cart-container").empty()
                renderCart(response)
                getInitValueAmount(response)

            }
        }
    });
}
loadCartData()

function renderCart(data) {
    $(data).each((index, item) => {
        $(".cart-container").append(`
<div class="row mb-5">
    <div class="col-lg-3 prdImg">
        <img
            src="https://i.dummyjson.com/data/products/${item.id}/thumbnail.jpg"
            alt="${item.title}"
            class="w-75 prdCartImg"
        />
    </div>
    <div class="col-lg-9 prdDetail">
        <div
            class="d-flex gap-3 justify-content-around"
        >
            <div class="prdNameVsCat">
                <h5 class="prdCartTitle">
                    ${item.prdTitle}
                </h5>
                <p class="prdCartCat">${item.prdCategory}</p>
            </div>

            <div class="prdCartQuantity">
                <div class="mb-3">
                    <label
                        for="prdCartAmount"
                        class="form-label"
                    >Amount</label
                    >
                    <input
                        type="number"
                        class="form-control w-50"
                        id="prdCartAmount${item.id}"
                        min="1"
                        value="${item.prdQuantity}"
                        onchange="getValueAmountOnChange(${item.prdPrice}, ${item.id})"
                    />
                    <input type="hidden" value="" class="totalPerRow" id="${item.id}" />
                    <button onclick="removeCartItem(${item.id})" class="btn btn-outline-danger mt-3">remove</button>
                </div>
            </div>

            <div class="prdCartPrice">
                <p id="prdCartPrice${item.id}">$${item.prdPrice}</p>
            </div>
        </div>
    </div>
</div>        
        `)
    })
}

let totalInit = 0
let totalOnChange = 0

function getInitValueAmount(data) {
    totalInit = 0
    totalOnChange = 0
    $(data).each((index, item) => {
        totalInit += Number(item.prdPrice) * Number(item.prdQuantity)
        $("#" + item.id + "").val(Number(item.prdPrice) * Number(item.prdQuantity))
    })
    $(".totalPriceCart").text("$" + totalInit)
}

function getValueAmountOnChange(price, id) {
    totalInit = 0
    totalOnChange = 0
    let totalPerItem = Number($("#prdCartAmount" + id + "").val()) * Number(price)
    $("#" + id + "").val(totalPerItem)
}

function getTotalOnChange() {
    totalOnChange = 0
    $(".totalPerRow").each((index, item) => {
        totalOnChange += Number($(item).val())
    })
    $(".totalPriceCart").text("$" + totalOnChange)
}

function removeCartItem(id) {
    $.ajax({
        type: "DELETE",
        url: "https://shop-n7rx.onrender.com/cart/" + id,
        success: function (response) {
            loadCartData()
        }
    });
}



