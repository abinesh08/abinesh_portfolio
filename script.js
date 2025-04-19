// Show or hide the back-to-top button on scroll
window.onscroll = function () {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Function called on button click
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update date and time every second
function updateDateTime() {
  const datetimeDisplay = document.querySelector(".datetime");
  const footerYear = document.querySelector(".footer-year");
  const now = new Date();

  if (datetimeDisplay) {
    datetimeDisplay.textContent = now.toLocaleString(); // eg: 4/19/2025, 10:20:30 AM
  }

  if (footerYear) {
    // Optional: If you want the year to always match current year
    footerYear.innerHTML = `© ${now.getFullYear()} Abinesh R | Built with ❤️`;
  }
}

// Run once at page load
updateDateTime();

// Then update every second automatically
setInterval(updateDateTime, 1000);
