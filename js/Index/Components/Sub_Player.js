//print "SuPlayer" on action window
function printSubPlayer( age, icon ) {

    var age = parseInt(age);

    let toPrint = print_Title_Section_Component(
            "Reproductor de Audio",
            "img/index/Cancionero.png",
            ""
        );

    
    toPrint += `
        <div class="col-12 Index_Ventana_Main_Info">
            Elige un programa de radio de la barra lateral                            
        </div>
    `;


    toPrint += `
        <div class="col-md-8 offset-md-2 col-11 playerWrapper">
            <div class="row">
                <div class="col-md-7 col-8">
                    <div class="row">
                        <div class="col-sm-12 col-12 Player_Select_PlayList">
                        </div>
                        <div class="col-lg-10 offset-lg-1 col-12 Player_Select_Modal_Container">
                        </div>                        
                    </div>
                </div>

                <div class="col-md-5 col-4 program_block">`;

        for (let i = 0; i < Object.keys(player_data).length; i++) {
            let key = Object.keys(player_data)[i];
            
            //if is not pair add new row
            toPrint += ( i % 2 === 0 ) ? `<div class="row">` : '' ;
            
            toPrint += `
                    <div class="col-md-6 col-12 Audio_Program">
                        <div class="Audio_Program_Container" data-key="${key}" onClick="changeAudioList(this)">
                            <img src="${player_data[key]['thumbnail']}" />
                        </div>                        
                    </div>
                    `;

            toPrint += ( i % 2 !== 0 ) ? `</div>` : '' ;

        }

    toPrint += `
                </div>
            </div>
        </div>
    `;


    let action_window = document.getElementsByClassName("Index_Ventana_Audio")[0];
    action_window.innerHTML = toPrint;

    //mark as selected, select first option
    let containerCollection = document.getElementsByClassName("Audio_Program_Container");
    if( containerCollection.length !== 0 ) {
        containerCollection[0].classList.add("active");
    }    

    // funcion in the same script
    print_subPlayer_playList();
}


//get selected playList and print list
function print_subPlayer_playList() {
    
    let containerCollection = Array.prototype.slice.call(
        document.getElementsByClassName("Audio_Program_Container")
    );
    let selected_value = null;

    containerCollection.forEach(element => {
        if( element.classList.contains("active") ) {
            selected_value = element.dataset.key;
        }
    });

    if( selected_value === null ) {
        return;
    } 


    //clear player view
    document.getElementsByClassName('Player_Select_Modal_Container')[0].innerHTML = "";

    // //set some variables
    // let selected_field = document.getElementsByClassName("Player_Select_Field")[0] ;
    // let selected_value = selected_field.options[ selected_field.selectedIndex ].value;

    let toPrint = ``;

    for (let i = 1; i <= Object.keys(player_data[selected_value]["playList"]).length; i++) {
        let key = Object.keys( player_data[selected_value]["playList"] )[i-1];

        let action = ( player_data[selected_value]['playList'][key]['type'] === 'audio' )
                        ? `modal_audio_set(
                            ${selected_value},
                            ${key},
                            this
                        ); active_subPlayer_element(this)`
                        : `modal_video_set(this)`;

        let type = ( player_data[selected_value]['playList'][key]['type'] === 'audio' )
                        ? `<i class="fas fa-music"></i>`
                        : `<i class="fas fa-film"></i>`;

        toPrint += `
            <div
                class="row list_Element audio_${selected_value}_${key}"
                data-target="Player_Select_Modal_Container"
                data-type="audio"
                onClick="${action}"
            >

                <div class="col-2 type">${type}</div>
                <div class="col-md-10 col-12 info">
                    <span>
                        ${player_data[selected_value]["playList"][i]["songName"]}
                    </span> <br>
                    ${player_data[selected_value]["playList"][i]["artist"]}
                </div>
           </div>
        `;
    }

    let action_window = document.getElementsByClassName("Player_Select_PlayList")[0];
    action_window.innerHTML = toPrint;

    //for audio elements simulate click on first element to trigger "onClick" function
    let firstElement = document.getElementsByClassName("list_Element")[0];
    if(firstElement.dataset.type === 'audio'){
        firstElement.click();
    }
}


//deactive all playList elements and active selected element
function active_subPlayer_element( elm ) {
    let elmList = Array.prototype.slice.call (
        document.getElementsByClassName('list_Element')
    );
    elmList.forEach( li => {
        li.classList.remove('active');
    });

    //active selected element
    elm.classList.add('active');
}


//select and deselect playLists 
function changeAudioList(sel) {

    //clear all active classes 
    let listArray = Array.prototype.slice.call(
        document.getElementsByClassName("Audio_Program_Container")
    );
    
    listArray.forEach(elm => {
        if( elm.classList.contains("active") ) {
            elm.classList.remove("active");
        }
    });

    sel.classList.add("active");
    print_subPlayer_playList();
}