    const video = document.getElementById('video');
    const progressRange = document.querySelector('.progress-range');
    const progressBar = document.querySelector('.progress-bar');
    const playBtn = document.getElementById('play-btn')
    const volumeIcon = document.getElementById('volume-icon');
    const volumeRange = document.querySelector('.volume-range');
    const volumeBar = document.querySelector('.volume-bar');
    const currentTime = document.querySelector('.time-elapsed');
    const duration = document.querySelector('.time-duration');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const speed = document.querySelector('.player-speed')
    const player = document.querySelector('.player')
// Play & Pause ----------------------------------- //
function showPlayIcon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}
function togglePlay(){
    if(video.paused){
        video.play()
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }
    else{
        video.pause()
        showPlayIcon()
    }
}
// on video ended, show play button icon
video.addEventListener('ended',showPlayIcon);

// Progress Bar ---------------------------------- //
// displayTime 
function displayTime (time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes} : ${seconds}`;
}
// update progress bar as video plays
function updateProgress(){
    progressBar.style.width = `${video.currentTime/video.duration * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = displayTime(video.duration);
}
// seekTime 
function setProgress(e){
    const newTime = e.offsetX/ progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;
// change IconVolume
function changeIcon(volume){
    if(volume > 0.7){
        volumeIcon.classList.add('fas','fa-volume-up');
    }else if (0.7 > volume && volume > 0 ){
        volumeIcon.classList.add('fas','fa-volume-down');
    }else if( volume === 0){
        volumeIcon.classList.add('fas','fa-volume-off');
    }
}
// change Volume
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume * 100}%`
    if(volume < 0.1){
        volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    video.volume = volume;
    volumeIcon.className = '';
    changeIcon(volume)
    lastVolume = volume;
}

function toggleMute(){
    volumeIcon.className = '';
    if(video.volume){
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas','fa-volume-mute');
    }
    else{
        video.volume= lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        changeIcon(lastVolume)
    }
}

// function full/ exit screen
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
}

// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value;
}

let fullScreen = false ;
// Fullscreen ------------------------------- //
function toggleFullscreen(){
    !fullScreen ? openFullscreen(player) : closeFullscreen()
    fullScreen = !fullScreen 
}

// add event listener 
playBtn.addEventListener('click',togglePlay)
video.addEventListener('click',togglePlay)
video.addEventListener('timeupdate',updateProgress)
progressRange.addEventListener('click',setProgress)
volumeRange.addEventListener('click',changeVolume)
volumeIcon.addEventListener('click',toggleMute)
speed.addEventListener('change',changeSpeed)
fullscreenBtn.addEventListener('click',toggleFullscreen)