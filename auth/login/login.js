$('form').on('submit', function (event) {
    event.preventDefault();
    const inputs = $('#form .form-control')
    const values = {};
    inputs.each(function () {
        values[this.name] = $(this).val();
    })
    $('.form-check-input').each(function () {
        if (this.checked) {
            values["gender"] = $(this).val();
        }
    });

})
