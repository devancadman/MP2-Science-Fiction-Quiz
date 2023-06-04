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