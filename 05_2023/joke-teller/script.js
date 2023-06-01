const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// // VoiceRSS Javascript SDK

// Disable/ enable button
function toggleButton(){
    button.disabled = !button.disabled;
}
// Passing joke to voiceRSS API
function speechJoke (textjoke){
    VoiceRSS.speech({
        key: 'ae762a23a81445039e97042f82a9836b',
        src: textjoke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
// get jokes from joke API
async function getJokes (){
    let joke ='';
    const apiUrl ="https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup}...${data.delivery}`
        }
        else{
            joke = data.joke;
        }
        // Text to speech
        speechJoke(joke);
        // disable button
        toggleButton();
    }catch(error){

    }
}

// event listener 
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);