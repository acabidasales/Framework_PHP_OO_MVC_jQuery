<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		public function get_list_BLL($args) {
			return $this -> dao -> shop_list($this->db, $args[0], $args[1]);
		}
		public function get_filters_BLL($args) {
			return $this -> dao -> filters($this->db, $args[0], $args[1], $args[2]);
		}

		public function get_select_one_BLL($args) {
			return $this -> dao -> select_one($this->db, $args[0]);
		}

		public function get_select_one_car_BLL($args) {
			return $this -> dao -> select_one_car($this->db, $args[0]);
		}
		
		public function get_select_images_BLL($args) {
			return $this -> dao -> select_images($this->db, $args[0]);
		}

		public function get_select_filters_BLL() {
			return $this -> dao -> select_filters($this->db);
		}

		public function get_select_marcas_BLL() {
			return $this -> dao -> select_marcas($this->db);
		}

		public function get_select_combustible_BLL() {
			return $this -> dao -> select_combustible($this->db);
		}

		public function get_search_BLL($args) {
			return $this -> dao -> search($this->db, $args);
		}

		public function get_update_count_BLL($args) {
			return $this -> dao -> update_count($this->db, $args[0]);
		}

		public function get_order_by_BLL($args) {
			return $this -> dao -> order_by($this->db, $args[0]);
		}

		public function get_select_count_BLL() {
			return $this -> dao -> select_count($this->db);
		}

		public function get_select_count_filters_BLL($args) {
			return $this -> dao -> select_count_filters($this->db, $args);
		}

		public function get_select_details_BLL($args) {
			$inf = $this -> dao -> select_details($this->db, $args[0]);
			$img = $this -> dao -> select_images($this->db, $args[0]);
			$res = array();
            $res[0] = $inf;
            $res[1][] = $img;
			return $res;
		}

		public function get_select_relacionados_BLL($args) {
			return $this -> dao -> select_relacionados($this->db, $args[0], $args[1]);
		}

		public function get_count_relacionados_BLL($args) {
			return $this -> dao -> count_relacionados($this->db, $args[0], $args[1]);
		}

		public function get_select_likes_BLL($args) {
			return $this -> dao -> select_likes($this->db, $args[0], $args[1]);
		}

		public function get_insert_likes_BLL($args) {
			return $this -> dao -> insert_likes($this->db, $args[0], $args[1]);
		}

		public function get_delete_likes_BLL($args) {
			return $this -> dao -> delete_likes($this->db, $args[0], $args[1]);
		}
		
		public function get_load_like_BLL($args) {
			$token = str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$args);
			$jwt = jwt_process::decode($token);
			$jwt = json_decode($jwt, TRUE);
			return $this -> dao -> select_load_likes($this->db, $jwt['name']);
		}

		public function get_click_like_BLL($args) {
			$jwt = jwt_process::decode($args[1]);
			$jwt = json_decode($jwt, TRUE);
			if ($this -> dao -> select_likes($this->db, $args[0], $jwt['name'])) {
				return $this -> dao -> delete_likes($this->db, $args[0], $jwt['name']);
			}
			return $this -> dao -> insert_likes($this->db, $args[0], $jwt['name']);
		}

		public function get_print_filter_data_BLL() {
			$marcas = $this -> dao -> select_marcas($this->db);
			$comb = $this -> dao -> select_combustible($this->db);
			$res = array();
            $res[0] = $marcas;
            $res[1][] = $comb;
			return $res;
		}

		public function get_control_likes_BLL($args) {
			$token = str_replace( array( '\'', '"', ',' , ';', '<', '>', ), '',$args[1]);
			$jwt = jwt_process::decode($token);
			$jwt = json_decode($jwt, TRUE);
			$rdo = $this -> dao -> select_likes($this->db, $args[0], $jwt['name']);
			$dinfo = array();
			foreach ($rdo as $row) {
				array_push($dinfo, $row);
			}
			if(count($dinfo) === 0){
				$this -> dao -> insert_likes($this->db, $args[0], $jwt['name']);
				return "0";
			}else{
				$this -> dao -> delete_likes($this->db, $args[0], $jwt['name']);
				return "1";
			}
            
		}
	}
?>