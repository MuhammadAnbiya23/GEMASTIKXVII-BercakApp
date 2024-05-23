document.addEventListener("DOMContentLoaded", function() {
    const startSpeechRecognitionButton = document.getElementById("startSpeechRecognition");
    const speechResult = document.getElementById("speechResult");
    const signVisual = document.getElementById("signVisual");

    const startSignRecognitionButton = document.getElementById("startSignRecognition");
    const signVideo = document.getElementById("signVideo");
    const signTextResult = document.getElementById("signTextResult");

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function() {
        speechResult.textContent = "Listening...";
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        speechResult.textContent = `You said: ${transcript}`;
        // Placeholder for converting speech to sign language
        signVisual.textContent = "🔤"; // Replace with actual sign language translation
    };

    startSpeechRecognitionButton.addEventListener("click", function() {
        recognition.start();
    });

    // Initialize video for sign language recognition
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                signVideo.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Something went wrong with accessing the camera.");
            });
    }

    startSignRecognitionButton.addEventListener("click", function() {
        // Placeholder for sign language recognition logic
        signTextResult.textContent = "Sign language to text recognition started...";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const startSpeechRecognitionButton = document.getElementById("startSpeechRecognition");
    const speechResult = document.getElementById("speechResult");
    const signVisual = document.getElementById("signVisual");

    const startSignRecognitionButton = document.getElementById("startSignRecognition");
    const signVideo = document.getElementById("signVideo");
    const signTextResult = document.getElementById("signTextResult");

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function() {
        speechResult.textContent = "Listening...";
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        speechResult.textContent = `You said: ${transcript}`;
        // Placeholder for converting speech to sign language
        signVisual.textContent = "🔤"; // Replace with actual sign language translation
    };

    startSpeechRecognitionButton.addEventListener("click", function() {
        recognition.start();
    });

    // Initialize video for sign language recognition
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                signVideo.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Something went wrong with accessing the camera.");
            });
    }

    startSignRecognitionButton.addEventListener("click", function() {
        // Placeholder for sign language recognition logic
        signTextResult.textContent = "Sign language to text recognition started...";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const startSpeechRecognitionButton = document.getElementById("startSpeechRecognition");
    const speechResult = document.getElementById("speechResult");

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function() {
        speechResult.textContent = "Listening...";
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        speechResult.textContent = `You said: ${transcript}`;
    };

    startSpeechRecognitionButton.addEventListener("click", function() {
        recognition.start();
    });
});
