function startRecognition() {
    const cameraContainer = document.getElementById('camera-container');
    const feedbackSection = document.getElementById('feedback-section');
    const quizSection = document.getElementById('quiz-section');
    const video = document.getElementById('video');
    const instruction = document.getElementById('instruction');
    const feedback = document.getElementById('feedback');

    cameraContainer.style.display = 'block';
    feedbackSection.style.display = 'none';
    quizSection.style.display = 'none';

    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            instruction.innerText = 'Gerakan tangan Anda di dalam kotak merah untuk mulai pengenalan.';
            feedback.style.display = 'none';

            // Placeholder for sign recognition logic
            startSignRecognition(video);
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
            feedback.style.display = 'block';
        });
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
