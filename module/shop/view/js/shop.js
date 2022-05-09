function load_shop_list(num_pag = 0, num_item = 4) {
    ajaxPromise('index.php?page=shop&op=list',
            'POST', 'JSON', { num_pag: num_pag, num_item: num_item })
        .then(function(json) {
            $("#shop_list").empty();
            var Element_container = document.createElement('div');
            Element_container.id = "shop_container";
            Element_container.innerHTML =
                "<div class='w3-container' style='text-align: center;background-color:#222222;margin-top:-20px;'>" +
                "<br><br><br><br><h2 id='titulo_lista' style='color:white;font-size:32px'>LISTA DE COCHES</h2>" +
                "</div>" +
                "<div id='todo' style='display: inline-flex;' >" +
                "<div id='formulario'></div>" +
                "<div id='container' class='container' style='display:flex;flex-direction: column-reverse;flex-wrap: wrap-reverse;'>" +
                "<div id='content' class='content row' style='width:60%;align-items: center;display: flex;flex-wrap: wrap;justify-content: space-between;margin-left:auto;margin-right:40%;'>" +
                "</div></div></div><div id='map' style='position: absolute; top: 1; bottom: 0; right: 0; width: 600px; height: 620px;margin-left: auto;margin-right: 10px;margin-bottom:10px;border-radius:5px ;'></div>";
            document.getElementById("shop_list").appendChild(Element_container);

            /* FILTROS */
            filtros(num_pag, num_item);

            $.each(json, function(data) {
                var ElementDiv = document.createElement('div');
                ElementDiv.id = "interior";
                ElementDiv.className = "col-md-6";
                ElementDiv.style = "margin-bottom:30px;";
                ElementDiv.innerHTML =
                    "<div id='" + json[data].ID + "' class='wrapper'>" +
                    "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                    "<br><div style='' class='car'>" +
                    "<img style='width:306px;height:204.41px;' src='" + json[data].imagen + "'></div>" +
                    "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[data].Marca + " " + json[data].Modelo + "</div>" +
                    "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[data].precio + "€" + "</div></div></div>" +
                    /*  "<div class='list__heart' id='" + json[data].ID + "' style='position:absolute;margin-left:0px;margin-top:-32px;'><button id='" + json[data].ID + "' class='btn btn-primary btn-sm like_button'><img id='heart' class='bx bx-heart' src='view/img/heart.png' style='width:20px;heigth:20px;'>100</div>" */
                    "<div class='list__heart' id='" + json[data].ID + "'><img id='like_" + json[data].ID + "' class='bx-heart'></div>";
                document.getElementById("content").appendChild(ElementDiv);
            });
            mapbox_settings_filter('map', json);


            $(".wrapper").on("click", function() {
                var id = this.getAttribute('id');
                load_shop_details(id);
            })

            $('#order_by').on('change', function() {
                var orden = [];
                let order = $(this).val();
                if (order === 0) {
                    orden.push({ "Orden": 'no' });
                    localStorage.setItem('order', JSON.stringify(order));
                    window.location.href = 'index.php?page=controller_shop&op=list';
                } else {
                    orden.push({ "Orden": $(this).val() });
                    localStorage.setItem('order', JSON.stringify(order));
                    window.location.href = 'index.php?page=controller_shop&op=list';
                }
            });

            load_like();
        }).catch(function(e) {
            console.log(e);
        });
}

