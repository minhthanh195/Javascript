const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time")
const durationEl= document.getElementById("duration")
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
    const songs = [
        {
            name: 'jacinto-1',
            displayName:'Electric Chill Machine',
            artist:'jacinto Design'
        },
        {
            name: 'jacinto-2',
            displayName:'Seven Nation Army (Remix)',
            artist:'jacinto Design'
        },
        {
            name: 'jacinto-3',
            displayName:'Goodnight, Disco Queen',
            artist:'jacinto Design'
        },
        {
            name: 'metric-1',
            displayName:'Front Row (Remix)',
            artist:'Metric/jacinto Design'
        }
    ]
// check if playing
let isPlaying = false;
//Play audio
function playSong(){
    isPlaying = true
    music.play();
    playBtn.classList.replace("fa-play","fa-pause")
    playBtn.setAttribute('title','Pause')
}
//pause Song
function pauseSong(){
    isPlaying = false;
    music.pause()
    playBtn.classList.replace("fa-pause","fa-play")
    playBtn.setAttribute('title','Play')
}
// Play or pause event listener
playBtn.addEventListener('click',() =>{isPlaying ? pauseSong() : playSong()}
)
// update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}
// Current song
let songIndex = 0;
// next song
function nextSong(){
    songIndex++;
    if(songIndex == songs.length){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
// prev song 
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}
//on load - selct firts song
loadSong(songs[songIndex])

// Update Progress Bar & Time ( propertu currentime and duration)
function updateProgressBar (e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;

        // update progress bar width
        const progressPerssent = (currentTime/duration)*100;
        progress.style.width = `${progressPerssent}%`;

        // calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds =`0${durationSeconds}`;
        }
        
        // delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // calculate display for currentTime
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds =`0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}
// set progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const {duration} = music;
    const positionClick = (clickX / width)*100;
    music.currentTime = (clickX / width)*duration;
    progress.style.width = `${positionClick}%`;
}

// event listerners
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener('ended',nextSong)
