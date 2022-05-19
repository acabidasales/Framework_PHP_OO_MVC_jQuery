// ------------------- RECOVER PASSWORD ------------------------ //
function load_form_new_password(token) {
    $.ajax({
        url: '?page=login&op=verify_token',
        dataType: 'json',
        type: "POST",
        data: { token: token },
    }).done(function(data) {
        document.getElementById('token').remove();
        if (data == "verify") {
            $('<form></form>').attr({ 'id': 'new_password__form', 'method': 'post' }).html('<h2>New password</h2>').appendTo('.container_recover');
            $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#new_password__form');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password" name="password" required>' +
                '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password1"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password1" name="password1" required>' +
                '<font color="red"><span id="error_password1" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'button_container_recover' }).html('<input class="button" id="recover" type="button" value = "Enter"/>').appendTo('.form__content');
            click_new_password(token);
        } else {
            console.log("error");
        }
    }).fail(function(textStatus) {
        if (console && console.log) {
            console.log("La solicitud ha fallado: " + textStatus);
        }
    });
}

function click_new_password(token) {
    $("#new_password__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_new_password(token);
        }
    });

    $('#recover').on('click', function(e) {
        e.preventDefault();
        send_new_password(token);
    });
}

function validate_new_password() {
    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password1').innerHTML = "";
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('password').value.length < 8) {
            document.getElementById('error_password1').innerHTML = "";
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('password').value !== document.getElementById('password1').value) {
                document.getElementById('error_password').innerHTML = "";
                document.getElementById('error_password1').innerHTML = "Las contraseñas no son iguales";
                error = true;
            } else {
                document.getElementById('error_password').innerHTML = "";
            }
        }
    }
}

function send_new_password(token) {
    if (validate_new_password() != 0) {
        var data = { token: token, password: $('#password').val() };
        console.log(data);
        $.ajax({
            url: "?page=login&op=new_password",
            type: "POST",
            dataType: "JSON",
            data: data,
        }).done(function(data) {
            alert("Password Changed");
            window.location.href = "?page=home&op=view";
        }).fail(function(textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

/* function load_form() {
    $('.container_recover').empty();
    var ElementDiv = document.createElement('div');
    ElementDiv.id = "login_buttons"
    ElementDiv.className = "login_buttons"
    ElementDiv.style = "margin-left:25%;margin-right:25%;margin-bottom:250px;"
    ElementDiv.innerHTML =
        "<br><br><br><br><br>" +
        "<button id='login_button' class='btn btn-primary btn-lg btn-block'>Login</button>" +
        "<button id='register_button' class='btn btn-secondary btn-lg btn-block'>Register</button>";
    document.getElementById("container_recover").appendChild(ElementDiv);
} */

$(document).ready(function() {
    var token = document.getElementById('token');
    var tokenid = token.getAttribute('class');
    load_form_new_password(tokenid);
});