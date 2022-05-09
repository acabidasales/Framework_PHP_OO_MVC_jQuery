function loadSlider_marcas() {
    localStorage.removeItem('filter');
    localStorage.removeItem('filter_combustible');
    localStorage.removeItem('filter_marcas');
    $.ajax({
        url: 'index.php?page=home&op=marcas_carousel',
        /* "module/home/controller/controller_home.php?op=Home_Marcas" */
        type: 'POST',
        dataType: 'JSON',

    }).done(function(json) {
        var Element_container = document.createElement('section');
        Element_container.id = "home";
        Element_container.className = "text-center";
        Element_container.style = "margin-top:-90px;";
        Element_container.innerHTML =
            "<h1 style='color:white;'>Nuestras Marcas</h1>" +
            "<div id='carousel-example' class='carousel slide' data-ride='carousel'>" +
            "<div id='interior' class='carousel-inner'>" +
            "</div></div>";
        document.getElementById("marcas").appendChild(Element_container);
        $.each(json, function(data) {
            if (data == 0) {
                var ElementDiv = document.createElement('div');
                ElementDiv.className = "item active"
                ElementDiv.innerHTML =
                    "<img id=" + json[data].nombre_marca + " class='imagen_carousel' style='display: block;margin-left: auto;margin-right: auto;width: 25%;padding-bottom:20px;' src='" + json[data].imagen_marca + "' alt='' />" +
                    "<div class='carousel-caption' style='bottom: -43px;'>" +
                    "<p class=''>" + json[data].nombre_marca + "</p>" +
                    "</div>";
                document.getElementById("interior").appendChild(ElementDiv);
            } else {
                var ElementDiv = document.createElement('div');
                ElementDiv.className = "item"
                ElementDiv.innerHTML =
                    "<img id=" + json[data].nombre_marca + " class='imagen_carousel' style='display: block;margin-left: auto;margin-right: auto;width: 25%;padding-bottom:20px;' src='" + json[data].imagen_marca + "' alt='' />" +
                    "<div class='carousel-caption' style='bottom: -43px;'>" +
                    "<p class=''>" + json[data].nombre_marca + "</p>" +
                    "</div>";
                document.getElementById("interior").appendChild(ElementDiv);
            }
            var continuar = 1;
        });
        var Element_container2 = document.createElement('ol');
        Element_container2.id = "carousel_ol";
        Element_container2.className = "carousel-indicators";
        Element_container2.style = "bottom: -30px;";
        document.getElementById("carousel-example").appendChild(Element_container2);
        $.each(json, function(data) {
            if (data == 0) {
                if (continuar = 1) {
                    var ElementDiv2 = document.createElement('li');
                    ElementDiv2.setAttribute('data-target', '#carousel-example');
                    ElementDiv2.setAttribute('data-slide-to', data);
                    ElementDiv2.className = "active";
                    document.getElementById("carousel_ol").appendChild(ElementDiv2);
                }
            } else {
                if (continuar = 1) {
                    var ElementDiv2 = document.createElement('li');
                    ElementDiv2.setAttribute('data-target', '#carousel-example');
                    ElementDiv2.setAttribute('data-slide-to', data);
                    document.getElementById("carousel_ol").appendChild(ElementDiv2);
                }
            }
        });
        $('.carousel').carousel({
            interval: 5000 //TIME IN MILLI SECONDS
        })
    }).fail(function(textStatus) {
        console.log(textStatus);
    });
}

function loadSlider_categorias() {
    $.ajax({
        url: 'index.php?page=home&op=categoria_carousel',
        type: 'GET',
        dataType: 'JSON',
        success(json) {
            var Element_container = document.createElement('section');
            Element_container.id = "port-sec";
            Element_container.className = "text-center";
            Element_container.style = "margin-top:-50px;";
            Element_container.innerHTML =
                "<h1 style='color:white;'>Tipo de Servicio</h1>" +
                "<div class='container'>" +
                "<div class='row pad-row'>" +
                "<div class='col-md-12 col-sm-12'>" +
                "<ul id='lista' class='portfolio-items col-3'>" +
                "</ul></div></div></div>";
            document.getElementById("categorias").appendChild(Element_container);
            $.each(json, function(data) {
                var ElementDiv = document.createElement('li');
                ElementDiv.id = json[data].nombre_categoria;
                ElementDiv.className = "portfolio-item"
                ElementDiv.innerHTML =
                    "<div class='item-main '>" +
                    "<div class='portfolio-image'>" +
                    "<img id='" + json[data].nombre_categoria + 1 + "' src='" + json[data].imagen_categoria + "' alt=''>" +
                    "<div class='overlay'>" +
                    "<a class='preview btn btn-primary categoria' title='Image Title Here' href=''>Ver " + json[data].nombre_categoria + "</a>" +
                    "</div>" +
                    "</div>" +
                    "<h5>" + json[data].nombre_categoria + "</h5>" +
                    "</div>" +
                    "</div>";
                document.getElementById("lista").appendChild(ElementDiv);
            });
            var Easteregg = Math.floor(Math.random() * 100);
            if (Easteregg == 1) {
                document.getElementById("Seminuevo1").src = "view/img/categorias/rickroll-roll.gif";
            }
        }
    })
}

