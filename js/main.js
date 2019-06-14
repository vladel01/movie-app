const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const apiUrl = 'http://www.omdbapi.com/?'
const apiKey = 'apikey=338f9a63&s='


// Function for creating html elements from the server response
const resultBuilder = function (item) {
    const movieElement = document.createElement('li')

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

    if (searchValue.indexOf(' ')) {        
        finalSearchValue = searchValue.split(' ').join('+').toLowerCase();
    }

    //console.log(searchValue)
    const ajaxCallUrl = apiUrl + apiKey + finalSearchValue
    console.log(ajaxCallUrl)

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
