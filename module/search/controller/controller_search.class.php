<?php
    class controller_search {
        function marca() {
            echo json_encode(common::load_model('search_model', 'get_select_marca'));
        }

        function modelo() {
            if(empty($_POST['Marca'])){
                echo json_encode(common::load_model('search_model', 'get_select_modelo'));
            }else{
                echo json_encode(common::load_model('search_model', 'get_select_marca_modelo', $_POST['Marca'] ));
            }
        }
        
        function autocomplete() {
            if (!empty($_POST['Marca']) && empty($_POST['Modelo'])){
                echo json_encode(common::load_model('search_model', 'get_auto_marca', [$_POST['Marca'], $_POST['complete']]));
            }else if(!empty($_POST['Marca']) && !empty($_POST['Modelo'])){
                echo json_encode(common::load_model('search_model', 'get_select_auto_marca_modelo', [$_POST['city'], $_POST['Marca'], $_POST['Modelo']]));
            }else if(empty($_POST['Marca']) && !empty($_POST['Modelo'])){
                echo json_encode(common::load_model('search_model', 'get_select_auto_modelo', [$_POST['Modelo'], $_POST['city']]));
            }else {
                echo json_encode(common::load_model('search_model', 'get_select_auto', $_POST['city']));
            }
        }
    }
