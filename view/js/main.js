/*==================== AJAX PROMISE ====================*/
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

/*==================== FRIENDLY URL ====================*/
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
        cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
            link += "/" + aux[1] + "/";
        } else {
            link += "/" + aux[1];
        }
    }
    return "http://localhost/FrameworkPHP_OO_MVC_JQUERY" + link;
}

/*==================== LOAD MENU ====================*/
function load_menu() {
    console.log("a");
    /* $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=home&op=view" class="nav__link">Home</a>').appendTo('#header_menu');
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=shop&op=view" class="nav__link">Shop</a>').appendTo('#header_menu');
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=contact&op=view" class="nav__link">Contact us</a>').appendTo('#header_menu'); */

    ajaxPromise('?page=login&op=data_user', 'POST', 'JSON', { token: localStorage.getItem('token') })
        .then(function(data) {
            if (data[0].type === 'admin') {
                menu_admin();
            } else if (data[0].type === 'client') {
                menu_client();
            }
        }).catch(function() {
            $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=login&op=view" class="nav__link">Acceder</a>').appendTo('#header_menu');
            /* $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=cart&op=view" class="nav__link">Cart</a>').appendTo('#header_menu'); */
        });
}

/*==================== MENUS ====================*/
function menu_admin() {
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=crud&op=view" class="nav__link">Crud</a>').appendTo('#header_menu');
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('#header_menu');
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=cart&op=view" class="nav__link">Cart</a>').appendTo('#header_menu');
}

function menu_client() {
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('#header_menu');
    $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="?page=cart&op=view" class="nav__link">Cart</a>').appendTo('#header_menu');
}

/*==================== CLICK LOGOUT ====================*/
function click_logout() {
    $(document).on('click', '#logout', function() {
        logout();
    });
}

/*==================== LOGOUT ====================*/
function logout() {
    $.ajax({
        url: '?page=login&op=logout',
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data) {
        localStorage.removeItem('token');
        window.location.href = "?page=home&op=view";
    }).fail(function() {
        console.log('Something has occured');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
});