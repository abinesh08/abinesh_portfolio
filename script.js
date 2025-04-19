document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
  const now = new Date();
  const datetime = now.toLocaleString();
  document.getElementById("datetime").textContent = `Last updated: ${datetime}`;
}
updateDateTime();

const backToTopButton = document.getElementById("backToTop");


window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
