$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/products",
    success: function (response) {
        console.log(typeof(response[28].images) == 'object')
        
    }
});