function load_shop_details(id, loadeds = 0, items = 4) {
    ajaxPromise("index.php?page=shop&op=select_details&ID=" + id, 'GET', 'JSON')
        .then(function(json) {
            $("#shop_list").empty();
            $("#pagination").empty();
            var Element_container = document.createElement('section');
            Element_container.id = "details_2";
            Element_container.className = "text-center";
            Element_container.style = "margin-top:-90px;background-color:#7a7a7a;";
            Element_container.innerHTML =
                "<div id='general' style='margin-left:750px;'><br><br><br><br><br><br><br><fieldset id='contenido_pag'><legend style='color:white;width:auto;'>" + json[0][0].Marca + " " + json[0][0].Modelo + "</legend>" +
                "<div id='carousel-example' class='carousel slide' data-ride='carousel'>" +
                "<div id='interior' class='carousel-inner'>" +
                "</div></div>" +
                "<div id='datos_car' style='color:white;margin-top:-120px;'>" +
                "<table style='width:30%;margin-left: auto;margin-right: auto;background-color:#7a7a7a;border-style:groove;border-radius: 10px;border-color: #222222;'>" +
                "<tbody>" +
                "<tr style='font-size:26px;margin-top:20px;'><td style='text-align:left;'>Precio: </td><td style='text-align:right;color:red;'>" + json[0][0].precio + "€" + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Fabricante: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Marca + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Modelo: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Modelo + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Motor: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Motor + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Tipo de Combustible: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Tipo + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Caballos: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Caballos + "CV" + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Numero de Bastidor: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].NBast + "</td></tr><br>" +
                "<tr><td style='text-align:left;padding-left:4px;'>Matricula: </td><td style='text-align:right;padding-right:4px;'>" + json[0][0].Matricula + "</td></tr><br>" +
                "</tbody></table><br><br><br><br><br></div>" +
                "</fieldset></div>" +
                "<div id='map' style='position: relative; top: 0; bottom: 0; width: 750px; height: 600px;margin-left: 0px;margin-right: auto;margin-top:-700px;'></div>" +
                "<div class='list__heart' id='" + json[0][0].ID + "' style='margin-left:32.5%;'><img id='like_" + json[0][0].ID + "' class='bx-heart'></div>" +
                "<h3 class='brand__title' style='background-color:#7a7a7a'>Relacionados</h3>";
            document.getElementById("shop_list").appendChild(Element_container);
            for (row in json[1][0]) {
                if (row == 0) {
                    var ElementDiv = document.createElement('div');
                    ElementDiv.className = "item active"
                    ElementDiv.innerHTML =
                        "<img id=" + json[1][0][row].ruta_imagen + " class='' style='display: block;margin-left: auto;margin-right: auto;width: 60%;width:  500px;height: 350px;object-fit: cover;' src='" + json[1][0][row].ruta_imagen + "' alt='' />" +
                        "<div class='carousel-caption' style='bottom: -50px;'>" +
                        "</div>";
                    document.getElementById("interior").appendChild(ElementDiv);
                } else {
                    var ElementDiv = document.createElement('div');
                    ElementDiv.className = "item"
                    ElementDiv.innerHTML =
                        "<img id=" + json[1][0][row].ruta_imagen + " class='' style='display: block;margin-left: auto;margin-right: auto;width: 60%;width:  500px;height: 350px;object-fit: cover;' src='" + json[1][0][row].ruta_imagen + "' alt='' />" +
                        "<div class='carousel-caption' style='bottom: -50px;'>" +
                        "</div>";
                    document.getElementById("interior").appendChild(ElementDiv);
                }
            };

            var Element_container2 = document.createElement('ol');
            Element_container2.id = "carousel_ol";
            Element_container2.className = "carousel-indicators";
            Element_container2.style = "margin-bottom:-45px;";
            document.getElementById("carousel-example").appendChild(Element_container2);
            for (row in json[1][0]) {
                if (row == 0) {
                    var ElementDiv2 = document.createElement('li');
                    ElementDiv2.setAttribute('data-target', '#carousel-example');
                    ElementDiv2.setAttribute('data-slide-to', row);
                    ElementDiv2.className = "active";
                    document.getElementById("carousel_ol").appendChild(ElementDiv2);
                } else {
                    var ElementDiv2 = document.createElement('li');
                    ElementDiv2.setAttribute('data-target', '#carousel-example');
                    ElementDiv2.setAttribute('data-slide-to', row);
                    document.getElementById("carousel_ol").appendChild(ElementDiv2);
                }
            };
            load_like();
            var Element_related = document.createElement('div');
            Element_related.id = "more";
            Element_related.className = "more";
            Element_related.innerHTML =
                "<div id='results' class='results'></div>" +
                "<div class='brand_button'>" +
                "<button class='load_more btn btn-secondary' id='load_more_button'>Load More</button>" +
                "</div>";
            document.getElementById("more_related").appendChild(Element_related);
            id_principal = json[0][0].ID;
            $.ajax({
                url: 'index.php?page=shop&op=select_relacionados',
                type: 'POST',
                dataType: 'JSON',
                data: { 'related': json[0][0].Marca, 'no_repeat': json[0][0].ID, 'loadeds': loadeds, 'items': items },
            }).done(function(json) {
                /* ajaxPromise("index.php?page=shop&op=select_relacionados", 'POST', 'JSON', { 'related': json[0].Marca, 'no_repeat': json[0].ID, 'loadeds': loadeds, 'items': items })
                    .then(function(json) { */
                const data = json
                const results = data.filter(element => {
                    return element !== null;
                });
                for (i = 0; i < 4; i++) {
                    var Element_relateds = document.createElement('div');
                    Element_relateds.id = "relateds";
                    Element_relateds.className = "col-md-3";
                    Element_relateds.innerHTML =
                        "<div id='" + json[i].ID + "' class='wrapper'>" +
                        "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                        "<br><div style='' class='car'>" +
                        "<img style='width:100%;height:204.41px;' src='" + json[i].imagen + "'></div>" +
                        "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[i].Marca + " " + json[i].Modelo + "</div>" +
                        "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[i].precio + "€" + "</div>" +
                        "</div></div><div class='list__heart' id='" + json[i].ID + "''><img id='like_" + json[i].ID + "' class='bx-heart'></div>";
                    document.getElementById("results").appendChild(Element_relateds);
                    load_like();
                };
                var num = 0
                $(".load_more").on("click", function() {
                    delete data[num];
                    num++;
                    delete data[num];
                    num++;
                    delete data[num];
                    num++;
                    delete data[num];
                    num++;
                    var results = data.filter(element => {
                        return element !== null;
                    });
                    if (results.length > 4) {
                        for (i = 0; i < 4; i++) {
                            var Element_relateds = document.createElement('div');
                            Element_relateds.id = "relateds";
                            Element_relateds.className = "col-md-3";
                            Element_relateds.innerHTML =
                                "<div id='" + results[i].ID + "' class='wrapper'>" +
                                "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                                "<br><div style='' class='car'>" +
                                "<img style='width:100%;height:204.41px;' src='" + results[i].imagen + "'></div>" +
                                "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + results[i].Marca + " " + results[i].Modelo + "</div>" +
                                "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + results[i].precio + "€" + "</div>" +
                                "</div></div><div class='list__heart' id='" + results[i].ID + "''><img id='like_" + results[i].ID + "' class='bx-heart'></div>";
                            document.getElementById("results").appendChild(Element_relateds);
                        }
                    } else if (results.length == 4) {
                        for (i = 0; i < 4; i++) {
                            var Element_relateds = document.createElement('div');
                            Element_relateds.id = "relateds";
                            Element_relateds.className = "col-md-3";
                            Element_relateds.innerHTML =
                                "<div id='" + results[i].ID + "' class='wrapper'>" +
                                "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                                "<br><div style='' class='car'>" +
                                "<img style='width:100%;height:204.41px;' src='" + results[i].imagen + "'></div>" +
                                "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + results[i].Marca + " " + results[i].Modelo + "</div>" +
                                "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + results[i].precio + "€" + "</div>" +
                                "</div></div><div class='list__heart' id='" + results[i].ID + "''><img id='like_" + results[i].ID + "' class='bx-heart'></div>";
                            document.getElementById("results").appendChild(Element_relateds);
                            $(".load_more").remove();
                        }
                    } else if (results.length == 3) {
                        for (i = 0; i < 3; i++) {
                            var Element_relateds = document.createElement('div');
                            Element_relateds.id = "relateds";
                            Element_relateds.className = "col-md-3";
                            Element_relateds.innerHTML =
                                "<div id='" + results[i].ID + "' class='wrapper'>" +
                                "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                                "<br><div style='' class='car'>" +
                                "<img style='width:100%;height:204.41px;' src='" + results[i].imagen + "'></div>" +
                                "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + results[i].Marca + " " + results[i].Modelo + "</div>" +
                                "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + results[i].precio + "€" + "</div>" +
                                "</div></div><div class='list__heart' id='" + results[i].ID + "''><img id='like_" + results[i].ID + "' class='bx-heart'></div>";
                            document.getElementById("results").appendChild(Element_relateds);
                            $(".load_more").remove();
                        }
                    } else if (results.length == 2) {
                        for (i = 0; i < 2; i++) {
                            var Element_relateds = document.createElement('div');
                            Element_relateds.id = "relateds";
                            Element_relateds.className = "col-md-3";
                            Element_relateds.innerHTML =
                                "<div id='" + results[i].ID + "' class='wrapper'>" +
                                "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                                "<br><div style='' class='car'>" +
                                "<img style='width:100%;height:204.41px;' src='" + results[i].imagen + "'></div>" +
                                "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + results[i].Marca + " " + results[i].Modelo + "</div>" +
                                "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + results[i].precio + "€" + "</div>" +
                                "</div></div><div class='list__heart' id='" + results[i].ID + "''><img id='like_" + results[i].ID + "' class='bx-heart'></div>";
                            document.getElementById("results").appendChild(Element_relateds);
                            $(".load_more").remove();
                        }
                    } else if (results.length == 1) {

                        var Element_relateds = document.createElement('div');
                        Element_relateds.id = "relateds";
                        Element_relateds.className = "col-md-3";
                        Element_relateds.innerHTML =
                            "<div id='" + results[0].ID + "' class='wrapper'>" +
                            "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                            "<br><div style='' class='car'>" +
                            "<img style='width:306px;height:204.41px;' src='" + results[0].imagen + "'></div>" +
                            "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + results[0].Marca + " " + results[0].Modelo + "</div>" +
                            "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + results[0].precio + "€" + "</div>" +
                            "</div></div><div class='list__heart' id='" + results[0].ID + "''><img id='like_" + results[0].ID + "' class='bx-heart'></div>";
                        document.getElementById("results").appendChild(Element_relateds);
                        $(".load_more").remove();
                        load_like();

                    }
                    $(".wrapper").on("click", function() {
                        var id = this.getAttribute('id');
                        ajaxPromise("index.php?page=shop&op=update_count&ID=" + id, 'GET', 'JSON')
                            .then(function() {
                                $("#results").empty();
                                $("#more").remove();
                                load_shop_details(id);
                            }).catch(function(e) {
                                console.log(e);
                            });
                    })
                })
                $(".wrapper").on("click", function() {
                    var id = this.getAttribute('id');
                    ajaxPromise("index.php?page=shop&op=update_count&ID=" + id, 'GET', 'JSON')
                        .then(function() {
                            $("#results").empty();
                            $("#more").remove();
                            load_shop_details(id);
                        }).catch(function(e) {
                            console.log(e);
                        });
                })
            }).fail(function(e) {
                /* console.log(e); */
            });
            mapbox_settings('map', json[0]);

        }).catch(function(e) {
            console.log(e);
        });
    $('.carousel').carousel({
        interval: 5000 //TIME IN MILLI SECONDS
    })
}

