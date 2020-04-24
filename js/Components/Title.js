// return a title section
function print_Title_Section_Component( titulo, icono="", bg="" ) {
    // console.log( titulo, icono, bg );
    iconoImage = (icono !== "") 
        ?  `<img src="${icono}" alt="icono de la sección" />`
        : "" ;

    return  `<div class="col-12 Title_Section header">
                <div class="row">
                    <div class="col-8 title">
                        <span>${titulo}</span>
                    </div>         
                    <div class="col-4 icon">
                        ${iconoImage}   
                    </div>
                    <div class="secondBg"></div>
                </div>
            </div>`;
}


            