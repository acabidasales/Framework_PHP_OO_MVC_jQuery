<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function insert_user($db, $username, $email, $password, $avatar, $token){
            $sql ="INSERT INTO `users` (`username`, `password`, `email`, `type`, `avatar`, `uID`, `active`, `token_email`)     
                VALUES ('$username','$password','$email','client', '$avatar','', 0, '$token')";
            return $stmt = $db->ejecutar($sql);
        }
        
        public function select_user($db, $username){
			$sql = "SELECT `uID`, `username`, `email`, `password`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE username='$username'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_social_login($db, $uID){
			$sql = "SELECT * FROM `users` WHERE uID='$uID'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_social_login($db, $uID, $username, $email, $avatar){
            $sql ="INSERT INTO `users`(`username`, `email`, `password`, `type`, `avatar`, `token_email`, `active`, `uID`)     
                VALUES ('$username','$email','','client', '$avatar','', 1, '$uID')";
            return $stmt = $db->ejecutar($sql);
        }

        public function update_token_jwt($db, $token, $email){
            $sql = "UPDATE `users` SET `uID`= '$token' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_verify_email($db, $token){
			$sql = "SELECT `token_email` FROM `users` WHERE `token_email` = '$token'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token){
            $sql = "UPDATE `users` SET `active`= 1, `token_email`= '' WHERE `token_email` = '$token'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email){
			$sql = "SELECT `email` FROM `users` WHERE email='$email'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_recover_password($db, $email, $token){
			$sql = "UPDATE `users` SET `token_email`= '$token' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function update_new_passwoord($db, $token, $password){
            $sql = "UPDATE `users` SET `password`= '$password', `token_email`= '' WHERE `token_email` = $token";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function select_data_user($db, $username){
			$sql = "SELECT `uID`, `username`, `email`, `password`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE username='$username'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_user_by_uid($db, $uid){
			$sql = "SELECT `uID`, `username`, `email`, `password`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE uID='$uid'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }

?>