function filtros(num_pag, num_item) {
    ajaxPromise("index.php?page=shop&op=print_filter_data", 'POST', 'JSON')
        .then(function(json) {
            //console.log(json);
            var Element_filter = document.createElement('div');
            Element_filter.id = "filter";
            Element_filter.style = "width:10%;margin-left:20px;margin-right:20px;margin-top:25px;";
            Element_filter.innerHTML =
                "<div id='interior_formulario'>" +
                "<span>Marcas:</span><br>" +
                "<select id='select_marcas' class='filter_marcas'><option value=''>-</option></select><br><br>" +
                "<span>Combustible:</span><br>" +
                "<select id='select_combustible' class='filter_combustible'><option value=''>-</option></select><br><br>" +
                "<input type='button' class='btn btn-secondary aplicar_filtros_button' id='apply_filters' value='Aplicar Filtros'>" +
                "</div>";
            document.getElementById("formulario").appendChild(Element_filter);
            for (row in json[0]) {
                var Element_marcas = document.createElement('option');
                Element_marcas.id = json[0][row].nombre_marca + "_id";
                Element_marcas.value = json[0][row].nombre_marca;
                Element_marcas.innerHTML = json[0][row].nombre_marca;
                document.getElementById("select_marcas").appendChild(Element_marcas);
            };
            for (row in json[1][0]) {
                //console.log(json[1][0][row]);
                var Element_tipo = document.createElement('option');
                Element_tipo.id = json[1][0][row].nombre_tipo + "_id";
                Element_tipo.value = json[1][0][row].nombre_tipo;
                Element_tipo.innerHTML = json[1][0][row].nombre_tipo;
                document.getElementById("select_combustible").appendChild(Element_tipo);
            };
            aplicar_filtros_button(num_pag, num_item);
            if (localStorage.getItem('filter_combustible') || localStorage.getItem('filter_marcas')) {
                home_redirect_filtros();
            }

            /* if (localStorage.getItem('order')) {
                var order_name = JSON.parse(localStorage.getItem('order'))
                console.log(order_name);
                order_redirect(order_name);
            } */

            if (localStorage.getItem('search')) {
                var data_search = JSON.parse(localStorage.getItem('search'));


                search_redirect_filtros(data_search);
            }
        }).catch(function(e) {
            console.log(e);
        });

}

