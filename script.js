const projects = [
  {title:"REVIRAL | SS26",short:"REVIRAL",year:"SS26",category:"BERSHKA",description:"Collaborative project with Bershka exploring emerging trends through digital fashion design and artificial intelligence, translating research and creative direction into a fully digital collection and campaign.",image:""},
  {title:"EFÍMERO",short:"EFÍMERO",year:"",category:"DIGITAL FASHION",description:"Collection articulated in the form of an author spot, combining elements of fantasy and product.",image:""},
  {title:"RECATO | SS25",short:"RECATO",year:"SS25",category:"INDEPENDENT BRAND",description:"This brand was born from the intention of giving voice to my creative concerns. My goal is to transform a personal project into a tangible, coherent, and manageable proposition, maintaining its conceptual and emotional weight, but adapting it to a language more accessible to the public. For now, it functions as a hobby project, but it remains a fundamental space where we explore ideas, experiment, and shape our shared vision.",image:""},
  {title:"BSK ACCESSORIES",short:"BSK ACCESSORIES",year:"SS26",category:"BERSHKA",description:"Swag SS26 capsule collection of accessories for Bershka, developed in Blender.",image:""},
  {title:"EMERGE | 26",short:"EMERGE",year:"2026",category:"DIGITAL FASHION",description:"Organic growth, artistic emotion and generative processes applied to digital fashion design.",image:""},
  {title:"AVANCCINO",short:"AVANCCINO",year:"",category:"PERSONAL PROJECT",description:"Personal project inspired by the painters Picasso and Velázquez. Two very different painters in terms of era and style, but who share a great enigma.",image:"",id:"avanccino"},
  {title:"FAME | AW26/27",short:"FAME",year:"AW26/27",category:"FASHION COLLECTION",description:"A fashion collection exploring two emerging microtrends through looks across womenswear.",image:""},
  {title:"SWIMWEAR | 27",short:"SWIMWEAR",year:"SS27",category:"FASHION COLLECTION",description:"A swimwear collection exploring two summer destinations through contrasting aesthetics and contemporary beachwear.",image:""},
  {title:"OTHERS — EFÍMERO COLLECTION",short:"EFÍMERO COLLECTION",year:"",category:"CLO 3D",description:"Selected digital fashion collection developed in CLO 3D.",image:""},
  {title:"FLAKKO",short:"FLAKKO",year:"",category:"DIGITAL FASHION",description:"Selected project. Images and project information will be added.",image:""},
  {title:"BEAST",short:"BEAST",year:"",category:"DIGITAL FASHION",description:"Selected project. Images and project information will be added.",image:""},
  {title:"BLANCO",short:"BLANCO",year:"",category:"FASHION DESIGN",description:"Selected project. Images and project information will be added.",image:""},
  {title:"AKAKLAV",short:"AKAKLAV",year:"",category:"FASHION DESIGN",description:"Selected project. Images and project information will be added.",image:""},
  {title:"EMBODYING VISION",short:"EMBODYING VISION",year:"",category:"DIGITAL FASHION",description:"Selected project. Images and project information will be added.",image:""}
];
const grid=document.getElementById("projectGrid");
const dialog=document.getElementById("projectDialog");
const dialogContent=document.getElementById("dialogContent");
let activeProject=0;
function createCard(project,index){
  const card=document.createElement("button");
  card.type="button";card.className="project-card";
  card.setAttribute("aria-label","Open "+project.title);
  const media=document.createElement("span");media.className="project-media";
  if(project.image){
    const img=document.createElement("img");img.src=project.image;img.alt=project.title;media.appendChild(img);
  }else{
    const placeholder=document.createElement("span");placeholder.className="project-placeholder";
    placeholder.textContent="IMAGE / VIDEO TO BE ADDED";media.appendChild(placeholder);
  }
  const meta=document.createElement("span");meta.className="project-meta";
  const title=document.createElement("span");title.className="project-title";title.textContent=project.short;
  const year=document.createElement("span");year.className="project-year";year.textContent=project.year;
  meta.append(title,year);
  const desc=document.createElement("span");desc.className="project-description";desc.textContent=project.description;
  card.append(media,meta,desc);card.addEventListener("click",()=>openProject(index));return card;
}
projects.forEach((project,index)=>grid.appendChild(createCard(project,index)));
function openProject(index){activeProject=index;renderProject();dialog.showModal();document.body.style.overflow="hidden";}
function renderProject(){
  const project=projects[activeProject];
  document.getElementById("dialogCounter").textContent=String(activeProject+1).padStart(2,"0")+" / "+String(projects.length).padStart(2,"0");
  const gallery=project.image
    ? '<div class="gallery-slot"><img src="'+project.image+'" alt="'+project.title+'" style="width:100%;height:100%;object-fit:contain"></div>'
    : '<div class="gallery-slot">MAIN PROJECT IMAGE / VIDEO</div><div class="gallery-slot">PROJECT IMAGE</div><div class="gallery-slot">PROJECT IMAGE</div>';
  dialogContent.innerHTML='<p class="dialog-category">'+project.category+'</p><h2>'+project.title+'</h2><p class="dialog-description">'+project.description+'</p><div class="dialog-gallery">'+gallery+'</div>';
}
function closeDialog(){dialog.close();document.body.style.overflow="";}
document.getElementById("closeDialog").addEventListener("click",closeDialog);
dialog.addEventListener("click",event=>{if(event.target===dialog)closeDialog();});
document.getElementById("previousProject").addEventListener("click",()=>{activeProject=(activeProject-1+projects.length)%projects.length;renderProject();});
document.getElementById("nextProject").addEventListener("click",()=>{activeProject=(activeProject+1)%projects.length;renderProject();});
document.addEventListener("keydown",event=>{
  if(!dialog.open)return;
  if(event.key==="ArrowRight"){activeProject=(activeProject+1)%projects.length;renderProject();}
  if(event.key==="ArrowLeft"){activeProject=(activeProject-1+projects.length)%projects.length;renderProject();}
});
