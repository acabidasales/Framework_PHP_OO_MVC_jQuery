function changeLang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'es';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    $.ajax({
        url: 'view/lang/' + lang + '.json',
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            for (var i = 0; i < elmnts.length; i++) {
                elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
            }
        }
    })
}

/* $(document).ready(function() {
    changeLang();
    $("select")
        .change(function() {
            $("#spanish:selected").each(function() {
                changeLang('es')
            });
            $("#english:selected").each(function() {
                changeLang('en')
            });
            $("#valencian:selected").each(function() {
                changeLang('val')
            });
            $("#friocc:selected").each(function() {
                changeLang('frsoc')
            });
        })
        .trigger("change");
}); */

$(document).ready(function() {
    changeLang();
    $("#spanish").on("click", function() {
        changeLang('es')
    });
    $("#english").on("click", function() {
        changeLang('en')
    });
    $("#valencian").on("click", function() {
        changeLang('val')
    });
    $("#friocc").on("click", function() {
        changeLang('frsoc')
    });
});