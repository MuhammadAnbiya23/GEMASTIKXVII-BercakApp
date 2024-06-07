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
        cardsContainer.classList.add('d-none');
        feedbackSection.style.display = 'none';
        quizSection.style.display = 'none';
        footer.style.display = 'none';
        startButton.textContent = 'Mulai Pengenalan';

        stream.getTracks().forEach(track => track.stop());
        stream = null;
    } else {
        // Start recognition
        cameraContainer.style.display = 'block';
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

document.addEventListener('DOMContentLoaded', function() {
    const alphabetList = document.getElementById('alphabet-list');
    const gestureImage = document.getElementById('gesture-image');

    alphabetList.addEventListener('click', function(event) {
        if(event.target && event.target.nodeName == 'LI') {
            const letter = event.target.getAttribute('data-letter');
            // Ubah URL gambar sesuai dengan abjad yang diklik
            gestureImage.src = `{{ url_for('static', filename='assets/gestures/${letter}.png') }}`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const alphabetList = document.getElementById('alphabet-list');
    const gestureContainer = document.getElementById('gesture-container');

    // Sembunyikan kontainer gesture saat memulai
    gestureContainer.style.display = 'none';

    // Tambahkan event listener pada tombol mulai
    startButton.addEventListener('click', function() {
        // Tampilkan kontainer abjad
        alphabetList.style.display = 'block';

        // Sembunyikan tombol mulai
        startButton.style.display = 'none';
    });

    // Tambahkan event listener untuk klik pada abjad
    alphabetList.addEventListener('click', function(event) {
        if(event.target && event.target.nodeName == 'LI') {
            const letter = event.target.getAttribute('data-letter');
            const gestureImage = document.getElementById('gesture-image');
            
            // Ubah URL gambar sesuai dengan abjad yang diklik
            gestureImage.src = `{{ url_for('static', filename='assets/gestures/${letter}.png') }}`;
            
            // Tampilkan kontainer gesture
            gestureContainer.style.display = 'block';
        }
    });
});




