function load_marca() {
    $.ajax({
        url: 'index.php?page=search&op=marca',
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data) {
        for (row in data) {
            $('#marca').append('<option value = "' + data[row].Marca + '">' + data[row].Marca + '</option>');
        }
    }).fail(function(e) {
        console.log(e);
    });
}

function load_modelo(data = undefined) {
    $.ajax({
        url: "?page=search&op=modelo",
        type: "POST",
        dataType: "JSON",
        data: data
    }).done(function(data) {
        $('#modelo').empty();
        $('#modelo').append('<option value = "0">Modelo</option>');
        for (row in data) {
            $('#modelo').append('<option value = "' + data[row].Modelo + '">' + data[row].Modelo + '</option>');
        }
    }).fail(function(e) {
        console.log(e);
    });
}

function launch_search() {
    load_marca();
    load_modelo();
    $('#marca').on('change', function() {
        let marca_1 = $(this).val();
        if (marca_1 === 0) {
            load_modelo();
        } else {
            load_modelo({ Marca: marca_1 });
        }
    });
}

function autocomplete() {
    $("#autocom").on("keyup", function() {
        let sdata = { city: $(this).val() };
        if (($('#marca').val() != 0)) {
            sdata.Marca = $('#marca').val();
            if (($('#marca').val() != 0) && ($('#modelo').val() != 0)) {
                sdata.Modelo = $('#modelo').val();
            }
        }
        if (($('#marca').val() == 0) && ($('#modelo').val() != 0)) {
            sdata.Modelo =
                $('#modelo').val();
        }

        $.ajax({
            url: '?page=search&op=autocomplete',
            type: 'POST',
            data: sdata,
            dataType: 'JSON'
        }).done(function(data) {
            $('#search_auto').empty();
            $('#search_auto').fadeIn(10000000);
            for (row in data) {
                $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({ 'class': 'searchElement', 'id': data[row].city });
            }
            $(document).on('click', '.searchElement', function() {
                $('#autocom').val(this.getAttribute('id'));
                $('#search_auto').fadeOut(1000);
            });
            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'autocom') {
                    $('#search_auto').fadeOut(1000);
                }
            });
        }).fail(function(e) {
            $('#search_auto').fadeOut(500);
            console.log(e);
        });

    });

}

function btn_search() {
    $('#search-btn').on('click', function() {

        var search = [];

        if (($('#marca').val() == 0) && ($('#modelo').val() == 0)) {
            if ($('#autocom').val() != "") {
                search.push({ "city": [$('#autocom').val()] });
                search.push({ "Marca": ["no"] });
                search.push({ "Modelo": ["no"] });
            }
        } else if (($('#marca').val() != 0) && ($('#modelo').val() == 0)) {
            if ($('#autocom').val() != "") {
                search.push({ "city": [$('#autocom').val()] });
            } else {
                search.push({ "city": ["no"] });
            }
            search.push({ "Marca": [$('#marca').val()] });
            search.push({ "Modelo": ["no"] });
        } else if (($('#marca').val() == 0) && ($('#modelo').val() != 0)) {
            if ($('#autocom').val() != "") {
                search.push({ "city": [$('#autocom').val()] });
            } else {
                search.push({ "city": ["no"] });
            }

            search.push({ "Marca": ["no"] });
            search.push({ "Modelo": [$('#modelo').val()] });
        } else {
            if ($('#autocom').val() != "") {
                search.push({ "city": [$('#autocom').val()] });
            } else {
                search.push({ "city": ["no"] });
            }
            search.push({ "Marca": [$('#marca').val()] });
            search.push({ "Modelo": [$('#modelo').val()] });
        }

        localStorage.removeItem('search');
        if (search.length != 0) {
            localStorage.setItem('search', JSON.stringify(search));
        }
        window.location.href = 'index.php?page=shop&op=view';

    });
}

$(document).ready(function() {
    launch_search();
    autocomplete();
    btn_search();
});