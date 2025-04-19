document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
  const now = new Date();
  const datetime = now.toLocaleString();
  document.getElementById("datetime").textContent = `Last updated: ${datetime}`;
}
updateDateTime();

const backToTopButton = document.getElementById("backToTop");


// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// DateTime Logic
function updateDateTime() {
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  document.getElementById("datetime").textContent = dateTimeString;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

