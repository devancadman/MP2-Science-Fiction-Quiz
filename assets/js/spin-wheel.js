/**
 * Categories will space out evenly on the Category wheel based on the amount of items available.
 * @param text [string] name of the category
 * @param color [string] background color of the category
 * @param url [string] URL of the category item
**/
const categories = [
    {
      text: "Game of Thrones",
      color: "hsl(197, 76%, 8%)",
      url: "level.html?category=Game%20of%20Thrones"
    },
    { 
      text: "Scorpion",
      color: "hsl(191, 67%, 57%)",
      url: "level.html?category=Scorpion"
    },
    { 
      text: "Star Trek",
      color: "hsl(197, 76%, 8%)",
      url: "level.html?category=Star%20Trek"
    },
    {
      text: "Supernatural",
      color: "hsl(191, 67%, 57%)",
      url: "level.html?category=Supernatural"
    },
    {
      text: "Doctor Who",
      color: "hsl(197, 76%, 8%)",
      url: "level.html?category=Doctor%20Who"
    },
    {
      text: "The Big Bang Theory",
      color: "hsl(191, 67%, 57%)",
      url: "level.html?category=The%20Big%20Bang%20Theory"
    },
    {
      text: "Stranger Things",
      color: "hsl(197, 76%, 8%)",
      url: "level.html?category=Stranger%20Things"
    },
    {
      text: "Star Wars",
      color: "hsl(191, 67%, 57%)",
      url: "level.html?category=Star%20Wars"
    },
    {
      text: "Stargate",
      color: "hsl(197, 76%, 8%)",
      url: "level.html?category=Stargate"
    },
    {
      text: "Harry Potter",
      color: "hsl(191, 67%, 57%)",
      url: "level.html?category=Harry%20Potter"
    }
  ];
  
// Getting references to various elements
const wheel = document.querySelector(".category-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const spinSound = document.getElementById("spinSound");
const categoriesSlice = 360 / categories.length;
const categoryOffset = Math.floor(180 / categories.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);

// Variables for wheel spin logic
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let categoryNodes;

// Create the category nodes on the wheel
const createCategoryNodes = () => {
    categories.forEach(({ text, color, url }, i) => {
        const rotation = ((categoriesSlice * i) * -1) - categoryOffset;

        spinner.insertAdjacentHTML(
        "beforeend",
        `<li class="category" style="--rotate: ${rotation}deg;" data-url="${url}">
            <span class="text">${text}</span>
        </li>`
        );
    });
};

// Create the conic gradient for the spinner background
const createConicGradient = () => {
    spinner.setAttribute(
        "style",
        `background: conic-gradient(from -90deg, ${categories.map(({ color }, i) => `${color} 0 ${(100 / categories.length) * (categories.length - i)}%`).reverse()});`
    );
};

// Set up the wheel
const setupWheel = () => {
    createConicGradient();
    createCategoryNodes();
    categoryNodes = wheel.querySelectorAll(".category");
};

// Select the category after spinning the wheel
const selectCategory = () => {
    const selected = Math.floor(rotation / categoriesSlice);
    categoryNodes[selected].classList.add(selectedClass);
    const url = categoryNodes[selected].dataset.url;
    if (url) {
        window.location.href = url;
    }
};

// Generate a random spin inertia value between min and max
const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Run the ticker animation while the wheel is spinning
const runTickerAnimation = () => {
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);

    if (rad < 0) rad += (2 * Math.PI);

    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / categoriesSlice);

    if (currentSlice !== slice) {
        ticker.style.animation = "none";
        setTimeout(() => ticker.style.animation = null, 10);
        currentSlice = slice;
    }

    tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// Event listener for the spin button click
trigger.addEventListener("click", () => {
    trigger.disabled = true;
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    categoryNodes.forEach((category) => category.classList.remove(selectedClass));
    wheel.classList.add(spinClass);
    spinner.style.setProperty("--rotate", rotation);
    ticker.style.animation = "none";

    // Play the spin sound
    spinSound.currentTime = 0;
    spinSound.volume = 0.5; // Adjust the volume level (0.0 to 1.0)
    spinSound.play();

    runTickerAnimation();
});

// Event listener for the transition end of the spinner
spinner.addEventListener("transitionend", () => {
    cancelAnimationFrame(tickerAnim);
    trigger.disabled = false;
    trigger.focus();
    rotation %= 360;
    selectCategory();
    wheel.classList.remove(spinClass);
    spinner.style.setProperty("--rotate", rotation);

    // Stop the spin sound
    spinSound.pause();
    spinSound.currentTime = 0;
});

// Event listener for the spin sound button click
var isSoundMuted = false;

document.querySelector(".btn-spin").addEventListener("click", function() {
    if (!isSoundMuted) {
        spinSound.play();
        setTimeout(function() {
        spinSound.pause();
        spinSound.currentTime = 0;
        }, spinDuration);
    }
});

// Event listener for the mute button click
document.getElementById("mute-button").addEventListener("click", function() {
    if (isSoundMuted) {
        spinSound.muted = false;
        this.classList.remove("muted");
    } else {
        spinSound.muted = true;
        this.classList.add("muted");
    }
});

// Event listener for the mute button click to mute/unmute spin sounds
document.getElementById("mute-button").addEventListener("click", function() {
    if (isSoundMuted) {
        isSoundMuted = false;
        spinSound.muted = false;
        this.classList.remove("muted");
    } else {
        isSoundMuted = true;
        spinSound.muted = true;
        this.classList.add("muted");
    }
});

setupWheel();