// set source to audio modal
function modal_audio_set( list, track, elm ) {
    //set some info variables
    let thumbnail = ( player_data[list]['playList'][track]['thumbnail'] !== '' )
                        ? player_data[list]['playList'][track]['thumbnail']
                        : 'img/audio_thumb.png' ;

    // test if backward/forward buttons can exist1
    let backButton = document.getElementsByClassName(`audio_${list}_${track-1}`)[0];
    let nextButton = document.getElementsByClassName(`audio_${list}_${track+1}`)[0];
    backButton = ( typeof(backButton) !== 'undefined' ) 
        ? `<button onClick="playAnotherTrack(${list}, ${track}, 'backward')">
                <i class="fas fa-backward"></i>
            </button>` 
            : '' ;
    nextButton = ( typeof(nextButton) !== 'undefined' ) 
        ? `<button onClick="playAnotherTrack(${list}, ${track}, 'forward')">
                <i class="fas fa-forward"></i>
            </button>` 
        : '' ;

    //create Modal view
    let toPrint = `
        <div class="row Modal_Audio">
            <div class="col-12 Modal_Audio_Smoke"></div>           
            
            <div class="col-12 testPlayerBar">
                <audio controls crossorigin autoplay src="${player_data[list]['playList'][track]['url']}" style="display:none;"></audio> 
            </div>
            <div class="col-6 text-left audio_action_btn p-0">
                ${backButton}
            </div>
            <div class="col-6 text-right audio_action_btn p-0">
                ${nextButton}
            </div>

            <div class="col-12 info">
                <span>${ player_data[list]['playList'][track]['songName'] }</span> <br>
                ${ player_data[list]['playList'][track]['artist'] }
            </div>            
        </div>
    `;

    //insert view 
    document.getElementsByClassName(elm.dataset.target)[0].innerHTML = toPrint;

    // green audio player is from https://github.com/greghub/green-audio-player
    // function from vendor/green_audio_player
    // generate cute player
    GreenAudioPlayer.init({
        selector: '.testPlayerBar',
        stopOthersOnPlay: true
    });

    //turn on pause button on autoplay
    currentAudioPlayer = document.getElementsByClassName("testPlayerBar")[0].getElementsByTagName("audio")[0];    
    setTimeout(() => {
        if( !currentAudioPlayer.paused ){
            document.getElementsByClassName("play-pause-btn__icon")[0].setAttribute("d", "M0 0h6v24H0zM12 0h6v24h-6z")
        }
    }, 500);
    //on time seeked update
    currentAudioPlayer.onseeked  = () => {
        if( currentAudioPlayer.paused ){
            document.getElementsByClassName("play-pause-btn__icon")[0].setAttribute("d", "M18 12L0 24V0");
        } else {
            document.getElementsByClassName("play-pause-btn__icon")[0].setAttribute("d", "M0 0h6v24H0zM12 0h6v24h-6z");
        }
    };

    //add event lister to currentAudioPlayer on endplay audio
    currentAudioPlayer.addEventListener( "ended", () => {
        playAnotherTrack( list, track, "forward" )
    }); 
}


//set next track on audio field (if exists), and active its button
function playAnotherTrack( currentList, currentTrack, action ){
    //if action is foward, then have to look for next sound button
    if( action === "forward" ){
        var toLook = currentTrack + 1;
    } else if( action === "backward" ){    //else if action is backward, then have to look for previous sound button
        var toLook = currentTrack - 1
    }

    //loop the player_data array
    for (let i = 1; i <= Object.keys(player_data[currentList]["playList"]).length; i++) {
        let key = parseInt(Object.keys(player_data[currentList]["playList"])[i-1]);        
        
        //when key === currentPlayedTrack
        if( key === currentTrack ) {
            let newTrackButton = document.getElementsByClassName(`audio_${currentList}_${toLook}`)[0];
            if( typeof(newTrackButton) !== 'undefined' ){
                newTrackButton.click();
            }
        }
    }
}
