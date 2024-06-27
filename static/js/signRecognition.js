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


document.getElementById('abjad-button').addEventListener('click', function() {
    const carouselInner = document.getElementById('carousel-images');
    carouselInner.innerHTML = '';

    const images = [
        '/static/assets/bisindo-A.png',
        '/static/assets/bisindo-B.png',
        '/static/assets/bisindo-C.png',
        '/static/assets/bisindo-D.png',
        '/static/assets/bisindo-E.png',
        '/static/assets/bisindo-F.png',
        '/static/assets/bisindo-G.png',
        '/static/assets/bisindo-H.png',
        '/static/assets/bisindo-I.png',
        '/static/assets/bisindo-J.png',
        '/static/assets/bisindo-K.png',
        '/static/assets/bisindo-L.png',
        '/static/assets/bisindo-M.png',
        '/static/assets/bisindo-N.png',
        '/static/assets/bisindo-O.png',
        '/static/assets/bisindo-P.png',
        '/static/assets/bisindo-Q.png',
        '/static/assets/bisindo-R.png',
        '/static/assets/bisindo-S.png',
        '/static/assets/bisindo-T.png',
        '/static/assets/bisindo-U.png',
        '/static/assets/bisindo-V.png',
        '/static/assets/bisindo-W.png',
        '/static/assets/bisindo-X.png',
        '/static/assets/bisindo-Y.png',
        '/static/assets/bisindo-Z.png',
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
        '/static/assets/bisindo-0.png',
        '/static/assets/bisindo-1.png',
        '/static/assets/bisindo-2.png',
        '/static/assets/bisindo-3.png',
        '/static/assets/bisindo-4.png',
        '/static/assets/bisindo-5.png',
        '/static/assets/bisindo-6.png',
        '/static/assets/bisindo-7.png',
        '/static/assets/bisindo-8.png',
        '/static/assets/bisindo-9.png',
        '/static/assets/bisindo-10.png',
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

document.getElementById('sapaan-button').addEventListener('click', function() {
    const carouselInner = document.getElementById('carousel-images');
    carouselInner.innerHTML = '';

    const videos = [
        '/static/assets/bisindo-halo.mp4',
        '/static/assets/bisindo-kabar.mp4',
        '/static/assets/bisindo-nama.mp4',
        '/static/assets/bisindo-saya.mp4',
        '/static/assets/bisindo-dia.mp4',
        '/static/assets/bisindo-pagi.mp4',
        '/static/assets/bisindo-siang.mp4',
        '/static/assets/bisindo-sore.mp4',
        '/static/assets/bisindo-malam.mp4',
        '/static/assets/bisindo-ketemu.mp4',
        '/static/assets/bisindo-10.mp4',
    ];
    
    videos.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        
        const video = document.createElement('video');
        video.className = 'd-block w-100';
        video.src = src;
        video.alt = `Gesture ${index}`;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;

                // Add an event listener to move to the next carousel item when the video ends
        video.addEventListener('ended', function() {
            const nextButton = document.querySelector('#carouselExampleIndicators .carousel-control-next');
            nextButton.click();
        });
        
        div.appendChild(video);
        carouselInner.appendChild(div);
    });

    document.getElementById('cards-container').classList.remove('d-none');
});


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