function loadSlider_tipos() {
    $.ajax({
        url: 'index.php?page=home&op=tipo_carousel',
        type: 'GET',
        dataType: 'JSON',
        success(json) {
            var Element_container = document.createElement('section');
            Element_container.id = "port-sec";
            Element_container.className = "text-center";
            Element_container.style = "margin-top:-50px;";
            Element_container.innerHTML =
                "<h1 style='color:white;'>Tipo de Combustible</h1>" +
                "<div class='container'>" +
                "<div class='row pad-row'>" +
                "<div class='col-md-12 col-sm-12'>" +
                "<ul id='lista2' class='portfolio-items col-3'>" +
                "</ul></div></div></div>";
            document.getElementById("tipos").appendChild(Element_container);
            $.each(json, function(data) {
                var ElementDiv = document.createElement('li');
                ElementDiv.id = json[data].nombre_tipo;
                ElementDiv.className = "portfolio-item"
                ElementDiv.innerHTML =
                    "<div class='item-main '>" +
                    "<div class='portfolio-image'>" +
                    "<img id='" + json[data].nombre_tipo + "' src='" + json[data].imagen_tipo + "' alt=''>" +
                    "<div class='overlay'>" +
                    "<a id='" + json[data].nombre_tipo + "' class='preview btn btn-primary combustible' title='Image Title Here' href=''>Ver " + json[data].nombre_tipo + "</a>" +
                    "</div>" +
                    "</div>" +
                    "<h5>" + json[data].nombre_tipo + "</h5>" +
                    "</div>";
                document.getElementById("lista2").appendChild(ElementDiv);
            });
            var Easteregg = Math.floor(Math.random() * 100);
            if (Easteregg == 1) {
                document.getElementById("Diesel1").src = "view/img/tipo/ben.jpg";
            }
        }
    })
}

function clicks() {
    $(document).on("click", ".imagen_carousel", function() {
        var filter = [];
        /*  filter.push({ "Marca": [this.getAttribute('id')] }); */
        localStorage.removeItem('filter_marcas')
        localStorage.setItem('filter_marcas', this.id);
        setTimeout(function() {
            window.location.href = 'index.php?page=controller_shop&op=list';
        }), 250;
    })

    $(document).on("click", ".categoria", function() {
        var filter = [];
        filter.push({ "categoria": [this.getAttribute('id')] });
        localStorage.removeItem('filter')
        localStorage.setItem('filter', JSON.stringify(filter));
        setTimeout(function() {
            window.location.href = 'index.php?page=controller_shop&op=list';
        }), 250;
    })

    $(document).on("click", ".combustible", function() {
        var filter = [];
        /* filter.push({ "Tipo": [this.getAttribute('id')] }); */
        localStorage.removeItem('filter_combustible')
        localStorage.setItem('filter_combustible', this.id);
        setTimeout(function() {
            window.location.href = 'index.php?page=controller_shop&op=list';
        }), 250;
    })
}