function home_redirect_filtros(num_pag = 0, num_item = 4) {
    $(function() {
        $(".filter_marcas").change(function() {
            localStorage.setItem("filter_marcas", this.value);
        });
        if (localStorage.getItem('filter_marcas')) {
            $('.filter_marcas').val(localStorage.getItem('filter_marcas'));
        }
    });
    $(function() {
        $('.filter_combustible').change(function() {
            localStorage.setItem('filter_combustible', this.value);
        });
        if (localStorage.getItem('filter_combustible')) {
            $('.filter_combustible').val(localStorage.getItem('filter_combustible'));
        }

    });
    var filter = [];
    if (localStorage.getItem('filter_marcas')) {
        filter.push(['Marca', localStorage.getItem('filter_marcas')])
    }
    if (localStorage.getItem('filter_combustible')) {
        filter.push(['Tipo', localStorage.getItem('filter_combustible')])
    }

    highlightFilters(filter);
    ajaxPromise('index.php?page=shop&op=filters', 'POST', 'JSON', { 'filter': filter, num_pag: num_pag, num_item: num_item })
        .then(function(json) {
            $("#shop_list").empty();
            var Element_container = document.createElement('div');
            Element_container.id = "shop_container";
            Element_container.innerHTML =
                "<div class='w3-container' style='text-align: center;background-color:#222222;margin-top:-20px;'>" +
                "<br><br><br><br><h2 style='color:white;font-size:32px'>LISTA DE COCHES</h2>" +
                "</div>" +
                "<div id='todo' style='display: inline-flex;' >" +
                "<div id='formulario'></div>" +
                "<div id='container' class='container' style='display:flex;flex-direction: column-reverse;flex-wrap: wrap-reverse;'>" +
                "<div id='content' class='content row' style='width:60%;align-items: center;display: flex;flex-wrap: wrap;justify-content: space-between;margin-left:auto;margin-right:40%;'>" +
                "</div></div></div><div id='map' style='position: absolute; top: 1; bottom: 0; right: 0; width: 600px; height: 620px;margin-left: auto;margin-right: 10px;margin-bottom:10px;border-radius:5px ;'></div>" +
                "<div id='pagination1'></div>";
            document.getElementById("shop_list").appendChild(Element_container);

            /* FILTROS */
            filtros_button_borrar();


            $.each(json, function(data) {
                var ElementDiv = document.createElement('div');
                ElementDiv.id = "interior";
                ElementDiv.className = "col-md-6";
                ElementDiv.innerHTML =
                    "<div id='" + json[data].ID + "' class='wrapper'>" +
                    "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                    "<br><div style='' class='car'>" +
                    "<img style='width:306px;height:204.41px;' src='" + json[data].imagen + "'></div>" +
                    "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[data].Marca + " " + json[data].Modelo + "</div>" +
                    "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[data].precio + "€" + "</div>" +
                    "</div>" +
                    "<div class='list__heart' id='" + json[data].ID + "'><img id='like_" + json[data].ID + "' class='bx-heart'></div>";
                document.getElementById("content").appendChild(ElementDiv);
            });
            load_like();
            mapbox_settings_filter('map', json);

            $(".wrapper").on("click", function() {
                var id = this.getAttribute('id');
                ajaxPromise("index.php?page=shop&op=update_count&ID=" + id, 'GET', 'JSON')
                    .then(function() {
                        load_shop_details(id);
                    }).catch(function(e) {
                        console.log(e);
                    });
            })
            for (row in json) {
                $(".marker_" + json[row].ID).on("click", function() {
                    var id = this.getAttribute('id');
                    load_shop_details(id);
                })
            }

        }).catch(function(e) {
            console.log(e);
        });
}

