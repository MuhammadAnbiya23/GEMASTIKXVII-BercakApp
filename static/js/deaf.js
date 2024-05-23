document.addEventListener('DOMContentLoaded', function () {
    const sortButtons = document.querySelectorAll('.sort-button');
    
    sortButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Perform sorting or filtering based on the clicked button
            const sortType = this.dataset.sort;
            console.log(`Sorting by: ${sortType}`);
            // You can add your sorting/filtering logic here
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sortButtons = document.querySelectorAll('.sort-button');
    const searchInput = document.getElementById('search');
    const articleContainer = document.querySelector('.article-preview');
    
    const articles = [
        {
            id: 1,
            title: 'Judul Artikel 1',
            description: 'Deskripsi singkat artikel 1...',
            image: 'assets/hear.png',
            category: 'terbaru'
        },
        {
            id: 2,
            title: 'Judul Artikel 2',
            description: 'Deskripsi singkat artikel 2...',
            image: 'assets/article2.jpg',
            category: 'sehat-nutrisi'
        },
        // Tambahkan lebih banyak artikel di sini
    ];
    
    function displayArticles(filteredArticles) {
        articleContainer.innerHTML = '';
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            articleCard.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="article-img">
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="page${article.id}.html" class="read-more-button">Selengkapnya</a>
                </div>
            `;
            articleContainer.appendChild(articleCard);
        });
    }

    function filterArticles(category) {
        if (category === 'terbaru') {
            displayArticles(articles);
        } else {
            const filteredArticles = articles.filter(article => article.category === category);
            displayArticles(filteredArticles);
        }
    }

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.sort-button.active').classList.remove('active');
            button.classList.add('active');
            filterArticles(button.dataset.sort);
        });
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) || 
            article.description.toLowerCase().includes(searchTerm)
        );
        displayArticles(filteredArticles);
    });

    // Display all articles on initial load
    displayArticles(articles);
});

document.addEventListener('DOMContentLoaded', function () {
    const sortButtons = document.querySelectorAll('.sort-button');
    const searchInput = document.getElementById('search');
    const articleContainer = document.querySelector('.article-preview');
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    const articles = [
        {
            id: 1,
            title: 'Judul Artikel 1',
            description: 'Deskripsi singkat artikel 1...',
            image: 'static/assets/artikelPict.jpg',
            category: 'terbaru'
        },
        {
            id: 2,
            title: 'Judul Artikel 2',
            description: 'Deskripsi singkat artikel 2...',
            image: 'https://via.placeholder.com/300x200',
            category: 'sehat-nutrisi'
        },
        {
            id: 3,
            title: 'Judul Artikel 3',
            description: 'Deskripsi singkat artikel 3...',
            image: 'https://via.placeholder.com/300x200',
            category: 'teman-tuli'
        },
        // Tambahkan lebih banyak artikel di sini
    ];

    function displayArticles(filteredArticles) {
        articleContainer.innerHTML = '';
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            articleCard.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="article-img">
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="#" class="read-more-button">Selengkapnya</a>
                </div>
            `;
            articleContainer.appendChild(articleCard);
        });
    }

    function filterArticles(category) {
        if (category === 'terbaru') {
            displayArticles(articles);
        } else {
            const filteredArticles = articles.filter(article => article.category === category);
            displayArticles(filteredArticles);
        }
    }

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.sort-button.active').classList.remove('active');
            button.classList.add('active');
            filterArticles(button.dataset.sort);
        });
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm)
        );
        displayArticles(filteredArticles);
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