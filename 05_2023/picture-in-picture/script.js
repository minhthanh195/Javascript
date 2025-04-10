const videoElement = document.getElementById('video');
const button = document.getElementById('button');

console.log(videoElement)
// promt to select media stream, pass to video element, then play
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () =>{
            videoElement.play();
        }
    }
    catch(error){
        console.log("a")
    }
}

button.addEventListener('click', async () =>{
    //Disable Button
    button.disabled = true;
    // start picture in picture
    console.log(videoElement.id);

    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
});
// onload
selectMediaStream()
