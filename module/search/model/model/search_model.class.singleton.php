<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_select_marca() {
            return $this -> bll -> get_select_marca_BLL();
        }

        public function get_select_modelo() {
            return $this -> bll -> get_select_modelo_BLL();
        }

        public function get_select_marca_modelo($args) {
            return $this -> bll -> get_select_marca_modelo_BLL($args);
        }

        public function get_select_auto_marca($args) {
            return $this -> bll -> get_select_auto_marca_BLL($args);
        }

        public function get_select_auto_marca_modelo($args) {
            return $this -> bll -> get_select_auto_marca_modelo_BLL($args);
        }

        public function get_select_auto_modelo($args) {
            return $this -> bll -> get_select_auto_modelo_BLL($args);
        }

        public function get_select_auto($args) {
            return $this -> bll -> get_select_auto_BLL($args);
        }

    }