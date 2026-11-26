const video = document.getElementById("heroVideo");

async function playHeroVideo() {
  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  try {
    await video.play();
  } catch (error) {
    console.log("Autoplay bloqueado:", error);
  }
}

window.addEventListener("load", playHeroVideo);
window.addEventListener("pageshow", playHeroVideo);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && video.paused) {
    playHeroVideo();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
