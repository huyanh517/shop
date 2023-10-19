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

function loadUsers() {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/users",
        success: function (response) {
            $(".tbody-users").empty()
            displayUsers(response);
        }
    });
}

loadProducts();
loadUsers()

function displayData(data) {
    $(data).each((index, item) => {
        let tr = "<tr class='prd-row' data-id='" + item.id + "'>";
        tr += "<td class='prd-row-idx' scope='row'>" + Number(index + 1) + "</td>";
        tr += "<td>" + item.title + "</td>";
        tr += "<td>" + item.category + "</td>";
        tr += "<td>" + `${item.description ? item.description : 'Khong co'}` + "</td>";
        tr += "<td>" + "$" + item.price + "</td>";
        tr += "<td style='width: 17%' class='text-center '>" + "<button onclick='loadSingleProduct(" + item.id + ")' class='btn btn-warning btn-edit'>" + "Edit" +
            "</button>" + "<button onclick='deleteSingleProduct(" + item.id + ")' class='btn btn-danger btn-delete'>" + "Delete" + "</td>";
        tr += "</tr";

        $(".tbody-products").append(tr);
    })
}

//Edit
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

function loadSingleUser(id) {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/users/" + id,
        success: function (response) {
            displayUserModal(response)
        }
    });
    $('#userModal').modal('show')
}

function displayUserModal(data) {
    $('#userModal .mb-3').remove()
    $('#exampleInputIDUser').remove()
    let modalBody = "<div class='mb-3'>" +
        "<label for='exampleInputTitleUser' class='form-label'>" + "Username" + "</label>" +
        "<input type='text' class='form-control' id='exampleInputTitleUser' aria-describedby='titleHelp' value='" + data.username + "'>" +
        "</div>"
    modalBody += "<div class='mb-3'>" +
        "<label for='exampleInputGenderUser' class='form-label'>" + "Gender" + "</label>" +
        "<textarea type='text' class='form-control' id='exampleInputGenderUser' aria-describedby='titleHelp'>" + data.gender + "</textarea>" +
        "</div>"
    modalBody += "<input type='hidden' class='form-control' id='exampleInputIDUser' aria-describedby='titleHelp' value='" + data.id + "'>"
    $(modalBody).insertBefore($('#btn-box-user'))
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
// Edit user
$(".product-form").on("submit", function (e) {
    e.preventDefault()
    const productUpdated = {
        title: $("#exampleInputTitle").val(),
        category: $("#exampleInputCat").val(),
        price: Number($("#exampleInputPrice").val()),
        description: $('#exampleInputDesc').val(),
    }
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

//Edit User
$(".user-form").on("submit", function (e) {
    e.preventDefault()
    const userUpdated = {
        username: $("#exampleInputTitleUser").val(),
        gender: $("#exampleInputGenderUser").val()
    }
    $.ajax({
        type: "PATCH",
        url: "https://shop-n7rx.onrender.com/users/" + $("#exampleInputIDUser").val(),
        data: userUpdated,
        success: function (response) {
            $("#userModal").modal('hide')
            loadUsers();
        }
    });
})

//Dashboard
function displayDashboard() {
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/products",
        success: function (response) {
            $('.product-qty').empty()
            $('.product-qty').text("Total: " + response.length)
        }
    });
    $.ajax({
        type: "GET",
        url: "https://shop-n7rx.onrender.com/users",
        success: function (response) {
            $('.user-qty').empty()
            $('.user-qty').text("Total: " + response.length)
        }
    });
}

displayDashboard()


//Delete Product

function deleteSingleProduct(id) {
    if (!confirm('Do you want to delete ?')) {
        return
    } else {
        $.ajax({
            type: "DELETE",
            url: "https://shop-n7rx.onrender.com/products/" + id,
            success: function (response) {
                loadProducts();
                displayDashboard()
            }
        });
    }
}

// Add product
$('.product-form-add').on("submit", function (e) {
    e.preventDefault()
    const imageList = $("#exampleInputImagesAddPrd").val()
    const newProduct = {
        title: $("#exampleInputTitleAddPrd").val(),
        description: $("#exampleInputDescAddPrd").val(),
        category: $("#exampleInputCategoryAddPrd").val(),
        price: $("#exampleInputPriceAddPrd").val(),
        images: imageList,
    }
    $.ajax({
        type: "POST",
        url: "https://shop-n7rx.onrender.com/products",
        data: newProduct,
        success: function (response) {
            $("#addProductModal").modal("hide")
            $('.modal-backdrop').remove()
            window.location.reload();
        }
    });
})

// Delete user

function deleteSingleUser(id) {
    if (!confirm('Do you want to delete ?')) {
        return
    } else {
        $.ajax({
            type: "DELETE",
            url: "https://shop-n7rx.onrender.com/users/" + id,
            success: function (response) {
                loadUsers();
                displayDashboard()
            }
        });
    }
}


// Display Users
function displayUsers(data) {
    $(data).each((index, item) => {
        let tr = "<tr class='user-row' data-id='" + item.id + "'>";
        tr += "<td class='user-row-idx' scope='row'>" + Number(index + 1) + "</td>";
        tr += "<td>" + "<img class='w-50' src='"+item.image+"' />" + "</td>";
        tr += "<td>" + item.username + "</td>";
        tr += "<td>" + item.email + "</td>";
        tr += "<td>" + item.gender + "</td>";
        tr += "<td style='width: 17%' class='text-center '>" + "<button onclick='loadSingleUser(" + item.id + ")' class='btn btn-warning btn-edit'>" + "Edit" +
            "</button>" + "<button onclick='deleteSingleUser(" + item.id + ")' class='btn btn-danger btn-delete'>" + "Delete" + "</td>";
        tr += "</tr";

        $(".tbody-users").append(tr);
    })
}