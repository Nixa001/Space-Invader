import { gameState } from "../stats/variables.js";
export const runtime = () => {
  let sec = document.querySelector(".class_Times");
  // recuperation de l'element et la condition d'incrementation de l'element
  let m = document.querySelector(".min");
  if(sec.innerHTML == 59) {
    0+m.innerHTML++;
    sec.innerHTML = 0;
  }
  0 + sec.innerHTML++;
  gameState.time = sec.innerHTML
  return sec
};
