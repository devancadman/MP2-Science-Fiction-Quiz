document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const homeButton = document.getElementById("home-button");
    function goBackToHome() {
      window.location.href = "index.html";
    }
  
    homeButton.addEventListener("click", goBackToHome);
  
    // Update the audio source based on the selected category and set custom page ID
    function updateAudioSource(category) {
      let audioFile = "";
      let customPageId = "";
  
      switch (category) {
        case "Game of Thrones":
          audioFile = "./assets/audio/game-of-thrones.mp3";
          customPageId = "game-of-thrones-page";
          break;
        case "Scorpion":
          audioFile = "./assets/audio/scorpion.mp3";
          customPageId = "scorpion-page";
          break;
        case "Star Trek":
          audioFile = "./assets/audio/star-trek.mp3";
          customPageId = "star-trek-page";
          break;
        case "Supernatural":
          audioFile = "./assets/audio/supernatural.mp3";
          customPageId = "supernatural-page";
          break;
        case "Doctor Who":
          audioFile = "./assets/audio/doctor-who.mp3";
          customPageId = "doctor-who-page";
          break;
        case "The Big Bang Theory":
          audioFile = "./assets/audio/big-bang-theory.mp3";
          customPageId = "big-bang-theory-page";
          break;
        case "Stranger Things":
          audioFile = "./assets/audio/stranger-things.mp3";
          customPageId = "stranger-things-page";
          break;
        case "Star Wars":
          audioFile = "./assets/audio/star-wars.mp3";
          customPageId = "star-wars-page";
          break;
        case "Stargate":
          audioFile = "./assets/audio/stargate.mp3";
          customPageId = "stargate-page";
          break;
        case "Harry Potter":
          audioFile = "./assets/audio/harry-potter.mp3";
          customPageId = "harry-potter-page";
          break;
        default:
          audioFile = "";
          customPageId = "";
          break;
      }
  
      const audioSource = document.getElementById("track");
      audioSource.src = audioFile;
  
      document.body.id = customPageId;
    }
    
});