function order_redirect(order) {

    /* data1 = Object.values(data_search[0]);
    data2 = Object.values(data_search[1]);
    data3 = Object.values(data_search[2]);

    const array1 = data1[0].concat(data2[0], data3[0]);
    console.log(array1); */

    ajaxPromise('index.php?page=shop&op=order_by&Orden=' + order, 'GET', 'JSON')
        .then(function(json) {
            console.log(json);
            $("#shop_list").empty();
            var Element_container = document.createElement('div');
            Element_container.id = "shop_container";
            Element_container.innerHTML =
                "<div class='w3-container' style='text-align: center;background-color:#222222;margin-top:-20px;'>" +
                "<br><br><br><br><h2 style='color:white;font-size:32px'>LISTA DE COCHES</h2>" +
                "</div>" +
                "<div id='todo' style='display: inline-flex;' >" +
                "<div id='formulario'></div>" +
                "<div id='container' class='container' style='display:flex;flex-direction: column-reverse;flex-wrap: wrap-reverse;'>" +
                "<div id='content' class='content row' style='width:60%;align-items: center;display: flex;flex-wrap: wrap;justify-content: space-between;margin-left:auto;margin-right:40%;'>" +
                "</div></div></div><div id='map' style='position: absolute; top: 1; bottom: 0; right: 0; width: 600px; height: 620px;margin-left: auto;margin-right: 10px;margin-bottom:10px;border-radius:5px ;'></div>";
            document.getElementById("shop_list").appendChild(Element_container);

            /* FILTROS */
            filtros_button_borrar();


            $.each(json, function(data) {
                var ElementDiv = document.createElement('div');
                ElementDiv.id = "interior";
                ElementDiv.className = "col-md-6";
                ElementDiv.innerHTML =
                    "<div id='" + json[data].ID + "' class='wrapper'>" +
                    "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                    "<br><div style='' class='car'>" +
                    "<img style='width:100%;' src='" + json[data].imagen + "'></div>" +
                    "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[data].Marca + " " + json[data].Modelo + "</div>" +
                    "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[data].precio + "€" + "</div>" +
                    "</div>";
                document.getElementById("content").appendChild(ElementDiv);
            });
            mapbox_settings_filter('map', json);

            $(".wrapper").on("click", function() {
                var id = this.getAttribute('id');
                ajaxPromise("index.php?page=shop&op=update_count&ID=" + id, 'GET', 'JSON')
                    .then(function() {
                        load_shop_details(id);
                    }).catch(function(e) {
                        console.log(e);
                    });
            })
            for (row in json) {
                $(".marker_" + json[row].ID).on("click", function() {
                    var id = this.getAttribute('id');
                    load_shop_details(id);
                })
            }

        }).catch(function(e) {
            console.log(e);
        })
}

