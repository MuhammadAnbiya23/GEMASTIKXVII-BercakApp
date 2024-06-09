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
  
    // Hapus kode akses kamera
  
    startSignRecognitionButton.addEventListener("click", function() {
      // Placeholder untuk logika pengenalan bahasa isyarat
      signTextResult.textContent = "Pengenalan bahasa isyarat ke teks dimulai...";
    });
  });
  