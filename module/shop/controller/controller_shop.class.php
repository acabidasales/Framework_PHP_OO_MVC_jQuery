<?php
    class controller_shop {

        function view() {
            common::load_view('top_page_shop.php', VIEW_PATH_SHOP . 'shop.html');
        }

        function list() {
            echo json_encode(common::load_model('shop_model', 'get_list', [$_POST['num_pag'], $_POST['num_item']]));
        }

        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters', [$_POST['filter'], $_POST['num_pag'], $_POST['num_item']]));
        }

        function select_one() {
            echo json_encode(common::load_model('shop_model', 'get_select_one', $_GET['ID']));
        }

        function select_one_car() {
            echo json_encode(common::load_model('shop_model', 'get_select_one_car'));
        }

        function select_images() {
            echo json_encode(common::load_model('shop_model', 'get_select_images', $_GET['ID']));
        }

        function select_filters() {
            echo json_encode(common::load_model('shop_model', 'get_select_filters'));
        }

        function select_marcas() {
            echo json_encode(common::load_model('shop_model', 'get_select_marcas'));
        }

        function select_combustible() {
            echo json_encode(common::load_model('shop_model', 'get_select_combustible'));
        }

        function search() {
            echo json_encode(common::load_model('shop_model', 'get_search', $_POST['data_search']));
        }

        function update_count() {
            echo json_encode(common::load_model('shop_model', 'get_update_count', $_GET['ID']));
        }

        function order_by() {
            echo json_encode(common::load_model('shop_model', 'get_order_by', $_GET['Orden']));
        }

        function select_count() {
            echo json_encode(common::load_model('shop_model', 'get_select_count'));
        }

        function select_details() {
            echo json_encode(common::load_model('shop_model', 'get_select_details', $_GET['ID']));
        }

        function select_count_filters() {
            echo json_encode(common::load_model('shop_model', 'get_select_count_filters', $_GET['datos']));
        }

        function select_relacionados() {
            echo json_encode(common::load_model('shop_model', 'get_select_relacionados', [$_POST['related'], $_POST['no_repeat'], $_POST['loadeds'], $_POST['items']]));
        }

        function count_relacionados() {
            echo json_encode(common::load_model('shop_model', 'get_count_relacionados', [$_POST['related'], $_POST['no_repeat']]));
        }

        function select_likes() {
            echo json_encode(common::load_model('shop_model', 'get_select_likes', [$_GET['id'], $json['name']]));
        }

        function insert_likes() {
            echo json_encode(common::load_model('shop_model', 'get_insert_likes', [$_GET['id'], $json['name']]));
        }

        function delete_likes() {
            echo json_encode(common::load_model('shop_model', 'get_delete_likes', [$_GET['id'], $json['name']]));
        }

        function load_like() {
            echo json_encode(common::load_model('shop_model', 'get_load_like', $_GET['ID']));
        }

        function click_like() {
            echo json_encode(common::load_model('shop_model', 'get_click_like', $_GET['ID']));
        }

        function print_filter_data() {
            echo json_encode(common::load_model('shop_model', 'get_print_filter_data'));
        }
    }
?>
