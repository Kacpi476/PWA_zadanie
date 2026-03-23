const video = document.querySelector('#player');
const canvas = document.querySelector('#canvas');
const captureButton = document.querySelector('#capture');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => { video.srcObject = stream; });

    captureButton.addEventListener('click', () => {
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

    });
    //asdadsasd