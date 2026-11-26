const video = document.getElementById("heroVideo");

if (video) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const startVideo = async () => {
    try {
      await video.play();
    } catch (error) {
      console.log("Esperando reproducción:", error);
    }
  };

  video.addEventListener("loadeddata", startVideo);
  video.addEventListener("canplay", startVideo);

  window.addEventListener("load", startVideo);
  window.addEventListener("pageshow", startVideo);

  video.load();
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