function search_redirect_filtros(data_search) {

    /* data1 = Object.values(data_search[0]);
    data2 = Object.values(data_search[1]);
    data3 = Object.values(data_search[2]);

    const array1 = data1[0].concat(data2[0], data3[0]);
    console.log(array1); */

    /* ajaxPromise('index.php?page=shop&op=search', 'POST', 'JSON', { 'data_search': data_search })
        .then(function(json) { */
    $.ajax({
        url: 'index.php?page=shop&op=search',
        type: 'POST',
        dataType: 'JSON',
        data: { 'data_search': data_search }
    }).done(function(json) {
        console.log(json);
        $("#shop_list").empty();
        var Element_container = document.createElement('div');
        Element_container.id = "shop_container";
        Element_container.innerHTML =
            "<div class='w3-container' style='text-align: center;background-color:#222222;margin-top:-20px;'>" +
            "<br><br><br><br><h2 style='color:white;font-size:32px'>LISTA DE COCHES</h2>" +
            "</div>" +
            "<div id='todo' style='display: inline-flex;' >" +
            "<div id='formulario'></div>" +
            "<div id='container' class='container' style='display:flex;flex-direction: column-reverse;flex-wrap: wrap-reverse;'>" +
            "<div id='content' class='content row' style='width:60%;align-items: center;display: flex;flex-wrap: wrap;justify-content: space-between;margin-left:auto;margin-right:40%;'>" +
            "</div></div></div><div id='map' style='position: absolute; top: 1; bottom: 0; right: 0; width: 600px; height: 620px;margin-left: auto;margin-right: 10px;margin-bottom:10px;border-radius:5px ;'></div>";
        document.getElementById("shop_list").appendChild(Element_container);

        /* FILTROS */
        filtros_button_borrar();


        $.each(json, function(data) {
            var ElementDiv = document.createElement('div');
            ElementDiv.id = "interior";
            ElementDiv.className = "col-md-6";
            ElementDiv.innerHTML =
                "<div id='" + json[data].ID + "' class='wrapper'>" +
                "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                "<br><div style='' class='car'>" +
                "<img style='width:100%;' src='" + json[data].imagen + "'></div>" +
                "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[data].Marca + " " + json[data].Modelo + "</div>" +
                "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[data].precio + "€" + "</div>" +
                "</div>";
            document.getElementById("content").appendChild(ElementDiv);
        });
        mapbox_settings_filter('map', json);

        $(".wrapper").on("click", function() {
            var id = this.getAttribute('id');
            ajaxPromise("index.php?page=shop&op=update_count&ID=" + id, 'GET', 'JSON')
                .then(function() {
                    load_shop_details(id);
                }).catch(function(e) {
                    console.log(e);
                });
        })
        for (row in json) {
            $(".marker_" + json[row].ID).on("click", function() {
                var id = this.getAttribute('id');
                load_shop_details(id);
            })
        }

    }).fail(function(e) {
        console.log(e);
    });
}

function filtros_button_borrar() {
    ajaxPromise("index.php?page=shop&op=print_filter_data", 'POST', 'JSON')
        .then(function(json) {
            /* console.log(json[0]); */
            $("#formulario").empty();
            var Element_filter = document.createElement('div');
            Element_filter.id = "filter";
            Element_filter.style = "width:10%;margin-left:20px;margin-right:20px;margin-top:25px;";
            Element_filter.innerHTML =
                "<div id='interior_formulario'>" +
                "<span>Marcas:</span><br>" +
                "<select id='select_marcas' class='filter_marcas'><option value=''>-</option></select><br><br>" +
                "<span>Combustible:</span><br>" +
                "<select id='select_combustible' class='filter_combustible'><option value=''>-</option></select><br><br>" +
                "<input type='button' class='btn btn-secondary aplicar_filtros_button' id='apply_filters' value='Aplicar Filtros'><br><br>" +
                "<input type='button' class='btn btn-danger borrar_filtros' id='borrar_filtros' value='Borrar Filtros'>" +
                "</div>";
            document.getElementById("formulario").appendChild(Element_filter);
            for (row in json[0]) {
                var Element_marcas = document.createElement('option');
                Element_marcas.id = json[0][row].nombre_marca + "_id";
                Element_marcas.value = json[0][row].nombre_marca;
                Element_marcas.innerHTML = json[0][row].nombre_marca;
                document.getElementById("select_marcas").appendChild(Element_marcas);
            };
            for (row in json[1][0]) {
                //console.log(json[1][0][row]);
                var Element_tipo = document.createElement('option');
                Element_tipo.id = json[1][0][row].nombre_tipo + "_id";
                Element_tipo.value = json[1][0][row].nombre_tipo;
                Element_tipo.innerHTML = json[1][0][row].nombre_tipo;
                document.getElementById("select_combustible").appendChild(Element_tipo);
            };

            aplicar_filtros_button();

            $(".borrar_filtros").on("click", function() {
                $("#shop_list").empty();
                localStorage.removeItem('search');
                localStorage.removeItem('filter_marcas');
                localStorage.removeItem('filter_combustible');
                localStorage.removeItem('order');
                load_shop_list();
                location.reload();

            })
        }).catch(function(e) {
            //console.log(e);
        });

}

