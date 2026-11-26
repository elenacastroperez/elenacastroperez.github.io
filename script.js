const projects = [
  { title: "REVIRAL | SS26", short: "REVIRAL", category: "BERSHKA", description: "Collaborative project with Bershka exploring emerging trends through digital fashion design and artificial intelligence, translating research and creative direction into a fully digital collection and campaign." },
  { title: "EFÍMERO", short: "EFÍMERO", category: "DIGITAL FASHION", description: "Collection articulated in the form of an autor spot, combining elements of fantasy and product." },
  { title: "RECATO | SS25", short: "RECATO", category: "INDEPENDENT BRAND", description: "This brand was born from the intention of giving voice to my creative concerns. My goal is to transform a personal project into a tangible, coherent, and manageable proposition, maintaining its conceptual and emotional weight, but adapting it to a language more accessible to the public. For now, it functions as a hobby project, but it remains a fundamental space where we explore ideas, experiment, and shape our shared vision.", images: [] },
  { title: "BSK ACCESORIES", short: "BSK ACCESORIES", category: "BERSHKA", description: "SwagSS26 Capsule Collection of Accessories for Bershka in Blender." },
  { title: "EMERGE | 26", short: "EMERGE", category: "DIGITAL FASHION", description: "Organic growth, artistic emotion and generative processes applied to digital fashion design." },
  { title: "AVANCCINO", short: "AVANCCINO", category: "PERSONAL PROJECT", description: "Personal project inspired by the painters Picasso and Velázquez, two very different painters in terms of era and style, but who share a great enigma." },
  { title: "FAME | AW26", short: "FAME", category: "FASHION COLLECTION", description: "A fashion collection exploring two emerging microtrends through looks across womenswear." },
  { title: "SWIMWEAR | 27", short: "SWIMWEAR", category: "FASHION COLLECTION", description: "A swimwear collection exploring two summer destinations through contrasting aesthetics and contemporary beachwear." },
  { title: "EFÍMERO COLLECTION", short: "EFÍMERO COLLECTION", category: "CLO 3D", description: "Digital collection developed in CLO 3D." },
  { title: "FLAKKO", short: "FLAKKO", category: "DIGITAL FASHION", description: "Selected project. Images and project information will be added." },
  { title: "BEAST", short: "BEAST", category: "DIGITAL FASHION", description: "Selected project. Images and project information will be added." },
  { title: "EN BLANCO", short: "EN BLANCO", category: "FASHION DESIGN", description: "Selected project. Images and project information will be added." },
  { title: "AKAKLAV", short: "AKAKLAV", category: "FASHION DESIGN", description: "Selected project. Images and project information will be added." },
  { title: "EMBODYING VISION", short: "EMBODYING VISION", category: "DIGITAL FASHION", description: "Selected project. Images and project information will be added." }
];

const grid = document.getElementById("projectGrid");
const workPanel = document.getElementById("work");
const infoPanel = document.getElementById("information");
const detailPanel = document.getElementById("projectDetail");
let activeProject = 0;

function makeCard(project, index) {
  const card = document.createElement("button");
  card.className = "project-card";
  card.type = "button";
  card.setAttribute("aria-label", `Open ${project.title}`);
  card.innerHTML = `
    <span class="project-image">
      <span class="image-placeholder">
        <span class="placeholder-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="placeholder-label">IMAGE TO BE ADDED</span>
      </span>
    </span>
    <span class="project-title">${project.short}</span>`;
  card.addEventListener("click", () => openProject(index));
  return card;
}

projects.forEach((project, index) => grid.appendChild(makeCard(project, index)));

function closePanels() {
  workPanel.hidden = true;
  infoPanel.hidden = true;
  detailPanel.hidden = true;
  document.body.classList.remove("panel-open");
}
function openPanel(name) {
  closePanels();
  (name === "work" ? workPanel : infoPanel).hidden = false;
  document.body.classList.add("panel-open");
  window.scrollTo({ top: 0, behavior: "instant" });
}
function openProject(index) {
  activeProject = index;
  workPanel.hidden = true;
  detailPanel.hidden = false;
  document.body.classList.add("panel-open");
  renderProject();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function renderProject() {
  const project = projects[activeProject];
  document.getElementById("detailCounter").textContent =
    `${String(activeProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  document.getElementById("detailContent").innerHTML = `
    <p class="detail-category">${project.category}</p>
    <h1>${project.title}</h1>
    <p class="detail-description">${project.description}</p>
    <div class="detail-gallery">
      <div class="detail-placeholder detail-placeholder-large"><span>PROJECT IMAGE</span></div>
      <div class="detail-placeholder"><span>PROJECT IMAGE</span></div>
      <div class="detail-placeholder"><span>PROJECT IMAGE</span></div>
    </div>`;
}
document.querySelectorAll("[data-open]").forEach(button =>
  button.addEventListener("click", () => openPanel(button.dataset.open))
);
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closePanels));
document.querySelector("[data-close-detail]").addEventListener("click", () => openPanel("work"));
document.getElementById("previousProject").addEventListener("click", () => {
  activeProject = (activeProject - 1 + projects.length) % projects.length;
  renderProject();
});
document.getElementById("nextProject").addEventListener("click", () => {
  activeProject = (activeProject + 1) % projects.length;
  renderProject();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
  if (!detailPanel.hidden && event.key === "ArrowRight") document.getElementById("nextProject").click();
  if (!detailPanel.hidden && event.key === "ArrowLeft") document.getElementById("previousProject").click();
});

// If the optional hero video is not uploaded yet, the editorial background remains visible.
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  heroVideo.addEventListener("error", () => heroVideo.classList.add("video-unavailable"));
  const playAttempt = heroVideo.play();
  if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(() => {});
}
\n\n// RECATO gallery assets are generated from the ZIP archives stored in the repository.\nfetch("assets/recato/manifest.json").then(r => { if (!r.ok) throw new Error("RECATO manifest not ready"); return r.json(); }).then(files => {\n  const recato = projects.find(p => p.short === "RECATO");\n  if (recato) { recato.images = files.map(file => `assets/recato/${file}`); grid.replaceChildren(); projects.forEach((project, index) => grid.appendChild(makeCard(project, index))); }\n}).catch(() => {});\n\n// Trigger RECATO ZIP image optimization.\n