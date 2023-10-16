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
    let modalBody = "<div class='mb-3'>" +
                    "<label for='exampleInputTitle' class='form-label'>" + "Title" + "</label>" +
                    "<input type='text' class='form-control' id='exampleInputTitle' aria-describedby='titleHelp' value='"+ data.title +"'>" + 
                    "</div>"
        modalBody += "<div class='mb-3'>" +
                    "<label for='exampleInputCat' class='form-label'>" + "Category" + "</label>" +
                    "<input type='text' class='form-control' id='exampleInputCat' aria-describedby='titleHelp' value='"+ data.category +"'>" + 
                    "</div>"
        modalBody += "<div class='mb-3'>" +
                    "<label for='exampleInputPrice' class='form-label'>" + "Price" + "</label>" +
                    "<input type='text' class='form-control' id='exampleInputPrice' aria-describedby='titleHelp' value='"+ data.price +"'>" + 
                    "</div>"

    $(modalBody).insertBefore($('#btn-box'))
}
