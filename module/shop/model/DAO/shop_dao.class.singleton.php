<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function shop_list($db, $num_pag, $num_items) {
            $sql = "SELECT * FROM coches ORDER BY count DESC LIMIT $num_pag, $num_items";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function filters($db, $filter, $num_pag, $num_items) {
            $sql = "SELECT * FROM coches c";

            for ($i = 0; $i < count($filter); $i++) {
                if ($i == 0) {
                    $sql.= " WHERE c." . $filter[$i][0] . "=" . "'" . $filter[$i][1] . "'";
                } else {
                    $sql.= " AND c." . $filter[$i][0] . "=" . "'" . $filter[$i][1] . "'";
                }
            }
            $sql .= " LIMIT $num_pag, $num_items";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function sql_query($filters){
            $continue = "";
            $count = 0;
            $count1 = 0;
            $where = ' WHERE ';
            foreach ($filters as $key => $row) {
                foreach ( $row as $key => $row_inner) {
                    if ($count == 0) {
                            foreach ( $row_inner as $value) {
                                if ($count1 == 0) {
                                    $continue = $key . ' IN ("'. $value . '"';
                                }else {
                                    $continue = $continue  . ', "' . $value . '"';
                                }
                                $count1++;
                            }
                            $continue = $continue . ')';
                    }else {
                            foreach ($row_inner as $value)  {
                                if ($count2 == 0) {
                                    $continue = ' AND ' . $key . ' IN ("' . $value . '"';
                                }else {
                                    $continue = $continue . ', "' . $value . '"';
                                }
                                $count2++;
                            }
                            $continue = $continue . ')';
                        
                    }
                }
                $count++;
                $count2 = 0;
                $where = $where . $continue;
            }
            return $where;
        }

        public function select_one($db, $id) {
            $sql = "SELECT * FROM coches WHERE ID='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_one_car($db, $id) {
            $sql = "SELECT coches.ID, coches.NBast, coches.Marca, coches.Modelo, coches.Motor, coches.Caballos, coches.Kilometros, coches.Matricula, coches.DatosAd, coches.Categoria, coches.Tipo, coches.precio , imagenes.ruta_imagen FROM coches, imagenes WHERE coches.ID = '$id' AND imagenes.id_coche = '$id' GROUP BY imagenes.ruta_imagen";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_images($db, $id) {
            $sql = "SELECT * FROM imagenes WHERE id_coche='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filters($db) {
            $sql = "SELECT * FROM coches";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
        public function select_marcas($db) {
            $sql = "SELECT marca.nombre_marca FROM marca";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_combustible($db) {
            $sql = "SELECT tipo.nombre_tipo FROM tipo";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function search($db, $search){
            $sql = "SELECT * FROM coches";
            if ( $search[0]['city'][0] != "no") {
                $sql.= " WHERE city=" . "'" . $search[0]['city'][0] . "'";
                if ($search[1]['Marca'][0] != "no") {
                    $sql.= " AND Marca=" . "'" .$search[1]['Marca'][0]. "'";
                    if ($search[2]['Modelo'][0] != "no"){
                        $sql.= " AND Modelo=" . "'" .$search[2]['Modelo'][0]. "'";
                    }
                }
            }else {
                if ($search[1]['Marca'][0] != "no") {
                    $sql.= " WHERE Marca=" . "'" .$search[1]['Marca'][0]. "'";
                    if ($search[2]['Modelo'][0] != "no"){
                        $sql.= " AND Modelo=" . "'" .$search[2]['Modelo'][0]. "'";
                    }
                }else {
                    if ($search[2]['Modelo'][0] != "no"){
                        $sql.= " WHERE Modelo=" . "'" .$search[2]['Modelo'][0]. "'";
                    }
                }
            }
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_count($db, $id){
            $sql = "UPDATE coches SET count=count + 1 WHERE ID=$id";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function order_by($db, $valor){
            $sql = "SELECT * FROM coches ORDER BY $valor DESC";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count($db){
            $sql = "SELECT COUNT(*) AS n_coches FROM coches";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count_filters($db, $filter) {
            $sql = "SELECT COUNT(*) AS n_coches FROM coches";
            if ($filter[0] != 'no') {
                $sql .= " WHERE Marca = " . "'" . $filter[0] . "'";
                if ( $filter[1] != 'no') {
                    $sql .= " AND Tipo = " . "'" . $filter[1] . "'";
                }
            }else {
                $sql .= " WHERE Tipo = " . "'" . $filter[1] . "'";
            }
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details($db, $id){
            $sql = "SELECT * FROM coches WHERE ID='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_relacionados($db, $marca, $id){
            $sql = "SELECT * FROM coches WHERE Marca LIKE '$marca' AND ID <> '$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function count_relacionados($db, $marca, $id){
            $sql = "SELECT COUNT(*) AS 'contador' FROM coches WHERE Marca LIKE " . "'" . $marca . "'" . " AND ID <> $id";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_likes($db, $id, $user){
            $sql = "SELECT username, ID_car FROM likes WHERE username='$user' AND ID_car='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $user){
            $sql = "INSERT INTO likes (username, ID_car) VALUES ('$user','$id')";
            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $user){
            $sql = "DELETE FROM likes WHERE username='$user' AND ID_car='$id'";
            $stmt = $db->ejecutar($sql);
            return "unlike";
        }
    }

