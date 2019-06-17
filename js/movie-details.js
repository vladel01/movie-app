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

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    document.querySelector('.movie-details-modal').append(modalContent)

    // Video preview is added on the popup
    const videoElement = document.createElement('video')
    videoElement.setAttribute('autoplay', '')
    videoElement.setAttribute('width', '350')
    videoElement.setAttribute('src', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
    modalContent.append(videoElement)

    // Popup closing button
    const closeButton = document.createElement('button')
    closeButton.setAttribute('onclick', 'closeMovieModal()')
    closeButton.innerHTML = 'X'
    modalContent.append(closeButton)

    // Creating a new object with the movie details that we want to display
    const movieDetailsObject = {
        'title': data.Title,
        'year': data.Year,
        'released': data.Released,
        'runtime': data.Runtime,
        'genre': data.Genre,
        'actors': data.Actors,
        'writer': data.Writer,
        'plot': data.Plot
    } 

    // Creating the array of all our movie properties
    const detailsKeys = Object.keys(movieDetailsObject)

    // Showing the popup with the movie details and its overlay
    const movieModal = document.querySelector('.movie-details-modal')    
    movieModal.classList.add('show')
    const movieModalOverlay = document.querySelector('.movie-modal-overlay')
    movieModalOverlay.classList.add('show')

    const detailsList = document.createElement('ul')
    detailsList.classList.add('movie-details-list')

    // Creating a list item for every movie detail and add it to the popup
    detailsKeys.forEach(function (detail) {
        const detailTarget = document.createElement('li')
        detailTarget.innerHTML = '<strong>' + detail + ':</strong>' + movieDetailsObject[detail]
        detailsList.append(detailTarget)
    })

    modalContent.append(detailsList)
}

function closeMovieModal() {
    const movieModal = document.querySelector('.movie-details-modal')
    movieModal.classList.remove('show')

    const movieModalOverlay = document.querySelector('.movie-modal-overlay')
    movieModalOverlay.classList.remove('show')

    const movieModalList = document.querySelector('.modal-content')
    movieModalList.remove()
}