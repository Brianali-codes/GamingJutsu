//global variables and other declarations
let randomNo = Math.floor(Math.random() * 100)


async function getNews() {

  

  const apiKey = "4e1d64b3da574f94b858e5bb93328485";
  const url = `https://newsapi.org/v2/everything?q=gaming&sortBy=popularity&apiKey=${apiKey}`;


  try {
    

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Upgrade': 'h2c'  // Requesting an upgrade to HTTP/2
      }
    });

    
    const data = await response.json();

    const newsContainer = document.getElementById("main");


    
    if (Array.isArray(data.articles) && data.articles.length > 0) {
      let randomNo; // Declare randomNo outside the loop

      do {
        randomNo = Math.floor(Math.random() * 100) + 1;
      } while (!data.articles[randomNo - 1].urlToImage); // Ensure an article with an image is found

      const randomArticle = data.articles[randomNo - 1];
      const mainImage = document.getElementById("mainImage");
      const titleElement = document.createElement("p");
      const descElement = document.createElement("p")
      const descPart = document.getElementById("descriptions")


      mainImage.src = randomArticle.urlToImage;
      mainImage.style.borderRadius = "12px"
      titleElement.textContent = randomArticle.title;
      titleElement.style.textAlign = "center"
      descElement.textContent = randomArticle.description

      const title = document.getElementById("LP-IMG"); // Assuming you have a container for the title
      title.appendChild(titleElement); // Append the title to the container
      descPart.appendChild(descElement);
      titleElement.id = "Titles"
      
    } else {
      console.error('No articles found or data.articles is not an array.');
    }
    






    data.articles.forEach(article => {
      if (article.urlToImage) { // Check if image URL exists
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        const image = document.createElement("img");
        image.style.borderRadius = "10px"
        image.src = article.urlToImage;
        image.alt = article.title || "News Image"; // Provide meaningful alt text
        image.onerror = function() { // Handle missing or broken images
          this.style.display = "none"; // Hide the image element
          // Optionally: Display a placeholder image
        };
        newsCard.appendChild(image);

        const title = document.createElement("p");
        const description = document.createElement("p");
        title.textContent = article.title;
        description.textContent = article.description;
        title.style.textAlign = "center";
        title.classList.add("news-title"); // Assuming you meant 'news-title'


        newsCard.appendChild(title);
        newsCard.appendChild(description)
        newsCard.style.borderRadius = "10px"

        const origin = document.createElement("p");
        origin.textContent = article.source.name;
        origin.classList.add("news-origin"); // Assuming you meant 'news-origin'
        newsCard.appendChild(origin);
        newsCard.style.cursor = "pointer"


        newsContainer.appendChild(newsCard);
        
      }
       

    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

getNews();



