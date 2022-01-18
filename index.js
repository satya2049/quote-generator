let quoteText = document.getElementById('quote-text');
let authorName = document.getElementById('author-name');
let newQuoteBtn = document.getElementById('new-quote');
let twitterBtn = document.getElementById('twitter-icon');
let loader = document.getElementById('loader');
let quoteContainer = document.getElementById('quote-container');
let apiQuotes = [];

function showSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true
}
function HideSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    showSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    if(quote.text){
    quote.text.length > 50 ? quoteText.classList.add('long-quote'):
    quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = quote.text;
    if(quote.author){
    authorName.innerHTML = quote.author.length ? quote.author : 'unKnown';
    }
    HideSpinner();
}
async function quoteGenerator(){
    showSpinner();
    try{
    const response = await fetch('https://type.fit/api/quotes');
    apiQuotes = await response.json();
    newQuote();
    }
    catch(error){
        console.error(error);
    }
}


function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${authorName.innerHTML}`;
    window.open(twitterUrl,'_blank');
}
quoteGenerator();

//EventListeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

