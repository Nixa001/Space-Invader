import { gameState } from "../stats/variables.js";

export const runtime = () => {
  let sec = document.querySelector(".class_Times");
  0 + sec.innerHTML++;
  gameState.time = sec.innerHTML
  return sec
};
