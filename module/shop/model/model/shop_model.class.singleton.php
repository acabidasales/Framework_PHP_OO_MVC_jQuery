<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_list($args) {
            return $this -> bll -> get_list_BLL($args);
        }

        public function get_filters($args) {
            return $this -> bll -> get_filters_BLL($args);
        }

        public function get_select_one($args) {
            return $this -> bll -> get_select_one_BLL($args);
        }

        public function get_select_one_car($args) {
            return $this -> bll -> get_select_one_car_BLL($args);
        }

        public function get_select_images($args) {
            return $this -> bll -> get_select_images_BLL($args);
        }

        public function get_select_filters() {
            return $this -> bll -> get_select_filters_BLL();
        }

        public function get_select_marcas() {
            return $this -> bll -> get_select_marcas_BLL();
        }

        public function get_select_combustible() {
            return $this -> bll -> get_select_combustible_BLL();
        }

        public function get_search($args) {
            return $this -> bll -> get_search_BLL($args);
        }

        public function get_update_count($args) {
            return $this -> bll -> get_update_count_BLL($args);
        }

        public function get_order_by($args) {
            return $this -> bll -> get_order_by_BLL($args);
        }

        public function get_select_count() {
            return $this -> bll -> get_select_count_BLL();
        }

        public function get_select_count_filters($args) {
            return $this -> bll -> get_select_count_filters_BLL($args);
        }

        public function get_select_details($args) {
            return $this -> bll -> get_select_details_BLL($args);
        }

        public function get_select_relacionados($args) {
            return $this -> bll -> get_select_relacionados_BLL($args);
        }

        public function get_count_relacionados($args) {
            return $this -> bll -> get_count_relacionados_BLL($args);
        }

        public function get_select_likes($args) {
            return $this -> bll -> get_select_likes_BLL($args);
        }

        public function get_insert_likes($args) {
            return $this -> bll -> get_insert_likes_BLL($args);
        }

        public function get_delete_likes($args) {
            return $this -> bll -> get_delete_likes_BLL($args);
        }

        public function get_load_like($args) {
            return $this -> bll -> get_load_like_BLL($args);
        }

        public function get_click_like($args) {
            return $this -> bll -> get_click_like_BLL($args);
        }

        public function get_print_filter_data() {
            return $this -> bll -> get_print_filter_data_BLL();
        }

        public function get_control_likes($args) {
            return $this -> bll -> get_control_likes_BLL($args);
        }
    }
?>
