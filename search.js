const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('q');

$(".searchText").text(searchParam)

$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/products?q=" + searchParam,
    success: function (response) {
        renderProduct(response)
    }
});

//Search

$(".searchForm").on('input', function() {
    $(".searchBtn").attr('href', "./search.html?q=" + $(this).val())
})

function renderProduct(data) {
    $(data).each((index, item) => {
        let productCard = "<div class='col-lg-4 col-md-6 col-12 mt-4'>"
        productCard += "<div class='card h-100'>"
        productCard += "<img src='" + item.images[0] + "' class='card-img-top' alt='" + item.title + "'/>"
        productCard += "<div class='card-body'>"
        productCard += "<h5 class='card-title'>" + item.title + "</h5>"
        productCard += "<p class='card-text'>" + item.description + "</p>"
        productCard += "<a href='./product.html?id=" + item.id + "' class='btn btn-primary mt-3'>Detail</a>"
        productCard += "</div>"
        productCard += "</div>"
        productCard += "</div>"

        $(".productSearchBox").append(productCard)
    })
}

// Quantity cart
$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/cart",
    success: function (response) {
        $(".quantityCart").text(response.length)
    }
});