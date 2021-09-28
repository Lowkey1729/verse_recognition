export default class Media {
    constructor (){

    }

    getAccessToMedia(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            console.log("Media supported.");
            navigator.mediaDevices.getUserMedia({
                audio: true,
            })
            .then(function(stream){

            })
            .catch(function(error){
                console.log("The following getUserMedia error occured" + error)
            })
        }
        else{
            console.log("getUserMedia not supported on your browser.")
        }
    }


}
