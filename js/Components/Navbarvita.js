//for all pages when page is loaded create navbar
document.addEventListener("DOMContentLoaded", function() {
    // function fron this script
    printNavBar();
    printVitaminList();
});

//generate the NavBar
function printNavBar() {
    toPrint = `
        <nav class="navbar nav_vita navbar-expand-lg navbar-light">
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
                        <a class="nav-link" href="aplicaciones.html"><i class="fas fa-lg fa-mobile-alt"></i> Aplicaciones </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="ebooks.html"><i class="fas fa-lg fa-book-open"></i> e-books </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="marzo.html"><i class="far fa-lg fa-calendar-alt"></i> Cartelera </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#suscribe_block"><i class="far fa-lg fa-envelope"></i> SuscrÃ­bete </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="col-12 subNav">
            <div class="row">
                <div class="col-lg-4 logo_container">
                    <img id="logoVitaminas" src="img/vitamin/vslh.png" alt="logo de VitaminaSÃ‰" />     
                </div>
                <div class="col-lg-8 button_container">
                    <button type="button" class="btn navBtns" onclick="changeActiveButton(this)" data-toggle="collapse" data-target="#queEs" aria-expanded="false"> Â¿QuÃ© es Vitamina SÃ©? </button>
                    <button type="button" class="btn navBtns" onclick="changeActiveButton(this)" data-toggle="collapse" data-target="#comoJuego" aria-expanded="false"> Â¿CÃ³mo se juega? </button>
                    <a href="img/neo/recetario.pdf" target="_blank"><button type="button" class="btn"> Recetario descargable </button> </a>
                </div>
            </div>
        </div>
            `;
    const navAyr = document.getElementsByClassName("nav_vita")[0];
    navAyr.innerHTML = toPrint;

    // set active the current section
    navAyr.querySelectorAll("li").forEach( (elm) => {
        if( window.location.href === elm.querySelector("a").href ){
            // console.log( elm.querySelector("a").href );
            elm.classList.add("active");
        }        
    });
    

}


//print vitamin data list 
function printVitaminList() {
    accordionList = document.getElementById("accordionList");
    
    let toPrint = '';
    //if vitamin data exists generate the list
    if (vitamin_data !== undefined) {
        for (let i = 0; i < Object.keys(vitamin_data).length; i++) {
            let key = Object.keys(vitamin_data)[i];            
            let show = (i === 0)? 'show' : '' ;

            toPrint += `
                <div class="card">
                    <div class="card-header">
                        <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#c${key}" 
                            onClick="changeVideo(${key})"
                            aria-expanded="true" aria-controls="c1">
                            <img src="img/vitamin/capsulita0.png">
                            <b>CÃ¡psula ${key}</b>
                        </button>
                    </div>

                    <div id="c${key}" class="collapse ${show}" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <b><i>${vitamin_data[key]['name']}</i></b>, <br> ${vitamin_data[key]['type']} con ${vitamin_data[key]['author']}. <br>
                        </div>
                    </div>
                </div>
            `;

            if( i === 0) {
                changeVideo( `${key}` ); 
            }
        }
    }

    accordionList.innerHTML = toPrint;
}


//change the video source 
function changeVideo( key ) {
    
    let videoTag = document.getElementById("vitamin_video_player");
    let videoDescription = document.getElementById("videoDescription");
    let currentUrl = videoTag.src;

    let videoBlock = document.getElementsByClassName("vitamina_description");
    let vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if( vitamin_data[key]['url'] != currentUrl) {
        //set new src on the player
        videoTag.src = vitamin_data[key]['url'];
        //change video description 
        videoDescription.innerHTML = vitamin_data[key]['description'];

        if (vw <= 992) {
            videoBlock[0].scrollIntoView({ block: "start", behavior: "smooth" });
        }
    }
    
}



//toggle navBtns and their infoPanels
function changeActiveButton( elm ) {
    navBtns = Array.prototype.slice.call(
        document.getElementsByClassName("navBtns")
    );
    arrInfo = Array.prototype.slice.call(
        document.getElementsByClassName("actInfo")
    );

    objective = elm.dataset.target;
    objective = objective.replace('#','');

    navBtns.forEach(btn => {
        if (btn !== elm) {
            if(btn.classList.contains("active")) {
                btn.classList.remove("active");
            }        
        }
    });
    arrInfo.forEach(col => {
        if( col.id !== objective) {
            col.classList.remove("show");
        } 
    });

    elm.classList.toggle("active");
}