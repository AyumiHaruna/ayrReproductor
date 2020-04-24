function printSubApps( icon ) {

    let toPrint = print_Title_Section_Component(
        "Aplicaciones",
        "img/index/Apps.png",
        ""
    );

    toPrint += `
        <div class="col-12 Sub_Apps_Container">
            <button class="app_prev car-btn-prev"> <i class="fas fa-arrow-left"></i> </button>
            <button class="app_next car-btn-next"> <i class="fas fa-arrow-right"></i> </button>

            <div class="Sub_Apps_Wrapper">
                <div class="Sub_Apps">
    `;

        for (let i = 1; i <= Object.keys(apps_data).length; i++) {    
            toPrint += `        
                <div class="app_craousel app_container">
                    <div class="app_card">
                        <div class="title">
                            ${apps_data[i]["name"]}
                        </div>
                        <div class="logo">
                            <img src="${apps_data[i]['img']}" alt="Logo de la aplicación ${apps_data[i]['name']}" />  
                        </div>                
                        <div class="dwnLink">
                            Disponible en: <br>
                            <a href="${apps_data[i]['google_play']}" target="_blank">
                                <img src="img/aplicaciones/gpstore.png" alt="Descarga ${apps_data[i]['name']} en Google Play" />
                            </a>
                            <a href="${apps_data[i]['app_store']}" target="_blank">
                                <img src="img/aplicaciones/AppleStore.png" alt="Descarga ${apps_data[i]['name']} en App Store" />
                            </a>
                        </div>
                        <div class="category">
                            ${apps_data[i]['size']} <br>
                        `;

                        for (let j = 1; j <= Object.keys(apps_data[i]['category']).length; j++) {
                            toPrint += `
                                ${apps_data[i]['category'][j]} / 
                            `;
                        }

                    toPrint += `
                        </div>
                        <div>
                            
                        </div>
                        <div class="description">
                            ${apps_data[i]['description']}
                        </div>
                    </div>
                </div>
            `;
        }    

    toPrint += `
                </div>
            </div>
        </div>

        
    `;

    let action_window = document.getElementsByClassName("Index_Ventana_apps")[0];
    action_window.innerHTML = toPrint;

    let siema_apps_carousel = new Siema({
        selector: '.Sub_Apps',
        duration: 200,
        easing: 'ease-out',
        perPage: {
            576: 1,
            768: 2,
            1024: 3,
        },
        startIndex: 0,
        loop: true,
    });

    document.querySelector('.app_prev').addEventListener('click', () => siema_apps_carousel.prev());
    document.querySelector('.app_next').addEventListener('click', () => siema_apps_carousel.next());    
}