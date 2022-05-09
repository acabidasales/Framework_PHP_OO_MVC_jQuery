function protecturl() {
    $.ajax({
            type: 'GET',
            url: 'module/login/controller/controller_login.php?&op=controluser',
        })
        .done(function(data) {

            if (data == "okay") {
                /* setTimeout(' window.location.href = "index.php?page=controller_home&op=list"; ', 1000); */
                console.log("okay");
            } else if (data == "no") {
                alert("Debes realizar login");
                /* setTimeout(' window.location.href = window.location.href; ', 1000); */
            }
        })
        .fail(function(response) {});
}

function activity() {
    setInterval(function() {
        $.ajax({
            type: 'GET',
            url: 'module/login/controller/controller_login.php?&op=actividad',
            success: function(response) {
                if (response == "inactivo") {
                    alert("Se ha cerrado la cuenta por inactividad");
                    /* setTimeout('window.location.href = "index.php?page=login&op=logout";', 1000); */
                    logout();
                }
            }
        });
    }, 600000);
}

function refresh_tocken() {
    $.ajax({
        url: "module/login/controller/controller_login.php?op=refresh_tocken",
        dataType: "JSON",
        type: "POST",
        data: localStorage.getItem("token"),
    }).done(function(result) {
        localStorage.removeItem("token");
        localStorage.setItem("token", result);
    }).fail(function(e) {
        console.log(e);
    });
}

function refresh_cookie() {
    $.ajax({
        url: "module/login/controller/controller_login.php?op=refresh_cookie",
        dataType: "JSON",
        type: "POST",
    }).done(function() {}).fail(function(e) {
        console.log(e);
    });
}

$(document).ready(function() {
    if (localStorage.getItem('token')) {
        protecturl();
    }


    setInterval(function() {
        refresh_tocken();
        activity();
        refresh_cookie();
    }, 600000);
});