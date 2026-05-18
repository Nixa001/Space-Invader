import { gameState } from "../stats/variables.js";

export const runtime = () => {
  const sec = document.querySelector(".class_Times");
  const m = document.querySelector(".min");
  if (!sec || !m) return;
  let seconds = parseInt(sec.textContent) + 1;
  if (seconds >= 60) {
    m.textContent = String(parseInt(m.textContent) + 1).padStart(2, "0");
    seconds = 0;
  }
  sec.textContent = String(seconds).padStart(2, "0");
  gameState.time = seconds;
};
