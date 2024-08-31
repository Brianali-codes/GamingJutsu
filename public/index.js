//global variables and other declarations
let randomNo = Math.floor(Math.random() * 100)
console.log(randomNo)




async function getNews() {
  const apiKey = "4e1d64b3da574f94b858e5bb93328485";
  const url = `https://newsapi.org/v2/everything?q=gaming&sortBy=popularity&apiKey=${apiKey}`;

  try {
    

    const response = await fetch(url);
    const data = await response.json();

    const newsContainer = document.getElementById("main");


    const mainImage = document.getElementById("mainImage")
    let imageRandomizer = document.createElement('img')
    imageRandomizer.src = data.articles[randomNo].urlToImage;

    
    if (Array.isArray(data.articles) && data.articles.length > 0) {
      // Generate a random number between 1 and 100
      let randomNo = Math.floor(Math.random() * 100) + 1;

      // Keep generating random numbers until an article with an image is found
      while (!data.articles[randomNo - 1].urlToImage) {
        randomNo = Math.floor(Math.random() * 100) + 1;
      }
      let imager = document.getElementById("mainImage")
      // Article with an image found, log the image URL
      console.log(data.articles[randomNo - 1].urlToImage);
      imager.src = data.articles[randomNo - 1].urlToImage
    } else {
      console.error('No articles found or data.articles is not an array.');
    }
    

    data.articles.forEach(article => {
      if (article.urlToImage) { // Check if image URL exists
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt = article.title || "News Image"; // Provide meaningful alt text
        image.onerror = function() { // Handle missing or broken images
          this.style.display = "none"; // Hide the image element
          // Optionally: Display a placeholder image
        };
        newsCard.appendChild(image);

        const title = document.createElement("p");
        title.textContent = article.title;
        title.style.textAlign = "start";
        title.classList.add("news-title"); // Assuming you meant 'news-title'
        newsCard.appendChild(title);

        const origin = document.createElement("p");
        origin.textContent = article.source.name;
        origin.classList.add("news-origin"); // Assuming you meant 'news-origin'
        newsCard.appendChild(origin);


        newsContainer.appendChild(newsCard);
        
      } // End if (article.urlToImage)

      

    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

getNews();



