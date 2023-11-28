export const debounce = (func, time) => {
    let timer = null;
    return function() {
       const args = arguments; // Capturer les arguments passés à la fonction
       clearTimeout(timer);
       timer = setTimeout(function(){
          func.apply(this, args); // Appeler func avec les arguments passés
       }, time);
    };
 };
 