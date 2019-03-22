$(function () {

    $("#confrim-order").click(event => {
        let ok = true;
        let name = $("#name").val();
        let phone = $('#phone').val();
        let adress = $("#adress").val();
        if (!name || !phone || !adress) {
            ok = false;
        }
        if (ok) {
            $.ajax({
                method: "POST",
                url: "/api/newOrder",
                data: localStorage.pizzas,
                success: function (res) {         
                   localStorage.pizzas = '';
                   window.location.href = '/';
                }
            });
        } else {
            if (!name) {
                $("#name-error").show();
                $("#name").addClass("is-invalid");
            } else {
                $("#name-error").hide();
                $("#name").addClass("is-valid");
                $("#name").removeClass("is-invalid");
            }
            if (!phone) {
                $("#phone-error").show();
                $("#phone").addClass("is-invalid");
            } else {
                $("#phone-error").hide();
                $("#phone").addClass("is-valid");
                $("#phone").removeClass("is-invalid");
            }
            if (!adress) {
                $("#adress-error").show();
                $("#adress").addClass("is-invalid");
            } else {
                $("#adress-error").hide();
                $("#adress").addClass("is-valid");
                $("#adress").removeClass("is-invalid");
            }
        }
    });
});