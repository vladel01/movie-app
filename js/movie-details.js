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
                    movieDetailsModal(responseData)
                    console.log(responseData)
                }

            })

        }
    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    })
}


function movieDetailsModal(data) {    

    const movieModal = document.querySelector('.movie-details-modal')    
    movieModal.classList.add('show')
    

    const detailsList = document.createElement('ul')
    detailsList.classList.add('movie-details-list')

    document.querySelector('.modal-content').append(detailsList)

    const title = document.createElement('li')
    title.innerHTML = '<strong>Title:</strong>' + data.Title
    detailsList.append(title)

    const year = document.createElement('li')
    year.innerHTML = '<strong>Year:</strong>' + data.Year
    detailsList.append(year)

    const released = document.createElement('li')
    released.innerHTML = '<strong>Released:</strong>' + data.Released
    detailsList.append(released)

    const runtime = document.createElement('li')
    runtime.innerHTML = '<strong>Runtime:</strong>' + data.Runtime
    detailsList.append(runtime)

    const genre = document.createElement('li')
    genre.innerHTML = '<strong>Genre:</strong>' + data.Genre
    detailsList.append(genre)

    const actors = document.createElement('li')
    actors.innerHTML = '<strong>Actors:</strong>' + data.Actors
    detailsList.append(actors)

    const write = document.createElement('li')
    write.innerHTML = '<strong>Write:</strong>' + data.Write
    detailsList.append(write)

    const plot = document.createElement('li')
    plot.innerHTML = '<strong>Plot:</strong>' + data.Plot
    detailsList.append(plot)
}

function closeMovieModal() {
    const movieModal = document.querySelector('.movie-details-modal')
    movieModal.classList.remove('show')

    const movieModalList = document.querySelector('.movie-details-list')
    movieModalList.remove()
}