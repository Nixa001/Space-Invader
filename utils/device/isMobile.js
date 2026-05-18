export const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
