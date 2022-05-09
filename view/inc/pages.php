<?php
	switch($_GET['page']){
		case "controller_home";
			include("module/home/controller/".$_GET['page'].".php");
			break;
		case "controller_cars";
			include("module/cars/controller/".$_GET['page'].".php");
			break;
		case "controller_shop";
			include("module/shop/controller/".$_GET['page'].".php");
			break;
		case "services";
			include("module/services/".$_GET['page'].".html");
			break;
		case "portfolio";
			include("module/portfolio/".$_GET['page'].".html");
			break;
		case "contact";
			include("module/contact/".$_GET['page'].".html");
			break;
		case "exceptions";
			include("module/exceptions/controller/controller_".$_GET['page'].".php");
			break;
		case "login";
			include("module/login/controller/controller_login.php");
			break;
		case "register";
			include("module/login/controller/controller_login.php");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
?>