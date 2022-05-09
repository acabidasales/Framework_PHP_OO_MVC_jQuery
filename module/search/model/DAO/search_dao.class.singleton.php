<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_marca($db){
			$sql = "SELECT DISTINCT Marca FROM coches";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_modelo($db){
            $sql = "SELECT DISTINCT Modelo FROM coches";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_marca_modelo($db, $marca){
            $sql = "SELECT DISTINCT Modelo FROM coches WHERE Marca='$marca'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_marca($db, $auto, $marca){
            $sql = "SELECT city FROM coches WHERE Marca='$marca' AND city LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_marca_modelo($db, $auto, $marca, $modelo){
            $sql = "SELECT city FROM coches WHERE Marca='$marca' AND Modelo='$modelo' AND city LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_modelo($db, $auto, $modelo){
            $sql = "SELECT city FROM coches WHERE Modelo='$modelo' AND city LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto($db, $auto){
            $sql = "SELECT city FROM coches WHERE city LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>