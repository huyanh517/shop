$.ajax({
    type: "GET",
    url: "https://shop-n7rx.onrender.com/products",
    success: function (response) {
        displayData(response);
    }
});


function displayData(data) {
    $(data).each((index, item) => {
        let tr = "<tr>";
        tr    += "<td scope='row'>" + Number(index + 1) + "</td>";
        tr    += "<td>" + item.title + "</td>";
        tr    += "<td>" + item.category + "</td>";
        tr    += "<td>" + "$" + item.price + "</td>";
        tr    += "</tr";

        $(".tbody-products").append(tr);
    })
}

$.ajax({
    type: "DELETE",
    url: "https://shop-n7rx.onrender.com/users/11",
    success: function (response) {
        alert("Ok")
    }
});