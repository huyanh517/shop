$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/cart",
    success: function (response) {
        renderCart(response)
    }
});


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
                        id="prdCartAmount"
                        min="1"
                        value="${item.prdQuantity}"
                    />
                    <button class="btn btn-outline-danger mt-3">remove</button>
                </div>
            </div>

            <div class="prdCartPrice">
                <p id="prdCartPrice">$${item.prdPrice}</p>
            </div>
        </div>
    </div>
</div>        
        `)
    })
}

