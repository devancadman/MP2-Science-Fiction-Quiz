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

  // Add an ID to the home page and include an audio element
  if (category === null) {
    document.body.id = "home-page";

    // Create the audio element
    var homeAudio = document.createElement("audio");
    homeAudio.id = "home-audio";
    homeAudio.src = "./assets/audio/artificial-intelligence-ai.mp3";
    homeAudio.autoplay = true;
    homeAudio.loop = true;
    homeAudio.volume = 0.1; // Adjust the volume level (0.0 to 1.0)

    // Append the audio element to the body
    document.body.appendChild(homeAudio);
  } else {
    // Update the audio source based on the selected category and set custom page ID
    updateAudioSource(category);
  }

  /* Add Sound on Button Hover
  Also Add a Play / Mute Button for sound */
  var buttons = document.querySelectorAll(".outline-btn, .wrong, .correct, .next-btn, .blue-btn, .option, .btn-spin, .sound-btn, .mute-button, close-btn, .logo, .contact-btn");
  var hoverSound = new Audio('./assets/audio/button-hover-future.wav');

  var isSoundMuted = false;

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', function () {
      if (!isSoundMuted) {
        hoverSound.volume = 0.2; // Adjust the volume level (0.0 to 1.0)
        hoverSound.play();
      }
    });
  }

  // Mute Button add/remove class muted
  document.getElementById("mute-button").addEventListener("click", function () {
    if (isSoundMuted) {
      isSoundMuted = false;
      this.classList.remove("muted");
    } else {
      isSoundMuted = true;
      this.classList.add("muted");
    }
  });

  var track = document.getElementById('track');
  var controlBtn = document.getElementById('play-pause');
  var muteIcon = document.getElementById("muteIcon");
  var isPlaying = false;
  
  function playPause() {
    if (!isPlaying) {
      track.play()
        .then(function () {
          controlBtn.classList.remove("play");
          controlBtn.classList.add("pause");
          muteIcon.src = "./assets/images/pause.png";
          muteIcon.alt = "unmuted";
          isPlaying = true;
        })
        .catch(function (error) {
          console.log("Failed to play the audio: " + error.message);
        });
    } else {
      track.pause();
      controlBtn.classList.remove("pause");
      controlBtn.classList.add("play");
      muteIcon.src = "./assets/images/play.png";
      muteIcon.alt = "muted";
      isPlaying = false;
    }
  }
  
  // Call playPause() to set initial state
  playPause();
  
  controlBtn.addEventListener("click", playPause);
  track.addEventListener("ended", function () {
    controlBtn.className = "play";
    muteIcon.src = "./assets/images/play.png";
    muteIcon.alt = "muted";
    isPlaying = false;
  });

  /// Play/Pause functionality for home audio
  if (document.body.id === "home-page") {
    var playPauseBtn = document.getElementById("play-pause");

    playPauseBtn.addEventListener("click", function () {
      if (homeAudio.paused) {
        homeAudio.play();
        playPauseBtn.classList.remove("play");
        playPauseBtn.classList.add("pause");
        muteIcon.src = "./assets/images/pause.png";
        muteIcon.alt = "unmuted";
      } else {
        homeAudio.pause();
        playPauseBtn.classList.remove("pause");
        playPauseBtn.classList.add("play");
        muteIcon.src = "./assets/images/play.png";
        muteIcon.alt = "muted";
      }
    });
  }

    /* Dialog Popup */
    const openButtons = document.querySelectorAll("[data-open-modal]");
    const modals = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-close-modal]");

    openButtons.forEach((openButton, index) => {
    const modal = modals[index];
    const closeButton = closeButtons[index];
    
    openButton.addEventListener("click", () => {
        modal.showModal();
    });

    modal.addEventListener("click", e => {
        const modalDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < modalDimensions.left ||
            e.clientX > modalDimensions.right ||
            e.clientY < modalDimensions.top ||
            e.clientY > modalDimensions.bottom
        ) {
            modal.close();
        }
    });

    closeButton.addEventListener("click", () => {
        modal.close();
    });
    });
});

/* Click to Play Screen overlay */
window.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('overlay');
  var audioElements = document.querySelectorAll('audio');
  var body = document.body;
  var hoverSound = new Audio('./assets/audio/button-hover-future.wav');

  var hasVisitedBefore = localStorage.getItem('hasVisited'); // Check if the user has visited before

  if (hasVisitedBefore === null) { // Show the overlay only for first-time visitors
    overlay.style.display = 'flex';
    body.style.overflow = 'hidden';
    hoverSound.muted = true; // Mute the hover sound initially
    localStorage.setItem('hasVisited', true); // Store the visitor's status
  }

  overlay.addEventListener('click', function() {
    overlay.style.display = 'none';
    audioElements.forEach(function(audio) { // Unmute all audio elements
      audio.muted = false;
    });
    hoverSound.muted = false; // Unmute the hover sound
    body.style.overflow = 'auto';
  });

  audioElements.forEach(function(audio) {
    audio.muted = true; // Mute all audio elements initially
  });

  hoverSound.muted = true; // Mute the hover sound initially
});

// 404 ERROR PAGE
// Check if the current page has the class .error404
if (document.body.classList.contains('error404')) {
  var TxtType = function(el, toRotate, period) { // Constructor function for TxtType
    this.toRotate = toRotate; // Array of strings to rotate
    this.el = el; // Element to apply the typing animation
    this.loopNum = 0; // Current index of the toRotate array
    this.period = parseInt(period, 10) || 2000; // Time period for each rotation
    this.txt = ''; // Current text being typed
    this.tick(); // Start the animation
    this.isDeleting = false; // Flag to indicate if text is being deleted
  };

  // Prototype method for TxtType that performs the animation
  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length; // Get the current index of toRotate array
    var fullTxt = this.toRotate[i]; // Get the full text for the current rotation

    // Determine if text should be deleted or typed
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1); // Remove the last character
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1); // Add the next character
    }

    this.el.textContent = this.txt; // Set the text content of the element

    var that = this;
    var delta = 200 - Math.random() * 100; // Time delay between each character

    // Adjust the delay if text is being deleted
    if (this.isDeleting) {
      delta /= 2;
    }

    // Determine the state of the animation and set the appropriate delay
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period; // Text is fully typed, set delay before deletion
      this.isDeleting = true; // Set the deleting flag
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false; // Text is fully deleted, set the next rotation
      this.loopNum++; // Increment the loopNum for the next rotation
      delta = 500; // Delay before typing the next rotation
    }

    // Call the tick function recursively after the delay
    setTimeout(function() {
      that.tick();
    }, delta);
  };

// Run the code when the window has finished loading
window.onload = function() {
  var elements = document.getElementsByClassName('typewrite'); // Get all elements with the class 'typewrite'
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type'); // Get the 'data-type' attribute value
    var period = elements[i].getAttribute('data-period'); // Get the 'data-period' attribute value
    if (toRotate) {
      createTxtType(elements[i], JSON.parse(toRotate), period); // Call a helper function instead of using 'new'
    }
  }
};

// Helper function to create TxtType instance
function createTxtType(element, toRotate, period) {
  var txtType = new TxtType(element, toRotate, period); // Create a new TxtType instance
  txtType.start(); // Call the start method explicitly to initiate the typing animation
}

}