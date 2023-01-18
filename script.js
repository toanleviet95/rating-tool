import { signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { app, auth } from './firebase-init.js';

const stars = document.querySelectorAll(".star");
const emoji = document.querySelector(".emoji");
const rating = document.querySelector(".rating");
const defaultRatingIndex = 0;
let currentRatingIndex = 0;

const ratings = [
  { emoji: "😐", status: "Rating" },
  { emoji: "😡", status: "Bad" },
  { emoji: "😔", status: "Average" },
  { emoji: "😊", status: "Good" },
  { emoji: "😃", status: "Very Good" },
  { emoji: "🤩", status: "Excellent" }
];

function setRating(index) {
  stars.forEach((star) => {
    star.classList.remove("selected");
  });

  if (index > 0 && index <= stars.length) {
    document.querySelector(`[data-rate="${index}"]`).classList.add("selected");
  }
  emoji.innerHTML = ratings[index].emoji;
  rating.innerHTML = ratings[index].status;
}

function checkRating(star) {
  if (parseInt(star.getAttribute("data-rate")) === currentRatingIndex) {
    return true;
  } else {
    return false;
  }
}

function resetRating() {
  currentRatingIndex = defaultRatingIndex;
  setRating(defaultRatingIndex);
}

function renderStars() {
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      if (checkRating(star)) {
        resetRating();
        return;
      }
      const index = parseInt(star.getAttribute("data-rate"));
      currentRatingIndex = index;
      setRating(index);
    });
  
    star.addEventListener("mouseover", () => {
      const index = parseInt(star.getAttribute("data-rate"));
      setRating(index);
    });
  
    star.addEventListener("mouseout", () => {
      setRating(currentRatingIndex);
    });
  });
}

function renderSlide() {
  $(".slider").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });
}

function initFeedBackEvent() {
  $(".feedback-question").click(function() {
    $(".feedback-input").toggle();
  });
}

function initSaveEvent() {
  $(".save-btn").click(function(e) {
    e.preventDefault();
    console.log({ currentRatingIndex, "input": $('.feedback-textarea').val() });
  });
}

function initUserInfo() {
  if (localStorage.getItem('email')) {
    $('#email').html(localStorage.getItem('email'));
  }
}

function initSignOut() {
  $("#sign-out").click(function(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    signOut(auth);
    window.location.href = '/sign-in.html';
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlide();
  renderStars();
  setRating(defaultRatingIndex);
  initFeedBackEvent();
  initSaveEvent();
  initUserInfo();
  initSignOut();
});
