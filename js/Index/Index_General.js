//------------------------------------------
//              START CONDITIONS
//------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    
    // document.getElementsByClassName("select-area")[0].click();

    // generate Audio player window
    // generateVentanaAccion(1, "apps", "img/index/Videotips.png");
    generateVentanaAccion(0, "player", "");
    generateVentanaAccion(0, "apps", "");







    // add info to "cartelera" section  (provisional function, change later...)
    const meses_data = ["Enero", "Febrero", "Marzo", "Abril", 
                    "Mayo", "Junio", "Julio", "Agosto", 
                    "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let currentMonth = new Date().getMonth()

    let toPrint = print_Title_Section_Component(
        `Cartelera del mes de ${meses_data[currentMonth]}`,
        "img/index/Cartelera.png",
        ""
    );
    let carteleraWindow = document.getElementsByClassName("Index_Ventana_cartelera")[0];
    carteleraWindow.innerHTML = toPrint + carteleraWindow.innerHTML;
 });
