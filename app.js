function loadProducts() {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/products",
        success: function (response) {
            $(".tbody-products").empty()
            displayData(response);
        }
    });
}

loadProducts();

function displayData(data) {
    $(data).each((index, item) => {
        let tr = "<tr class='prd-row' data-id='" + item.id + "'>";
        tr += "<td class='prd-row-idx' scope='row'>" + Number(index + 1) + "</td>";
        tr += "<td>" + item.title + "</td>";
        tr += "<td>" + item.category + "</td>";
        tr += "<td>" + `${item.description ? item.description : 'Khong co'}` + "</td>";
        tr += "<td>" + "$" + item.price + "</td>";
        tr += "<td class='text-center '>" + "<button onclick='loadSingleProduct(" + item.id + ")' class='btn btn-warning btn-edit'>" + "Edit" +
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
            displayProductModal(response)
        }
    });
    $('#productModal').modal('show')
}


function displayProductModal(data) {
    $('#productModal .mb-3').remove()
    $('#exampleInputID').remove()
    $('#exampleInputImages').remove()
    let modalBody = "<div class='mb-3'>" +
        "<label for='exampleInputTitle' class='form-label'>" + "Title" + "</label>" +
        "<input type='text' class='form-control' id='exampleInputTitle' aria-describedby='titleHelp' value='" + data.title + "'>" +
        "</div>"
    modalBody += "<div class='mb-3'>" +
        "<label for='exampleInputDesc' class='form-label'>" + "Description" + "</label>" +
        "<textarea type='text' class='form-control' id='exampleInputDesc' aria-describedby='titleHelp'>" + data.description + "</textarea>" +
        "</div>"
    modalBody += "<div class='mb-3'>" +
        "<label for='exampleInputCat' class='form-label'>" + "Category" + "</label>" +
        "<input type='text' class='form-control' id='exampleInputCat' aria-describedby='titleHelp' value='" + data.category + "'>" +
        "</div>"
    modalBody += "<div class='mb-3'>" +
        "<label for='exampleInputPrice' class='form-label'>" + "Price" + "</label>" +
        "<input type='text' class='form-control' id='exampleInputPrice' aria-describedby='titleHelp' value='" + data.price + "'>" +
        "</div>"
    modalBody += "<input type='hidden' class='form-control' id='exampleInputID' aria-describedby='titleHelp' value='" + data.id + "'>"
    $(modalBody).insertBefore($('#btn-box'))
}

$(".product-form").on("submit", function (e) {
    e.preventDefault()
    const productUpdated = {
        title: $("#exampleInputTitle").val(),
        category: $("#exampleInputCat").val(),
        price: Number($("#exampleInputPrice").val()),
        description: $('#exampleInputDesc').val(),
    }
    console.log("productUpdated", productUpdated)
    $.ajax({
        type: "PATCH",
        url: "https://shop-n7rx.onrender.com/products/" + $("#exampleInputID").val(),
        data: productUpdated,
        success: function (response) {
            $("#productModal").modal('hide')
            loadProducts();
        }
    });
})