function aplicar_filtros_button(num_pag, num_item) {
    $(function() {
        $(".filter_marcas").change(function() {
            localStorage.setItem("filter_marcas", this.value);
        });
        if (localStorage.getItem('filter_marcas')) {
            $('.filter_marcas').val(localStorage.getItem('filter_marcas'));
        }
    });
    $(function() {
        $('.filter_combustible').change(function() {
            localStorage.setItem('filter_combustible', this.value);
        });
        if (localStorage.getItem('filter_combustible')) {
            $('.filter_combustible').val(localStorage.getItem('filter_combustible'));
        }

    });

    $(document).on("click", ".aplicar_filtros_button", function() {
        var filter = [];
        location.reload();
        if (localStorage.getItem('filter_marcas')) {
            filter.push(['Marca', localStorage.getItem('filter_marcas')])
        }
        if (localStorage.getItem('filter_combustible')) {
            filter.push(['Tipo', localStorage.getItem('filter_combustible')])
        }

        highlightFilters(filter);

        ajaxPromise('index.php?page=shop&op=filters', 'POST', 'JSON', { 'filter': filter, num_pag: num_pag, num_item: num_item })
            .then(function(json) {
                $("#shop_list").empty();
                var Element_container = document.createElement('div');
                Element_container.id = "shop_container";
                Element_container.innerHTML =
                    "<div class='w3-container' style='text-align: center;background-color:#222222;margin-top:-20px;'>" +
                    "<br><br><br><br><h2 style='color:white;font-size:32px'>LISTA DE COCHES</h2>" +
                    "</div>" +
                    "<div id='todo' style='display: inline-flex;' >" +
                    "<div id='formulario'></div>" +
                    "<div id='container' class='container' style='display:flex;flex-direction: column-reverse;flex-wrap: wrap-reverse;'>" +
                    "<div id='content' class='content row' style='width:60%;align-items: center;display: flex;flex-wrap: wrap;justify-content: space-between;margin-left:auto;margin-right:40%;'>" +
                    "</div></div></div><div id='map' style='position: absolute; top: 1; bottom: 0; right: 0; width: 600px; height: 620px;margin-left: auto;margin-right: 10px;margin-bottom:10px;border-radius:5px ;'></div>" +
                    "<div id='pagination1'></div>";
                document.getElementById("shop_list").appendChild(Element_container);

                /* FILTROS */
                filtros_button_borrar();


                $.each(json, function(data) {
                    var ElementDiv = document.createElement('div');
                    ElementDiv.id = "interior";
                    ElementDiv.className = "col-md-6";
                    ElementDiv.innerHTML =
                        "<div id='" + json[data].ID + "' class='wrapper'>" +
                        "<div id='imagen' class='img' style='border-style:solid;border-color:#a7a7a7;border-radius: 10px;margin-top:5px;'>" +
                        "<br><div style='' class='car'>" +
                        "<img style='width:306px;height:204.41px;' src='" + json[data].imagen + "'></div>" +
                        "<div style='text-align:center;font-size:32px;font-weight:bold;'>" + json[data].Marca + " " + json[data].Modelo + "</div>" +
                        "<div style='text-align:right;font-size:18px;font-weight:bold;color:red;'>" + json[data].precio + "€" + "</div>" +
                        "</div>";
                    document.getElementById("content").appendChild(ElementDiv);
                });
                mapbox_settings_filter('map', json);

                $(".wrapper").on("click", function() {
                    var id = this.getAttribute('id');
                    load_shop_details(id);
                })
                for (row in json) {
                    $(".marker_" + json[row].ID).on("click", function() {
                        var id = this.getAttribute('id');
                        load_shop_details(id);
                    })
                }

                var pagination = document.createElement('div');
                pagination.id = "pagination";
                pagination.style = "text-align:center;"
                document.getElementById("pagination1").appendChild(pagination);
            }).catch(function(e) {
                /* console.log(e); */
            });
    });
}

function highlightFilters(filter) {
    if (filter) {
        for (row in filter) {
            /* console.log(filter); */
            let content = filter[row][1] + '_id';
            /* console.log(content); */
            document.getElementById(content).setAttribute("selected", true);
        }
    }
}

