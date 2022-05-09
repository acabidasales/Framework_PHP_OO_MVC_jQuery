<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_select_marca_BLL() {
			return $this -> dao -> select_marca($this->db);
		}

		public function get_select_modelo_BLL() {
			return $this -> dao -> select_modelo($this->db);
		}

        public function get_select_marca_modelo_BLL($args) {
			return $this -> dao -> select_marca_modelo($this->db, $args);
		}

		public function get_select_auto_marca_BLL($args) {
			return $this -> dao -> select_auto_marca($this->db, $args[0], $args[1]);
		}

        public function get_select_auto_marca_modelo_BLL($args) {
			return $this -> dao -> select_auto_marca_modelo($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_select_auto_modelo_BLL($args) {
			return $this -> dao -> select_auto_modelo($this->db, $args[0], $args[1]);
		}

        public function get_select_auto_BLL($args) {
			return $this -> dao -> select_auto($this->db, $args);
		}
		
	}
?>