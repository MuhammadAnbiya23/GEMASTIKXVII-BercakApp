function menuToggle() {
  const toggleMenu = document.querySelector(".menu");
  toggleMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    const startSpeechRecognitionButton = document.getElementById("startSpeechRecognition");
    const speechRecognitionButton = document.getElementById("speechRecognitionButton");
    const speechResult = document.getElementById("speechResult");
    const signVisual = document.getElementById("signVisual");

    const startSignRecognitionButton = document.getElementById("startSignRecognition");
    const signTextResult = document.getElementById("signTextResult");

    // Inisialisasi pengenalan suara
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'id-ID'; // Atur bahasa
    recognition.continuous = true; // Aktifkan pengakuan kontinu
    recognition.interimResults = true; // Aktifkan hasil interim

    recognition.onstart = function() {
      speechResult.textContent = "Mendengarkan...";
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };

    recognition.onresult = function(event) {
      let interim_transcript = '';
      let final_transcript = '';

      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      speechResult.innerHTML = `Anda mengatakan: ${final_transcript || interim_transcript}`;
      signVisual.textContent = "🔤"; // Ganti dengan terjemahan bahasa isyarat yang sebenarnya
    };

    startSpeechRecognitionButton.addEventListener("click", function() {
      recognition.start();
      setTimeout(function() {
        recognition.stop();
        speechResult.textContent = "Pengenalan suara dihentikan setelah 15 detik.";
      }, 15000); // Hentikan setelah 15 detik
    });

    // Tampilkan modal untuk fitur Pengenalan Suara
    speechRecognitionButton.addEventListener("click", function() {
      const modal = document.getElementById("developmentModal");
      const closeButton = document.querySelector(".close-button");

      modal.style.display = "block";

      closeButton.addEventListener("click", function() {
        modal.style.display = "none";
      });

      window.addEventListener("click", function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });

    // Logika placeholder untuk pengenalan bahasa isyarat dengan batas waktu
    let signRecognitionTimeout;
    startSignRecognitionButton.addEventListener("click", function() {
      signTextResult.textContent = "Pengenalan bahasa isyarat ke teks dimulai...";
      signRecognitionTimeout = setTimeout(function() {
        signTextResult.textContent = "Pengenalan bahasa isyarat dihentikan setelah 15 detik.Silahkan mulai kembali";
      }, 15000); // Hentikan setelah 15 detik
    });
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
