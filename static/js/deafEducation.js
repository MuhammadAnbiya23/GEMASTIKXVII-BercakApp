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

document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const readMoreText = document.querySelector('.read-more-text');
    const articleContent = document.querySelector('.article-content');

    readMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (articleContent.classList.contains('show')) {
            articleContent.classList.remove('show');
            articleContent.style.display = 'none';
            readMoreText.textContent = 'Baca Lebih Lanjut';
            readMoreBtn.classList.remove('btn-secondary');
            readMoreBtn.classList.add('btn-primary');
        } else {
            articleContent.classList.add('show');
            articleContent.style.display = 'block';
            readMoreText.textContent = 'Tutup';
            readMoreBtn.classList.remove('btn-primary');
            readMoreBtn.classList.add('btn-secondary');
        }
        // Move the button to the bottom of the content
        document.querySelector('.article-main').appendChild(readMoreBtn);
    });
});



    // Display all articles on initial load
    displayArticles(articles);

    // Video controls
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.video-player');
        const playPauseBtn = wrapper.querySelector('.play-pause');
        const volumeUpBtn = wrapper.querySelector('.volume-up');
        const volumeDownBtn = wrapper.querySelector('.volume-down');
        const fullscreenBtn = wrapper.querySelector('.fullscreen');

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                video.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        volumeUpBtn.addEventListener('click', () => {
            if (video.volume < 1) video.volume += 0.1;
        });

        volumeDownBtn.addEventListener('click', () => {
            if (video.volume > 0) video.volume -= 0.1;
        });

        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { /* Firefox */
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE/Edge */
                video.msRequestFullscreen();
            }
        });
    });


document.addEventListener('DOMContentLoaded', function () {
    const sortButtons = document.querySelectorAll('.sort-button');
    const readMoreToggles = document.querySelectorAll('.read-more-toggle');

    sortButtons.forEach(button => {
        button.addEventListener('click', function () {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const sortType = this.dataset.sort;
            console.log(`Sorting by: ${sortType}`);
        });
    });

    readMoreToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                this.textContent = 'Lihat Lebih Sedikit';
            } else {
                content.style.display = 'none';
                this.textContent = 'Lihat Selengkapnya';
            }
        });
    });

    // Video controls
    const videos = document.querySelectorAll('.video-player');
    const playPauseButtons = document.querySelectorAll('.play-pause');
    const volumeUpButtons = document.querySelectorAll('.volume-up');
    const volumeDownButtons = document.querySelectorAll('.volume-down');
    const fullscreenButtons = document.querySelectorAll('.fullscreen');

    playPauseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (videos[index].paused) {
                videos[index].play();
                button.textContent = 'Pause';
            } else {
                videos[index].pause();
                button.textContent = 'Play';
            }
        });
    });

    volumeUpButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (videos[index].volume < 1) videos[index].volume += 0.1;
        });
    });

    volumeDownButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (videos[index].volume > 0) videos[index].volume -= 0.1;
        });
    });

    fullscreenButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (videos[index].requestFullscreen) {
                videos[index].requestFullscreen();
            } else if (videos[index].mozRequestFullScreen) {
                videos[index].mozRequestFullScreen();
            } else if (videos[index].webkitRequestFullscreen) {
                videos[index].webkitRequestFullscreen();
            } else if (videos[index].msRequestFullscreen) {
                videos[index].msRequestFullscreen();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const articleContent = document.querySelector('.article-content');

    readMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (articleContent.style.display === 'none' || articleContent.style.display === '') {
            articleContent.style.display = 'block';
            readMoreBtn.textContent = 'Baca Lebih Sedikit';
        } else {
            articleContent.style.display = 'none';
            readMoreBtn.textContent = 'Baca Lebih Lanjut';
        }
    });
});