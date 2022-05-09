<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function home_slide_marca($db) {
            $sql = "SELECT * FROM marca LIMIT 10";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function home_slide_tipo($db) {
            $sql = "SELECT * FROM tipo ORDER BY emision LIMIT 10";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function home_slide_categoria($db) {
            $sql = "SELECT * FROM categoria LIMIT 10";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        /* public function select_load_more($db) {
            $sql = "SELECT COUNT(*) as 'count' FROM `brands`";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } */
    }
?>