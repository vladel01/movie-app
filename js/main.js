const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const apiUrl = 'http://www.omdbapi.com/?apikey=338f9a63'
const apiSearchByTitle = '&s='


// Function for creating html elements from the server response
const resultBuilder = function (item) {
    const movieElement = document.createElement('li')
    movieElement.className = 'movie-result'
    movieElement.setAttribute('id', item.imdbID)
    movieElement.setAttribute('onclick', 'expandDetails(this)')

    if (item.Poster !== 'N/A') {
        movieElement.style.backgroundImage = `url(${item.Poster})`
    } else {
        movieElement.className = 'no-poster'
    }

    const movieTitle = document.createElement('span')
    movieTitle.className = 'title'
    movieTitle.innerHTML = item.Title
    movieElement.append(movieTitle)

    searchResults.append(movieElement)
}


// Search form submit is done by a GET call from Api's movies database 
form.addEventListener('submit', function(event) {
    event.preventDefault()

    const searchValue = input.value
    let finalSearchValue = searchValue

    // Function that is used as protection to empty spaces
    const createSearchWord = function(final, word) {
        if (word != '') {
            return `${final}+${word}` 
        } else {
            return `${final}`
        }  
    }

    if (searchValue.indexOf(' ')) {                
        words = searchValue.split(' ');
        finalSearchValue = words.reduce(createSearchWord)
    }

    console.log(finalSearchValue)
    const ajaxCallUrl = apiUrl + apiSearchByTitle + finalSearchValue

    fetch(ajaxCallUrl).then(function(response) {
        if (response.status !== 200) {
            console.log('Request failed. Returned status of ' + response.status)
            return
        }

        if (response.ok) {

            // Clear all previous results
            clearPreviousResults();

            // Handle of response data
            return response.json().then(function (responseData) {
                
                if (responseData.Response == 'False') {                    
                    searchResults.innerHTML = '<div class="not-found-message"><p>' + responseData.Error + '</p></div>'
                } else {
                    let results = responseData.Search

                    results.forEach(function (movie) {
                        resultBuilder(movie)
                    }) 
                    console.log(results)
                }                
                           
            })      
            
        }    
    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    })
})    


// Function to clear previously displayed results
function clearPreviousResults() {
    searchResults.innerHTML = '';
}
