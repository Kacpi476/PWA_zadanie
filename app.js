const video = document.querySelector('#player');
const canvas = document.querySelector('#canvas');
const captureButton = document.querySelector('#capture');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => { video.srcObject = stream; });

let currentCoords = { lat: 0, lng: 0 };

    captureButton.addEventListener('click', () => {
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
 if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            currentCoords.lat = position.coords.latitude;
            currentCoords.lng = position.coords.longitude;
            
            alert(`Znalezisko zarejestrowane! Współrzędne: ${currentCoords.lat}, ${currentCoords.lng}`);
            // Tutaj możesz dodać kod Leaflet.js, aby postawić pinezkę na mapie 
        });
    }
});

    
    //asdadsasd