function mapbox_settings(container_id, json) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pY2FiaWRhIiwiYSI6ImNrenlnMW9oZjAwMG8zYnBidGQyazVxYTYifQ.SO_xuGsPgaRlWGLlqOq9MA';
    const map = new mapboxgl.Map({
        container: container_id, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-0.61667, 38.81667], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    /* data = Object.entries(json);
    const marker = new mapboxgl.Marker()
        .setLngLat([data[16][1], data[15][1]])
        .addTo(map); */
    data = Object.keys(json);
    for (row in data) {
        const marker = new mapboxgl.Marker()
            .setLngLat([json[row].lon, json[row].lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<h3>' + json[row].Marca + ' ' + json[row].Modelo + '</h3><br><img src="' + json[row].imagen + '" style="width:100%;heigth:250px;"></img><br><h4>' + json[row].city + '</h4>'))
            .addTo(map);
    }
}

function mapbox_settings_filter(container_id, json) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pY2FiaWRhIiwiYSI6ImNrenlnMW9oZjAwMG8zYnBidGQyazVxYTYifQ.SO_xuGsPgaRlWGLlqOq9MA';
    const map = new mapboxgl.Map({
        container: container_id, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-0.61667, 38.81667], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    data = Object.keys(json);
    marcador = 0;
    for (row in data) {
        const marker = new mapboxgl.Marker()
            .setLngLat([json[row].lon, json[row].lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<div id="marker" class="' + json[row].ID + '"><h3 style="text-align:center;">' + json[row].Marca + ' ' + json[row].Modelo + '</h3><br><img src="' + json[row].imagen + '" style="width:100%;heigth:250px;">' + json[row].city + '</h4></div>'))
            .addTo(map);
        data2 = Object.entries(json);
        marker.getElement().addEventListener('dblclick', function() {

        });

    }
    /* marker.addEventListener("click", function() {
            load_shop_details(json[row].ID);
        }) */
    /* document.addEventListener("click", add_listener("marker_" + json[row].ID)); */



    /* let latlang = new mapboxgl.LngLat(json[0].lon, json[0].lat);
    let marker = new mapboxgl.Marker()
        .setLngLat(latlang)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + json[0].Marca + " " + json[0].Modelo + '</h3>'))
        .addTo(map); */
}

function load_pagination() {
    if (localStorage.getItem('filter_marcas') && !localStorage.getItem('filter_combustible')) {
        let datos = [localStorage.getItem('filter_marcas'), "no"];
        var url = "index.php?page=shop&op=select_count_filters&datos=" + datos;
    } else if (!localStorage.getItem('filter_marcas') && localStorage.getItem('filter_combustible')) {
        let datos = ["no", localStorage.getItem('filter_combustible')];
        var url = "index.php?page=shop&op=select_count_filters&datos=" + datos;
    } else if (localStorage.getItem('filter_marcas') && localStorage.getItem('filter_combustible')) {
        let datos = [localStorage.getItem('filter_marcas'), localStorage.getItem('filter_combustible')];
        var url = "index.php?page=shop&op=select_count_filters&datos=" + datos;
    } else {
        var url = "index.php?page=shop&op=select_count";
    }
    ajaxPromise(url, 'POST', 'JSON')
        .then(function(data) {

            var total_pages = 0;
            var total_coches = data[0].n_coches;

            if (total_coches >= 4) {
                total_pages = total_coches / 4;
                total_pages_rounded = Math.ceil(total_pages)
            } else {
                total_pages_rounded = 1;
            }

            $('#pagination').bootpag({
                total: total_pages_rounded,
                page: 1,
                maxVisible: total_pages_rounded
            }).on('page', function(event, num) {
                total_coches = 4 * (num - 1);
                load_shop_list(total_coches, 4);
                $('html, body').animate({ scrollTop: $("#titulo_lista") });

            });
        }).catch(function(e) {
            console.log(e);
        });
}

function loadDivs() {
    load_shop_list();
}

function load_like() {
    if (localStorage.getItem('token') == null) {
        var local = localStorage.getItem('likes');
        if (local != null) {
            var like = JSON.parse(local);
        } else {
            var like = [];
        }
        like.forEach(load);

        function load(item, index) {
            if ($("div.list__heart#" + item).children("img").hasClass("bx-heart")) {
                $("div.list__heart#" + item).children("img").removeClass("bx-heart").addClass("bxs-heart");
            }
        }

    } else {
        /* ajaxPromise("module/shop/controller/controller_shop.php?op=load_likes&user=" + localStorage.getItem('token'), 'GET', 'JSON') */
        $.ajax({
            url: "index.php?page=shop&op=load_like&username=" + localStorage.getItem('token'),
            type: 'GET',
            dataType: 'JSON',

        }).done(function(data) {
            /* console.log("datos 861: ", data); */
            for (row in data) {
                /* console.log("a"); */
                if ($("#like_" + data[row].ID_car).hasClass("bx-heart")) {
                    /* console.log("b"); */
                    $("#like_" + data[row].ID_car).removeClass("bx-heart").addClass("bxs-heart");
                }

            }
        }).fail(function(e) {
            console.log(e);
        })
    }
}

function click_like() {
    $(document).on('click', '.list__heart', function() {
        if (localStorage.getItem('token') == undefined) {
            /* if ($(this).children("img").hasClass("bx-heart")) {
                $(this).children("img").removeClass("bx-heart").addClass("bxs-heart");
                like_storage(this.getAttribute('id'), like);
            } else {
                $(this).children("img").removeClass("bxs-heart").addClass("bx-heart");
                like_storage(this.getAttribute('id'), like);
            } */
            $(this).children("img").removeClass("bx-heart").addClass("no-heart");
            $(this).children("img").removeClass("bxs-heart").addClass("no-heart");
            if (confirm('Debes identificarte para dar like. Quieres identificarte?')) {
                window.location.href = 'index.php?page=login&op=login_view'
            }
        } else {
            /* ajaxPromise("module/shop/controller/controller_shop.php?op=control_likes&id=" + this.getAttribute('id') + "&username=" + localStorage.getItem('token'), 'GET', 'JSON') */
            $.ajax({
                url: "index.php?page=shop&op=control_likes&id=" + this.getAttribute('id') + "&username=" + localStorage.getItem('token'),
                type: 'GET',
                dataType: 'JSON',
            }).done(function(data) {
                console.log(data);
            }).fail(function(e) {
                console.log(e);
            });

            if ($(this).children("img").hasClass("bx-heart")) {
                $(this).children("img").removeClass("bx-heart").addClass("bxs-heart");
            } else {
                $(this).children("img").removeClass("bxs-heart").addClass("bx-heart");
            }
        }
    });
}

function like_storage(id) {
    var local = localStorage.getItem('likes');

    if (local != null) {
        var like = JSON.parse(local);
    } else {
        var like = [];
    }

    if (like.indexOf(id) === -1) {
        like.push(id);
    } else if (like.indexOf(id) !== -1) {
        like.splice(like.indexOf(id), 1);
    }

    localStorage.setItem('likes', JSON.stringify(like));
}

$(document).ready(function() {
    click_like();
    loadDivs();
    if (localStorage.getItem('filter')) {
        load_pagination();
    } else {
        load_pagination();
    }
});