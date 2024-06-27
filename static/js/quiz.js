document.addEventListener("DOMContentLoaded", function () {
    const startGame1Button = document.getElementById("startGame1");
    const startGame2Button = document.getElementById("startGame2");
    const game1Container = document.getElementById("game1-container");
    const game2Container = document.getElementById("game2-container");
    const rewardSection = document.getElementById("reward-section");
    const game2QuestionContent = document.getElementById("game2-question-content");
    const game2Options = document.getElementById("game2-options");
    const game2Feedback = document.getElementById("game2-feedback");
    const game2RewardPoints = document.getElementById("game2-reward-points");
    const game2Timer = document.getElementById("game2-timer");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");
    let game2Interval;
    let game2TimeLeft = 100;
    let game2Points = 0;

    const game2Questions = [
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/selamat-pagi.jpg",
            options: ["Selamat pagi", "Selamat sore"],
            correctAnswer: "Selamat pagi"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/siapa.jpg",
            options: ["Dimana", "Siapa"],
            correctAnswer: "Siapa"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bagaimana.jpg",
            options: ["Bagaimana", "Kenapa"],
            correctAnswer: "Bagaimana"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/selamat-malam.jpg",
            options: ["Selamat malam", "Selamat sore"],
            correctAnswer: "Selamat malam"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/saya.jpg",
            options: ["Saya", "Kami"],
            correctAnswer: "Saya"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/dia.jpg",
            options: ["Dia", "Mereka"],
            correctAnswer: "Dia"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-B.jpg",
            options: ["B", "E"],
            correctAnswer: "B"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-E.jpg",
            options: ["E", "A"],
            correctAnswer: "E"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-R.jpg",
            options: ["Q", "R"],
            correctAnswer: "R"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-C.jpg",
            options: ["O", "C"],
            correctAnswer: "C"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-A.jpg",
            options: ["V", "A"],
            correctAnswer: "A"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-K.jpg",
            options: ["Y", "K"],
            correctAnswer: "K"
        },
        {
            title: "Apa arti gambar kosa isyarat ini?",
            image: "/static/assets/bisindo-P.jpg",
            options: ["P", "D"],
            correctAnswer: "P"
        },
    ];

    function loadGame2Question() {
        const question = game2Questions[game2Points % game2Questions.length];
        game2QuestionContent.innerHTML = `<h2>${question.title}</h2><img src="${question.image}" alt="Gesture Image" class="custom-image-size">`;
        game2Options.innerHTML = question.options.map(option => `
            <button onclick="checkGame2Answer('${option}')">${option}</button>
        `).join(" ");
        game2Feedback.innerText = '';
    }

    window.checkGame2Answer = function (selectedOption) {
        const question = game2Questions[game2Points % game2Questions.length];
        if (selectedOption === question.correctAnswer) {
            game2Points++;
            game2Feedback.innerText = "Benar!";
            correctSound.play();
            if (game2Points % 13 === 0) {
                displayReward();
            } else {
                loadGame2Question();
                game2TimeLeft = 100;
            }
        } else {
            game2Feedback.innerText = "Salah! Permainan berakhir.";
            wrongSound.play();
            clearInterval(game2Interval);
            setTimeout(resetGame2, 2000); // Reset game after 2 seconds
        }
            // Check if all questions have been answered
    if (game2Points === game2Questions.length) {
        clearInterval(game2Interval); // Stop the timer
        game2Feedback.innerText = "Permainan selesai!";
        setTimeout(displayReward, 2000); // Display reward section after 2 seconds
    }
        game2RewardPoints.innerText = `Poin: ${game2Points}`;
    };

    function resetGame2() {
        game2Points = 0;
        game2TimeLeft = 100;
        game2RewardPoints.innerText = `Poin: ${game2Points}`;
        loadGame2Question();
        startGame2Timer();
    }

    document.getElementById("startGame1").addEventListener("click", function(event) {
        event.preventDefault();
        showPopup();
    });
    
    function showPopup() {
        document.getElementById("popup-overlay").style.display = "flex";
    }
    
    function closePopup() {
        document.getElementById("popup-overlay").style.display = "none";
    }
    
    document.getElementById("popup-overlay").addEventListener("click", function(event) {
        if (event.target === document.getElementById("popup-overlay")) {
            closePopup();
        }
    });
    
    document.getElementById("startGame2").addEventListener("click", function(event) {
        event.preventDefault();
        startGame2();
    });
    
    function startGame1() {
        document.getElementById("game1-container").style.display = "block";
        document.getElementById("game2-container").style.display = "none";
        document.getElementById("reward-section").style.display = "none";
    }
    
    function startGame2() {
        document.getElementById("game2-container").style.display = "block";
        document.getElementById("game1-container").style.display = "none";
        document.getElementById("reward-section").style.display = "none";
        resetGame2();
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
                wrongSound.play();
                setTimeout(resetGame2, 2000); // Reset game after 2 seconds
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
    };

            const video = document.getElementById('video');

        // Request access to the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                // Set the video source to the camera stream
                video.srcObject = stream;
            })
            .catch(error => {
                console.error('Error accessing the camera:', error);
            });

});

function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.fade-in-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;

        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

document.getElementById('startGame1').addEventListener('click', function () {
    closePopup(); // Close the popup before showing game1-container
    document.getElementById('game1-container').style.display = 'block';
});

document.getElementById('startGame2').addEventListener('click', function () {
    closePopup(); // Close the popup before showing game2-container
    document.getElementById('game2-container').style.display = 'block';
});

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    html2canvas(document.querySelector('#reward-section')).then(canvas => {
      // Membuat elemen link untuk unduhan
      let link = document.createElement('a');
      link.download = 'sertifikat.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
  