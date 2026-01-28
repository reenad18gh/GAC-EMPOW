const car = document.getElementById("car");
const cards = Array.from(document.querySelectorAll(".card"));

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function activeCard() {
  let best = null;
  let bestDist = Infinity;
  const target = window.innerHeight * 0.45;

  for (const c of cards) {
    const r = c.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const d = Math.abs(center - target);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best;
}

function updateCar() {
  const y = window.scrollY || 0;
  const w = window.innerWidth || 1200;

  const base = clamp(y / 6, 0, 280);
  const wave = Math.sin(y / 220) * 70;

  let x = base + wave;

  const a = activeCard();
  if (a) {
    const lane = a.getAttribute("data-lane");
    if (lane === "left") x = -x;
  }

  const maxX = Math.min(300, Math.floor(w * 0.28));
  x = clamp(x, -maxX, maxX);

  car.style.transform = `translateX(${x}px)`;
}

window.addEventListener("scroll", updateCar, { passive: true });
window.addEventListener("resize", updateCar);
updateCar();
