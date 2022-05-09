<header>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <!-- <script src="module/search/model/controller_search.js"></script> -->
</header>
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
            <a class="navbar-brand" href="#">YOUR LOGO</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul id="header_menu" class="nav navbar-nav navbar-right" style="margin-right:-10%;">
                <li>
                    <a data-tr="home" href="index.php?page=home&op=view"></a>
                </li>
                <li>
                    <a data-tr="shop" href="index.php?page=shop&op=view"></a>
                </li>
                <li>
                    <a data-tr="services" href="index.php?page=services"></a>
                </li>
                <li>
                    <a data-tr="portfolio" href="index.php?page=portfolio"></a>
                </li>
                <li>
                    <a data-tr="catalog" href="index.php?page=controller_cars&op=list"></a>
                </li>
                <li>
                    <a data-tr="contact" href="index.php?page=contact"></a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-tr="lenguage"></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="lang-btn" data-tr="Spanish" id="spanish"></a>
                        </li>
                        <li>
                            <a class="lang-btn" data-tr="Valencian" id="valencian"></a>
                        </li>
                        <li>
                            <a class="lang-btn" data-tr="English" id="english"></a>
                        </li>
                        <li>
                            <a class="lang-btn" data-tr="Frison_Occidental" id="friocc"></a>
                        </li>
                    </ul>
                </li>
            </ul>
            <br><br>
            <div class="search__container" style="padding-top:30px;margin-left:-5%;position: absolute;">
                <form class="search__form">
                        <select id="marca" style="border-radius: 5px;">
                            <option value="0">Marca</option>
                        </select>
                        <select id="modelo" style="border-radius: 5px;">
                            <option value="0">Modelo</option>
                        </select>
                        <input type="text" id="autocom" autocomplete="off" style="border-radius: 5px;"/>
                        <input type="button" class="btn btn-success " value="Search" id="search-btn"/>
                        <div id="search_auto" style="background-color:gray;color:white;"></div>
                </form>
            </div> 
        </div>
    </div>
</div>