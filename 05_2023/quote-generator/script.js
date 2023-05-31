// get element by DOM 
    const quoteContainer = document.querySelector("#quote-container")
    const quoteText = document.querySelector("#quote")
    const authorText = document.querySelector("#author")
    const twitterBtn = document.querySelector("#twitter")
    const newQuoteBtn = document.querySelector("#new-quote")
    const loader = document.querySelector("#loader")
    
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Remove Loading Spinner
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden= false;
    }
}
async function getQuote(){
    showLoadingSpinner();
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        const quotes = await response.json();
        const data = quotes[Math.floor(Math.random()*quotes.length)]
        if(!data.author){
            authorText.innerText = 'Unknow';
        }
        else{
            authorText.innerText = data.author;
        }
        if(data.text.length > 120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.text;
        removeLoadingSpinner()
    }catch(error){
        console.log(error)
    }
}

// go to twitter
function twitterQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}
// handle event 
    newQuoteBtn.addEventListener('click',getQuote)
    twitterBtn.addEventListener('click',twitterQuote)
// onload
getQuote()