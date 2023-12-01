export const runtime = (sec, m) => {
  sec = document.querySelector(".class_Times");
  m = document.querySelector(".min");
  if(sec.innerHTML == 59) {
    0+m.innerHTML++;
    sec.innerHTML = 0;
  }
  0+sec.innerHTML++;
};
