const video = document.querySelector('#player');
const canvas = document.querySelector('#canvas');
const captureButton = document.querySelector('#capture');
const shareButton = document.querySelector('#share');

let currentCoords = { lat: 50.0614, lng: 19.9366 };
let map, marker;


function initMap() {
    map = L.map('map').setView([52.23, 21.01], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            currentCoords.lat = position.coords.latitude;
            currentCoords.lng = position.coords.longitude;
            
            const pos = [currentCoords.lat, currentCoords.lng];
            map.setView(pos, 16);
            
            if (marker) {
                marker.setLatLng(pos);
            } else {
                marker = L.marker(pos).addTo(map).bindPopup("Jesteś tutaj").openPopup();
            }
        }, (err) => console.error("Błąd GPS:", err), { enableHighAccuracy: true });
    }
}

navigator.mediaDevices.getUserMedia({ 
    video: { facingMode: "environment" }
}).then((stream) => {
    video.srcObject = stream;
}).catch(err => alert("Brak dostępu do aparatu: " + err));

captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText(`${new Date().toLocaleString()}`, 10, canvas.height - 40);
    context.fillText(`Lat: ${currentCoords.lat.toFixed(4)} Lng: ${currentCoords.lng.toFixed(4)}`, 10, canvas.height - 10);

    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = `geocache-${Date.now()}.png`;
    link.href = imageURL;
    link.click();

    alert(`Zapisano zdjęcie! Współrzędne: ${currentCoords.lat.toFixed(4)}, ${currentCoords.lng.toFixed(4)}`);
});

shareButton.addEventListener('click', async () => {
    if (!navigator.share) {
        alert("Twoja przeglądarka nie wspiera udostępniania.");
        return;
    }

    try {
        await navigator.share({
            title: 'Moje znalezisko Geocache!',
            text: `Znalazłem skrytkę tutaj: https://www.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}`,
            url: window.location.href
        });
    } catch (err) {
        console.log('Anulowano udostępnianie');
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log(err));
    });
}

initMap();
