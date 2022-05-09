<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_marcas_carousel_BLL() {
			return $this -> dao -> home_slide_marca($this->db);
		}

		public function get_tipo_carousel_BLL() {
			return $this -> dao -> home_slide_tipo($this->db);
		}

		public function get_categoria_carousel_BLL() {
			return $this -> dao -> home_slide_categoria($this->db);
		}

		/* public function get_load_more_BLL() {
			return $this -> dao -> select_load_more($this->db);
		} */

	}
?>