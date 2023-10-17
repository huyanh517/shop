$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/products",
    success: function (response) {
        $('.card-img-top').attr('src', response[0].images[0])
        
    }
});

