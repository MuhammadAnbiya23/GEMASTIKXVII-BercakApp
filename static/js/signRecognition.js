function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

let stream = null;

function toggleRecognition() {
    const startButton = document.getElementById('startButton');
    const cameraContainer = document.getElementById('camera-container');
    const cardsContainer = document.getElementById('cards-container');
    const feedbackSection = document.getElementById('feedback-section');
    const quizSection = document.getElementById('quiz-section');
    const footer = document.querySelector('footer');

    if (stream) {
        // Stop recognition
        cameraContainer.style.display = 'none';
        cardsContainer.classList.add('d-none');1
        feedbackSection.style.display = 'none';
        quizSection.style.display = 'none';
        footer.style.display = 'none';
        startButton.textContent = 'Mulai Pengenalan';

        stream.getTracks().forEach(track => track.stop());
        stream = null;
    } else {
        // Start recognition
        cameraContainer.style.display = 'block';``
        cardsContainer.classList.remove('d-none');
        footer.style.display = 'block';
        startButton.textContent = 'Selesai';

        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                stream = mediaStream;
                const video = document.getElementById('video');
                video.srcObject = stream;
                const instruction = document.getElementById('instruction');
                instruction.innerText = 'Gerakan tangan Anda di dalam kotak merah untuk mulai pengenalan.';
                const feedback = document.getElementById('feedback');
                feedback.style.display = 'none';

                // Placeholder for sign recognition logic
                startSignRecognition(video);
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
                const feedback = document.getElementById('feedback');
                feedback.style.display = 'block';
            });
    }
}


function startSignRecognition(video) {
    // Simulate recognition with setTimeout
    setTimeout(() => {
        const translationResult = document.getElementById('translation-result');
        translationResult.innerText = 'Hasil Terjemahan: A';

        const feedbackSection = document.getElementById('feedback-section');
        feedbackSection.style.display = 'block';
    }, 3000);
}

function startQuiz() {
    const cameraContainer = document.getElementById('camera-container');
    const feedbackSection = document.getElementById('feedback-section');
    const quizSection = document.getElementById('quiz-section');

    cameraContainer.style.display = 'block';
    feedbackSection.style.display = 'none';
    quizSection.style.display = 'block';

    displayCommand();
}

function randomCommand() {
    const commands = ['A', 'B', 'C', 'D'];
    const randomIndex = Math.floor(Math.random() * commands.length);
    return commands[randomIndex];
}

function displayCommand() {
    const command = randomCommand();
    const quizCommand = document.getElementById('quiz-command');
    quizCommand.innerText = command;
}

function submitAnswer(isCorrect) {
    const quizFeedback = document.getElementById('quiz-feedback');
    quizFeedback.innerText = isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!';
    quizFeedback.style.display = 'block';

    setTimeout(() => {
        quizFeedback.style.display = 'none';
        displayCommand();
    }, 2000);
}

document.getElementById('abjad-button').addEventListener('click', function() {
    const carouselInner = document.getElementById('carousel-images');
    carouselInner.innerHTML = '';

    const images = [
        '/static/assets/bisindo-A.jpg',
        '/static/assets/bisindo-B.jpg',
        '/static/assets/bisindo-C.jpg',
        '/static/assets/bisindo-D.jpg',
        '/static/assets/bisindo-E.jpg',
        '/static/assets/bisindo-F.jpg',
        '/static/assets/bisindo-G.jpg',
        '/static/assets/bisindo-H.jpg',
        '/static/assets/bisindo-I.jpg',
        '/static/assets/bisindo-J.jpg',
        '/static/assets/bisindo-K.jpg',
        '/static/assets/bisindo-L.jpg',
        '/static/assets/bisindo-M.jpg',
        '/static/assets/bisindo-N.jpg',
        '/static/assets/bisindo-O.jpg',
        '/static/assets/bisindo-P.jpg',
        '/static/assets/bisindo-Q.jpg',
        '/static/assets/bisindo-R.jpg',
        '/static/assets/bisindo-S.jpg',
        '/static/assets/bisindo-T.jpg',
        '/static/assets/bisindo-U.jpg',
        '/static/assets/bisindo-V.jpg',
        '/static/assets/bisindo-W.jpg',
        '/static/assets/bisindo-X.jpg',
        '/static/assets/bisindo-Y.jpg',
        '/static/assets/bisindo-Z.jpg',
    ];
    
    images.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.className = 'd-block w-100';
        img.src = src;
        img.alt = `Gesture ${index + 1}`;
        div.appendChild(img);
        carouselInner.appendChild(div);
    });

    document.getElementById('cards-container').classList.remove('d-none');
});

document.getElementById('angka-button').addEventListener('click', function() {
    const carouselInner = document.getElementById('carousel-images');
    carouselInner.innerHTML = '';

    const images = [
        '/static/assets/bisindo-1.jpg',
        '/static/assets/bisindo-2.jpg',
        '/static/assets/bisindo-3.jpg',
        '/static/assets/bisindo-4.jpg',
        '/static/assets/bisindo-5.jpg',
        '/static/assets/bisindo-6.jpg',
        '/static/assets/bisindo-7.jpg',
        '/static/assets/bisindo-8.jpg',
        '/static/assets/bisindo-9.jpg',
        '/static/assets/bisindo-10.jpg',
    ];
    
    images.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.className = 'd-block w-100';
        img.src = src;
        img.alt = `Gesture ${index}`;
        div.appendChild(img);
        carouselInner.appendChild(div);
    });

    document.getElementById('cards-container').classList.remove('d-none');
});