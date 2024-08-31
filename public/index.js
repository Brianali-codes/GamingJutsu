async function getNews(){
  const procyUrl = ''
  const apiKey = "4e1d64b3da574f94b858e5bb93328485"
  const url = `https://newsapi.org/v2/everything?q=gaming&sortBy=popularity&apiKey=${apiKey}`

  

  try{
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    console.log(data.articles)
    console.log(data.articles[1])
    console.log(data.articles[1].description)

    data.articles.forEach(game => {
        const title = document.createElement('p')
        const origin = document.createElement('p')
        const mainDoc = document.getElementById("main")
        
        origin.textContent = game.source.name
        title.textContent = game.title
        mainDoc.appendChild(origin)
        mainDoc.appendChild(title)


    });


  }
  catch(e){
    console.error("error")
  }

}

getNews()

