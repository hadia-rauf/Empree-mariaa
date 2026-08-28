function initMariaTheresaPage() {
  // ---------- petals: elegant, restrained, varied ----------
  const container = document.getElementById("petals");
  const roseGradients = [
    "radial-gradient(ellipse at 32% 22%, #d97e88, var(--rose-a) 68%)",
    "radial-gradient(ellipse at 32% 22%, #c65a63, #7a1f2b 68%)",
    "radial-gradient(ellipse at 32% 22%, #b23a48, #601521 68%)",
  ];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let activePetals = 0;
  const MAX_PETALS = 16;

  function createPetal() {
    if (!container || reduceMotion || activePetals >= MAX_PETALS) return;
    activePetals++;
    const p = document.createElement("div");
    p.className = "petal";
    const size = Math.random() * 10 + 14;
    p.style.width = size + "px";
    p.style.height = size * 1.3 + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background =
      roseGradients[Math.floor(Math.random() * roseGradients.length)];
    const fallDur = Math.random() * 8 + 14;
    const swayDur = Math.random() * 3 + 3;
    p.style.animationDuration = fallDur + "s, " + swayDur + "s";
    p.style.animationDelay = "0s, " + Math.random() * swayDur + "s";
    p.style.opacity = (Math.random() * 0.3 + 0.55).toFixed(2);
    if (Math.random() < 0.4) {
      p.style.filter = "blur(1.4px)";
    }
    container.appendChild(p);
    setTimeout(
      () => {
        p.remove();
        activePetals--;
      },
      fallDur * 1000 + 200,
    );
  }
  for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 400);
  setInterval(createPetal, 900);

  // ---------- seal break ----------
  const sealStage = document.getElementById("sealStage");
  const sealLayer = document.getElementById("sealLayer");
  const sealBtn = document.getElementById("sealBtn");

  function breakSeal() {
    if (sealStage) sealStage.classList.add("cracking");
    setTimeout(
      () => {
        if (sealLayer) sealLayer.classList.add("opened");
      },
      reduceMotion ? 0 : 380,
    );
    for (let i = 0; i < 24; i++) setTimeout(createPetal, i * 35);
  }
  if (sealBtn) sealBtn.addEventListener("click", breakSeal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sealLayer) sealLayer.classList.add("opened");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMariaTheresaPage);
} else {
  initMariaTheresaPage();
}