function loadSlider_noticias() {
    ajaxPromise('http://ergast.com/api/f1/current/qualifying/1.json', 'GET', 'JSON')
        .then(function(json) {
            const data = json.MRData.RaceTable.Races
            const results = data.filter(element => {
                return element !== null;
            });
            var Element_content = document.createElement('div');
            Element_content.id = "content_notices";
            Element_content.className = "row text-center pad-row"
            Element_content.style = "color:white;with:50%;"
            document.getElementById("noticias").appendChild(Element_content);
            for (i = 0; i < 3; i++) {
                var Element_row = document.createElement('div');
                Element_row.id = 'interior_notices'
                Element_row.className = "col-md-4 col-sm-4"
                Element_row.innerHTML =
                    "<span><strong>" + results[i].raceName + "</strong></span><br><br>" +
                    "Gran premio realizado el " + results[i].date + " y el piloto ganador es " + results[i].QualifyingResults[0].Driver.givenName + " " +
                    results[i].QualifyingResults[0].Driver.familyName + " de la escuderia " + results[i].QualifyingResults[0].Constructor.name + " con un tiempo de " + results[i].QualifyingResults[0].Q3 + "<br><br>"
                document.getElementById("content_notices").appendChild(Element_row);
            }
            var Element_button = document.createElement('button');
            Element_button.id = "load_more_button";
            Element_button.className = "load_more btn btn-secondary";
            Element_button.style = "margin-left:47%;margin-right:50%;"
            Element_button.innerHTML = "Load More";
            document.getElementById("noticias").appendChild(Element_button);
            var num = 0
            $(".load_more").on("click", function() {
                delete data[num];
                num++;
                delete data[num];
                num++;
                delete data[num];
                num++;
                var results = data.filter(element => {
                    return element !== null;
                });
                if (results.length > 3) {
                    for (i = 0; i < 3; i++) {
                        var Element_row = document.createElement('div');
                        Element_row.id = 'interior_notices'
                        Element_row.className = "col-md-4 col-sm-4"
                        Element_row.innerHTML =
                            "<span><strong>" + results[i].raceName + "</strong></span><br><br>" +
                            "Gran premio realizado el " + results[i].date + ". El piloto ganador es " + results[i].QualifyingResults[0].Driver.givenName + " " +
                            results[i].QualifyingResults[0].Driver.familyName + " de la escuderia " + results[i].QualifyingResults[0].Constructor.name + " con un tiempo de " + results[i].QualifyingResults[0].Q3 + "<br><br>"
                        document.getElementById("content_notices").appendChild(Element_row);
                    }
                } else if (results.length == 3) {
                    for (i = 0; i < 3; i++) {
                        var Element_row = document.createElement('div');
                        Element_row.id = 'interior_notices'
                        Element_row.className = "col-md-4 col-sm-4"
                        Element_row.innerHTML =
                            "<span><strong>" + results[i].raceName + "</strong></span><br><br>" +
                            "Gran premio realizado el " + results[i].date + ". El piloto ganador es " + results[i].QualifyingResults[0].Driver.givenName + " " +
                            results[i].QualifyingResults[0].Driver.familyName + " de la escuderia " + results[i].QualifyingResults[0].Constructor.name + " con un tiempo de " + results[i].QualifyingResults[0].Q3 + "<br><br>"
                        document.getElementById("content_notices").appendChild(Element_row);
                        $(".load_more").remove();
                    }
                } else if (results.length == 2) {
                    for (i = 0; i < 2; i++) {
                        var Element_row = document.createElement('div');
                        Element_row.id = 'interior_notices'
                        Element_row.className = "col-md-4 col-sm-4"
                        Element_row.innerHTML =
                            "<span><strong>" + results[i].raceName + "</strong></span><br><br>" +
                            "Gran premio realizado el " + results[i].date + " y el piloto ganador es " + results[i].QualifyingResults[0].Driver.givenName + " " +
                            results[i].QualifyingResults[0].Driver.familyName + " de la escuderia " + results[i].QualifyingResults[0].Constructor.name + " con un tiempo de " + results[i].QualifyingResults[0].Q3 + "<br><br>"
                        document.getElementById("content_notices").appendChild(Element_row);
                        $(".load_more").remove();
                    }
                } else if (results.length == 1) {
                    var Element_row = document.createElement('div');
                    Element_row.id = 'interior_notices'
                    Element_row.className = "col-md-4 col-sm-4"
                    Element_row.innerHTML =
                        "<span><strong>" + results[0].raceName + "</strong></span><br><br>" +
                        "Gran premio realizado el " + results[0].date + " y el piloto ganador es " + results[0].QualifyingResults[0].Driver.givenName + " " +
                        results[0].QualifyingResults[0].Driver.familyName + " de la escuderia " + results[0].QualifyingResults[0].Constructor.name + " con un tiempo de " + results[0].QualifyingResults[0].Q3 + "<br><br>"
                    document.getElementById("content_notices").appendChild(Element_row);
                    $(".load_more").remove();
                }
            })
        }).catch(function(e) {
            /* console.log(e); */
        });
}

function loadDivs() {
    loadSlider_marcas();
    loadSlider_categorias();
    loadSlider_tipos();
    loadSlider_noticias();
    clicks();
}

$(document).ready(function() {
    loadDivs();

});