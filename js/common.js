//this code is from https://gist.github.com/mpetroff/4666657beeb85754611f 
window.addEventListener("load", function(){
    //toggle menu without jquery
    let collapseElements = document.querySelectorAll('[data-toggle="collapse"]');
    const CLASS_SHOW = 'show';
    const CLASS_COLLAPSE = 'collapse';
    const CLASS_COLLAPSING = 'collapsing';
    const CLASS_COLLAPSED = 'collapsed';
    const ANIMATION_TIME = 350; // 0.35s


    collapseElements.forEach((el) => {
        el.addEventListener('click', handleCollapseElementClick);
    });

    function handleCollapseElementClick(e) {
        let el = e.currentTarget;
        let collapseTargetId = el.dataset.target || el.href || null;
        if (collapseTargetId) {
            let targetEl = document.querySelector(collapseTargetId);
            let isShown = targetEl.classList.contains(CLASS_SHOW) || targetEl.classList.contains(CLASS_COLLAPSING);
            if(!isShown) {
                targetEl.classList.remove(CLASS_COLLAPSE);
                targetEl.classList.add(CLASS_COLLAPSING);
                targetEl.style.height = 0;
                targetEl.classList.remove(CLASS_COLLAPSED);
                setTimeout(() => {
                    targetEl.classList.remove(CLASS_COLLAPSING);
                    targetEl.classList.add(CLASS_COLLAPSE, CLASS_SHOW);
                    targetEl.style.height = '';
                }, ANIMATION_TIME);
                targetEl.style.height = `${targetEl.scrollHeight}px`;
            } else {
                targetEl.style.height = `${targetEl.getBoundingClientRect().height}px`;
                targetEl.offsetHeight; // force reflow
                targetEl.classList.add(CLASS_COLLAPSING);
                targetEl.classList.remove(CLASS_COLLAPSE, CLASS_SHOW);
                targetEl.style.height = '';
                setTimeout(() => {
                    targetEl.classList.remove(CLASS_COLLAPSING);
                    targetEl.classList.add(CLASS_COLLAPSE);
                }, ANIMATION_TIME);
            }
        }
    }
});


//this function send a post with suscribe info
function postSuscribe() {

    //get suscribe - email value
    let mail = document.getElementById("Suscribe_Input").value

    //validate email format 
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)))
    {   //if format is wrong
        //trow an alert from "sweetAlert.js"
        Swal.fire({
            title: 'Error!',
            text: 'Formato de correo inválido',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        
        return;
    } 

    //WHILE SUBMIT
    //disable submit button
    document.getElementById("Suscribe_button").disabled = true;
    //trow a LOADING alert from "sweetAlert.js"
    Swal.fire({
        text: 'Enviando...',
        imageUrl: 'img/loader.gif',
        imageHeight: 100,
        imageAlt: 'loader animation'
    });

    //else, post request from "Axios.js"
    axios.post('http://localhost/ayrApi/public/suscribe', {
        mail: mail
      })
      .then(function (response) {
        console.log(response);
        Swal.close()	
        //trow an alert from "sweetAlert.js"
        Swal.fire({
            title: 'Gracias',
            text: 'Tu correo se registro exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
      })
      .catch(function (error) {
        console.log(error);
        Swal.close()	
        //trow an alert from "sweetAlert.js"
        Swal.fire({
            title: 'Error!',
            text: 'El servidor no responde, inténtelo mas tarde',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        
        document.getElementById("Suscribe_button").disabled = false;
        return;
    });
}

