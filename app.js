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
        tr += "<td scope='row'>" + Number(index + 1) + "</td>";
        tr += "<td>" + item.title + "</td>";
        tr += "<td>" + item.category + "</td>";
        tr += "<td>" + "$" + item.price + "</td>";
        tr += "<td class='text-center '>" + "<button onclick='loadSingleProduct(" + item.id + ")' class='btn btn-warning btn-edit' data-bs-toggle='modal' data-bs-target='#productModal'>" + "Edit" +
            "</button>" + "<button class='btn btn-danger btn-delete'>" + "Delete" + "</td>";
        tr += "</tr";

        $(".tbody-products").append(tr);
    })
}

function loadSingleProduct(id) {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/products/" + id,
        success: function (response) {
            console.log(response)
        }
    });
}


function displayProductModal() {

}
