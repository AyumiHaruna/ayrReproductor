//for all pages when page is loaded create navbar
document.addEventListener("DOMContentLoaded", function() {
    // function fron this script
    printNavBar();
});


//generate the NavBar
function printNavBar() {
    toPrint = `
        <nav class="navbar nav_ayr navbar-expand-lg navbar-light">
            <button class="navbar-toggler" id="navgar-toggler-button" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
                
            <div class="navbar-collapse collapse" id="navbarToggler" style="">
                <div class="navbar-nav brand_container mr-auto mt-2 mt-lg-0">           
                    <a href="index.html"><img id="navBrand" src="img/vitamin/alasyraiceslogo.png" alt="Vamos al inicio de la pÃ¡gina Alas y RaÃ­ces" /> </a>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html"><i class="fas fa-lg fa-home"></i> Inicio </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="quienessomos.html"><i class="fas fa-lg fa-users"></i> Nosotros </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#aplicaciones_block"><i class="fas fa-lg fa-mobile-alt"></i> Aplicaciones </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="ebooks.html"><i class="fas fa-lg fa-book-open"></i> e-books </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#cartelera_block"><i class="far fa-lg fa-calendar-alt"></i> Cartelera </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#suscribe_block"><i class="far fa-lg fa-envelope"></i> Suscríbete </a>
                    </li>
                </ul>
            </div>
        </nav>
            `;
    const navAyr = document.getElementsByClassName("nav_ayr")[0];
    navAyr.innerHTML = toPrint;

    // set active the current section
    navAyr.querySelectorAll("li").forEach( (elm) => {
        if( window.location.href === elm.querySelector("a").href ){
            // console.log( elm.querySelector("a").href );
            elm.classList.add("active");
        }        
    });

}