document.addEventListener("DOMContentLoaded", function () {
    const startGame1Button = document.getElementById("startGame1");
    const startGame2Button = document.getElementById("startGame2");
    const game1Container = document.getElementById("game1-container");
    const game2Container = document.getElementById("game2-container");
    const rewardSection = document.getElementById("reward-section");
    const game1Command = document.getElementById("game1-command");
    const game1Feedback = document.getElementById("game1-feedback");
    const game1RewardPoints = document.getElementById("game1-reward-points");
    const game1Timer = document.getElementById("game1-timer");
    const game2QuestionContent = document.getElementById("game2-question-content");
    const game2Options = document.getElementById("game2-options");
    const game2Feedback = document.getElementById("game2-feedback");
    const game2RewardPoints = document.getElementById("game2-reward-points");
    const game2Timer = document.getElementById("game2-timer");
    let game1Interval;
    let game1TimeLeft = 100;
    let game1Points = 0;
    let game2Interval;
    let game2TimeLeft = 100;
    let game2Points = 0;

    const commands = ["Selamat pagi", "Terima kasih", "Selamat malam", "Maaf", "Tolong"];

    const game2Questions = [
        {
            title: "Apa arti gerakan ini?",
            image: "gesture1.jpg",
            options: ["Selamat pagi", "Selamat malam"],
            correctAnswer: "Selamat pagi"
        },
        {
            title: "Apa arti gambar bahasa isyarat ini?",
            image: "gesture2.jpg",
            options: ["Terima kasih", "Sama-sama"],
            correctAnswer: "Terima kasih"
        }
    ];

    startGame1Button.addEventListener("click", startGame1);
    startGame2Button.addEventListener("click", startGame2);

    function startGame1() {
        game1Container.style.display = "block";
        game2Container.style.display = "none";
        rewardSection.style.display = "none";
        game1Command.innerText = getRandomCommand();
        startGame1Timer();
    }

    function getRandomCommand() {
        return commands[Math.floor(Math.random() * commands.length)];
    }

    function checkGame1Answer(userGesture) {
        const correctGesture = game1Command.innerText;
        if (userGesture === correctGesture) {
            game1Points++;
            game1Feedback.innerText = "Benar!";
            if (game1Points % 5 === 0) {
                displayReward();
            } else {
                game1Command.innerText = getRandomCommand();
                game1TimeLeft = 100;
            }
        } else {
            game1Feedback.innerText = "Salah! Coba lagi.";
            game1TimeLeft = 100;
        }
        game1RewardPoints.innerText = `Poin: ${game1Points}`;
    }

    function startGame1Timer() {
        clearInterval(game1Interval);
        game1Interval = setInterval(function () {
            if (game1TimeLeft > 0) {
                game1TimeLeft--;
                game1Timer.style.width = `${game1TimeLeft}%`;
            } else {
                clearInterval(game1Interval);
                game1Feedback.innerText = "Waktu habis!";
            }
        }, 100);
    }

    function startGame2() {
        game2Container.style.display = "block";
        game1Container.style.display = "none";
        rewardSection.style.display = "none";
        game2Points = 0;
        loadGame2Question();
        startGame2Timer();
    }

    function loadGame2Question() {
        const question = game2Questions[game2Points % game2Questions.length];
        game2QuestionContent.innerHTML = `<img src="${question.image}" alt="Gesture Image">`;
        game2Options.innerHTML = question.options.map(option => `
            <button class="btn btn-secondary" onclick="checkGame2Answer('${option}')">${option}</button>
        `).join(" ");
    }

    window.checkGame2Answer = function (selectedAnswer) {
        const question = game2Questions[game2Points % game2Questions.length];
        if (selectedAnswer === question.correctAnswer) {
            game2Points++;
            game2Feedback.innerText = "Benar!";
            if (game2Points % 5 === 0) {
                displayReward();
            } else {
                loadGame2Question();
                game2TimeLeft = 100;
            }
        } else {
            game2Feedback.innerText = "Salah! Permainan berakhir.";
            clearInterval(game2Interval);
        }
        game2RewardPoints.innerText = `Poin: ${game2Points}`;
    }

    function startGame2Timer() {
        clearInterval(game2Interval);
        game2Interval = setInterval(function () {
            if (game2TimeLeft > 0) {
                game2TimeLeft--;
                game2Timer.style.width = `${game2TimeLeft}%`;
            } else {
                clearInterval(game2Interval);
                game2Feedback.innerText = "Waktu habis!";
            }
        }, 100);
    }

    function displayReward() {
        game1Container.style.display = "none";
        game2Container.style.display = "none";
        rewardSection.style.display = "block";
    }

    window.claimReward = function () {
        alert("Reward AR filter kamera Anda telah diklaim!");
    }

    // Access user's camera
    function startCamera() {
        const video = document.getElementById("video");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.srcObject = stream;
                video.play();
            });
        }
    }

    startCamera();
});

