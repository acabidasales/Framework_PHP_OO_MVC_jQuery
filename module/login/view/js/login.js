// ------------------- LOGIN ------------------------ //
function load_login() {
    $('<form></form>').attr({ 'id': 'login__form', 'method': 'post' }).html('<h2>Login Form</h2>').appendTo('.container_login');
    $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#login__form');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="username"><b>Username</b></label>' +
        '<input type="text" placeholder="Enter Username" id="username" name="username" required>' +
        '<font color="red"><span id="error_username" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b>Password</b></label>' +
        '<input type="password" placeholder="Enter password" id="password" name="password" required>' +
        '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
    $('<span></span>').attr({ 'class': 'psw' }).html('Forgot <a id="recover_password" href="#">password?</a>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<input class="button" id="login" type="button" value = "Enter"/>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<a class="button" id="login" type="button" href="?page=register&op=view">Create new account</a>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<a class="button" id="google" type="button" href="#"> Google </a>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<a class="button" id="github" type="button" href="#"> Git Hub </a>').appendTo('.form__content');
    click_login();
}

function click_login() {
    $("#login__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });

    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });

    $('#recover_password').on('click', function(e) {
        e.preventDefault();
        $('.container_login').empty();
        load_form_recover_password();
    });

    $('#google').on('click', function(e) {
        social_login('google');
    });

    $('#github').on('click', function(e) {
        social_login('github');
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        document.getElementById('error_username').innerHTML = "";
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_password').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function login() {
    if (validate_login() != 0) {
        var data = { username: $("#username").val(), password: $("#password").val() };

        $.ajax({
            url: "?page=login&op=login",
            type: "POST",
            data: data,
        }).done(function(data) {
            if (data == "error") {
                $("#error_password").html('La contraseña no es correcta');
            } else {
                localStorage.setItem("token", data);
                window.location.href = "?page=home&op=view";
            }
        }).fail(function(textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

function social_login(param) {
    authService = firebase_config();
    authService.signInWithPopup(provider_config(param))
        .then(function(result) {
            console.log('Hemos autenticado al usuario ', result.user);
            console.log(result.user.displayName);
            console.log(result.user.email);
            console.log(result.user.photoURL);
            if (result) {
                $.ajax({
                    url: '?page=login&op=social_login',
                    type: 'POST',
                    dataType: 'JSON',
                    data: { 'profile': result.user.uID }
                })
            }
        })
        .catch(function(error) {
            console.log('Se ha encontrado un error:', error);
        });
}

function firebase_config() {
    var config = {
        apiKey: "AIzaSyBjZ5EXtpoNFI9M63_x-1-5mqkV-NFM3hs",
        authDomain: "prueba-b29d6.firebaseapp.com",
        databaseURL: "https://website-306519.firebaseio.com",
        projectId: "",
        storageBucket: "prueba-b29d6.appspot.com",
        messagingSenderId: "948797586586"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    } else {
        firebase.app();
    }
    return authService = firebase.auth();
}

function provider_config(param) {
    if (param === 'google') {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    } else if (param === 'github') {
        return provider = new firebase.auth.GithubAuthProvider();
    }
}

// ------------------- REGISTER ------------------------ //
function load_register() {
    $('<form></form>').attr({ 'id': 'register__form', 'method': 'post' }).html('<h2>Register Form</h2>').appendTo('.container_login');
    $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#register__form');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="username"><b>Username</b></label>' +
        '<input type="text" placeholder="Enter Username" id="username" name="username" required>' +
        '<font color="red"><span id="error_username" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="email"><b>Email</b></label>' +
        '<input type="text" placeholder="Enter email" id="email" name="email" required>' +
        '<font color="red"><span id="error_email" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b>Password</b></label>' +
        '<input type="password" placeholder="Enter password" id="password" name="password" required>' +
        '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<input class="button" id="register" type="button" value = "Enter"/>').appendTo('.form__content');
    click_register();
}

function click_register() {
    $("#register__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });

    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_username').innerHTML = "El username tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username').innerHTML = "";
        }
    }

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_password').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

function register() {
    if (validate_register() != 0) {
        var data = { username: $("#username").val(), email: $("#email").val(), password: $("#password").val() };

        $.ajax({
            url: "?page=login&op=register",
            type: "POST",
            dataType: "",
            data: data,
        }).done(function(data) {
            if (data == "error") {
                $("#error_password").html('El email ya esta registrado');
            } else {
                alert('Email sended');
                localStorage.setItem("token", data);
                window.location.href = "?page=login&op=view";
            }
        }).fail(function(data, textStatus) {
            if (console && console.log) {
                console.log(data);
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

// ------------------- RECOVER PASSWORD ------------------------ //
function load_form_recover_password() {
    $('<form></form>').attr({ 'id': 'email__form', 'method': 'post' }).html('<h2>Recover password</h2>').appendTo('.container_login');
    $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#email__form');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="email"><b>Email</b></label>' +
        '<input type="text" placeholder="Enter email" id="email" name="email" required>' +
        '<font color="red"><span id="error_email" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container_login' }).html('<input class="button" id="button_email" type="button" value = "Enter"/>').appendTo('.form__content');
    click_recover_password();
}

function click_recover_password() {
    $("#email__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_email').on('click', function(e) {
        e.preventDefault();
        send_recover_password();
    });
}

function validate_recover_password() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

function send_recover_password() {
    if (validate_recover_password() != 0) {
        var data = { email: $('#email').val() };
        $.ajax({
            url: '?page=login&op=send_recover_email',
            dataType: 'json',
            type: "POST",
            data: data,
        }).done(function(data) {
            alert('Email sended');
        }).fail(function(textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

function load_form_new_password(token) {
    $.ajax({
        url: '?page=login&op=verify_token',
        dataType: 'json',
        type: "POST",
        data: { token: token },
    }).done(function(data) {
        if (data == "verify") {
            console.log(data);
            $('<form></form>').attr({ 'id': 'new_password__form', 'method': 'post' }).html('<h2>New password</h2>').appendTo('.container_login');
            $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#new_password__form');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password" name="password" required>' +
                '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password1"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password1" name="password1" required>' +
                '<font color="red"><span id="error_password1" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'button_container_login' }).html('<input class="button" id="recover" type="button" value = "Enter"/>').appendTo('.form__content');
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
            alert('New password');
        }).fail(function(textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

function load_form() {
    $('.container_login').empty();
    var ElementDiv = document.createElement('div');
    ElementDiv.id = "login_buttons"
    ElementDiv.className = "login_buttons"
    ElementDiv.style = "margin-left:25%;margin-right:25%;margin-bottom:250px;"
    ElementDiv.innerHTML =
        "<br><br><br><br><br>" +
        "<button id='login_button' class='btn btn-primary btn-lg btn-block'>Login</button>" +
        "<button id='register_button' class='btn btn-secondary btn-lg btn-block'>Register</button>";
    document.getElementById("container_login").appendChild(ElementDiv);
}
// ------------------- LOAD buttons ------------------------ //
function load_all() {
    load_form();
    $('#login_button').on('click', function(e) {
        $('.container_login').empty();
        load_login();
    });
    $('#register_button').on('click', function(e) {
        $('.container_login').empty();
        load_register();
    });
    /* if (path[3] === 'recover') {
        load_form_new_password(path[4]);
    } else if (path[3] === 'verify') { */
    /*
    function verify_email(path[4]){
        $.ajax({url: friendlyURL('?page=login&op=verify_email')
    */
    /* } else if (path[2] === 'register') {
        load_register();
    } else if (path[2] === 'login') {
        load_login();
    } */
}

$(document).ready(function() {
    load_all();
});