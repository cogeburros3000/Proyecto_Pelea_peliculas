const fetchData = async(searchTerm ) => {
   const response = await axios.get('https://omdbapi.com/',{
    params: {
        apikey: 'fb7911e4',
        s: 'avengers'
        }
    })

    if (response.data.Error) {
        return []
    }

    console.log(response.data.Search)
}


//fetchData()
const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Busqueda  de Peliculas </b> </label>
    <input class = "input" />
    <div class "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results" </div>
        </div>
    </div>
`
const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const debonce = (func, delay = 1000) => {
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() =>{
            func.apply(null, args)
        }, delay)
    }
}

const onInput = async(event) =>{
    const movies = await fetchData(event, target.value)
    console.log("MOVIES:", movies)

    if (movies.length) {
        dropdown.classList.remove('is-active')
        return
    }
    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active')
    
    for(let movie of movies){
        const option = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src = "${imgSrc}" />
        ${movie.Title}
        `
        option.addEventListener('click', () =>{
        dropdown.classList.remove('is-active')
        input.value = movie.Title
        onMovieSelect(movie)
        })
        resultsWrapper.appendChild(option)
    }
}

input.addEventListener('input', debonce(onInput, 1000))

document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})
const onMovieSelect  = async (movie) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '',
            i: movie.imdbID
        }
    })
    console.log(response,data)
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
    return `
        <article class  = "media">
            <figure class = "media-left ">
                <p class = image>
                <img src = "${movieDetail.Poster}" />
                </p>
            </figure>
            <div class = "media-content">
                <div class = "content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
    `
}