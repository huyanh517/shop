const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/products/" + productId,
    success: function (response) {
        renderSLiderProduct(response)
        renderBreadcumb(response)
        renderProductDetail(response)
        $('.sliderPrd').slick({
            dots: false,
            infinite: true,
            speed: 500,
            autoplaySpeed: 1500,
            autoplay: true,
            fade: true,
        });
    }
});

//Breadcumb

function renderBreadcumb(data) {
    $(".currProduct").text(data.title)
}


$('.slick-next').html(">")
$('.slick-prev').html("<")


function renderProductDetail(data) {
    let productDetail = "<h3 class='prd-title mb-2'>" + data.title + "</h3>";
    productDetail += "<p class='category-detail mb-3'>" + data.category + "</p>"
    productDetail += "<p class='prd-price mb-3'>$" + data.price + "</p>"
    productDetail += "<p class='prd-desc mb-5'>" + data.description + "</p>"
    $(productDetail).insertBefore($('.addToCart'))
}

function renderSLiderProduct(data) {
    $(data.images).each((index, item) => {
        let itemSLider = "<img src='" + item + "' alt='" + item.title + "' width='300px' />";
        $('.sliderPrd').append(itemSLider)
    })
}

// $(".prd-title")
// $(".category-detail")
// $(".prd-price")
// $(".prd-desc")


// Add to Cart

$(".addToCart").on("click", function (e) {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/products/" + productId,
        success: function (productDetail) {
            const cartItem = {
                prdID: productId,
                prdTitle: productDetail.title,
                prdPrice: productDetail.price,
                prdCategory: productDetail.category,
                prdQuantity: 1
            }

            $.ajax({
                type: "GET",
                url: "https://shop-n7rx.onrender.com/cart",
                success: function (response) {
                    const existItem = response.find(item => item.prdID == productId)
                    if (existItem) {
                        const cartItemId = response.findIndex(item => item.prdID == productId) + 1
                        $.ajax({
                            type: "PATCH",
                            url: "https://shop-n7rx.onrender.com/cart/" + cartItemId,
                            data: {
                                prdQuantity: Number(existItem.prdQuantity) + 1
                            },
                            success: function (response) {
                                $("#success-alert").show();
                                setTimeout(function () { $("#success-alert").hide(); }, 2000);

                            }
                        });
                    } else {
                        $.ajax({
                            type: "POST",
                            url: "https://shop-n7rx.onrender.com/cart",
                            data: cartItem,
                            success: function (res) {
                                $("#success-alert").show();
                                setTimeout(function () { $("#success-alert").hide(); }, 2000);
                            }
                        });
                    }
                }
            });
        }
    });
})


$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/cart",
    success: function (response) {
        $(".quantityCart").text(response.length)
    }
});