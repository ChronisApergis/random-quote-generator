const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");

// Προκαθορισμένη λίστα quotes για fallback
const fallbackQuotes = [
    { content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Act as if what you do makes a difference. It does.", author: "William James" }
];

async function getQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        
        if (!response.ok) {
            throw new Error("API Error");
        }
        
        const data = await response.json();
        quoteText.textContent = `"${data.content}"`;
        authorText.textContent = `- ${data.author}`;
    } catch (error) {
        console.error("Error fetching quote:", error);
        // Επιλογή τυχαίας φράσης από την fallback λίστα
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteText.textContent = `"${randomFallback.content}"`;
        authorText.textContent = `- ${randomFallback.author}`;
    }
}

function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " " + author)}`;
    window.open(tweetURL, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Get first quote on load
getQuote();
