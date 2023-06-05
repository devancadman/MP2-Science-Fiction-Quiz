// Get the category and level from the query parameters
var params = new URLSearchParams(window.location.search);
var category = params.get("category");

// Add Category name to the page title and Page Header
document.title = `Science Fiction Quiz - ${category}`;
document.getElementById("page-heading").innerHTML = `<a class="logo" href="./index.html" aria-label="logo home page link">Science Fiction Quiz:<br>${category}</a></a>`;

// Generate the level menu based on the available levels for the selected category
var levelMenu = document.getElementById("level-menu");
var levels = ["easy", "medium", "hard"]; // Array containing different levels (you can modify this based on your available levels)

// Iterate over each level in the levels array
levels.forEach(function(level) {
  // Create a link element for the level
  var levelLink = document.createElement("a");

  // Set the class name of the link based on the level
  levelLink.className = level === "easy" ? "blue-btn" : level === "medium" ? "correct" : "wrong";

  // Set the href attribute of the link to the corresponding quiz page URL
  levelLink.href = "quiz.html?category=" + encodeURIComponent(category) + "&level=" + level;

  // Set the text content of the link to the capitalized level name
  levelLink.textContent = level.charAt(0).toUpperCase() + level.slice(1);

  // Append the level link to the levelMenu element
  levelMenu.appendChild(levelLink);

  // Append a text node (space) after the level link for spacing
  levelMenu.appendChild(document.createTextNode(" "));
});

window.addEventListener("beforeunload", function() {
  const audioElement = getAudioElementByCategory(category);

  if (audioElement) {
    // Store the current time of the audio in the localStorage
    localStorage.setItem("musicTime", audioElement.currentTime);
  }
});
