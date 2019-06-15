function expandDetails(e) {
    const movieId = e.getAttribute('id')

    getMovieDataByID(movieId)
}

function getMovieDataByID(movieID) {
    fetch(apiUrl + '&i=' + movieID).then(function (response) {
        if (response.status !== 200) {
            console.log('Request failed. Returned status of ' + response.status)
            return
        }

        if (response.ok) {

            // Handle of response data
            return response.json().then(function (responseData) {

                if (responseData.Response == 'False') {
                    searchResults.innerHTML = '<div class="not-found-message"><p>' + responseData.Error + '</p></div>'
                } else {                    
                    //movieDetailsModal(moresponseData)
                    console.log(responseData)
                }

            })

        }
    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    })
}