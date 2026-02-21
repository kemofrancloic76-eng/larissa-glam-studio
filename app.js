// 1) Mets ton numéro WhatsApp ici (format: 2376XXXXXXXX)
const WHATSAPP_NUMBER = "+237653186720";

// 2) Mets ton Instagram ici (ex: https://instagram.com/toncompte)
const INSTAGRAM_URL = "https://www.instagram.com/larissa_glam_studio?igsh=dzl1OGhlaG8xODc4";

function waLink(message){
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// Brancher tous les boutons WhatsApp
const buttons = [
  ["waTop", "Bonjour, je veux réserver un rendez-vous chez Larissa Glam Studio."],
  ["waHero", "Bonjour, je souhaite réserver (microblading / make-up / coiffure)."],
  ["waMicro", "Bonjour, je souhaite réserver un rendez-vous MICROBLADING. Merci de me proposer un créneau."],
  ["waMakeup", "Bonjour, je souhaite réserver un rendez-vous MAKE-UP. Merci de me proposer un créneau."],
  ["waHair", "Bonjour, je souhaite réserver un rendez-vous COIFFURE FEMME. Merci de me proposer un créneau."],
  ["waAbout", "Bonjour, j’aimerais des infos et réserver un rendez-vous."],
  ["waContact", "Bonjour, je souhaite réserver un rendez-vous. Voici ma disponibilité : ..."]
];

buttons.forEach(([id, msg]) => {
  const el = document.getElementById(id);
  if(el) el.href = waLink(msg);
});

// Instagram
const ig = document.getElementById("igLink");
if(ig) ig.href = INSTAGRAM_URL;

// Année automatique
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn?.addEventListener("click", () => {
  menu.classList.toggle("open");
});
// ---- Reveal animation (scroll) ----
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add("in-view");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ---- Quick booking WhatsApp ----
const form = document.getElementById("quickBookForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const service = document.getElementById("qbService")?.value || "";
  const date = document.getElementById("qbDate")?.value || "";
  const time = document.getElementById("qbTime")?.value || "";
  const details = document.getElementById("qbDetails")?.value || "";

  const when = [date, time].filter(Boolean).join(" à ");
  const msg =
    `Bonjour Larissa Glam Studio, je souhaite réserver.\n` +
    `Prestation: ${service}\n` +
    (when ? `Date/Heure: ${when}\n` : `Date/Heure: (à confirmer)\n`) +
    (details ? `Détails: ${details}\n` : "") +
    `Merci de me proposer un créneau disponible.`;

  window.location.href = waLink(msg);
});

// ---- Floating WhatsApp button ----
(function addFloatingWA(){
  const a = document.createElement("a");
  a.className = "waFloat";
  a.href = waLink("Bonjour, je souhaite prendre rendez-vous chez Larissa Glam Studio. Prestation: ... Disponibilité: ...");
  a.innerHTML = `<span class="dot"></span><strong>WhatsApp</strong>`;
  document.body.appendChild(a);
})();
