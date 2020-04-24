// print selected "ventana de accion"
function generateVentanaAccion( age, action, icon ) {
    
    switch (action) {
        case "apps":
                //function from Sub_Apps.js
                printSubApps( icon );
            break;    
        case "cartelera":
                //function from Sub_Cartelera.js
                printSubCartelera( age, icon )
            break;
        case "player":
                //function from Sub_Player
                printSubPlayer( age, icon );
            break;
        case "travesuras":
        
            break;
        case "barrio":
    
            break;
        case "videotips":
                //function from Sub_Videotips.js
                printSubVideoTips();        
            break;
        case "cuentos":
            
            break;
        case "juegos":
        
            break;
        default:
            console.log('caiste a default')
            break;
    }
    
}