// src/utils/animations.js

// Placeholder for JS-driven animations (currently handled in CSS)
const animations = {
    pulse: {
      keyframes: [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.05)', offset: 0.5 },
        { transform: 'scale(1)', offset: 1 },
      ],
      options: { duration: 2000, iterations: Infinity, easing: 'ease-in-out' },
    },
    fadeIn: {
      keyframes: [
        { opacity: 0, transform: 'translateY(10px)', offset: 0 },
        { opacity: 1, transform: 'translateY(0)', offset: 1 },
      ],
      options: { duration: 1000, easing: 'ease-in' },
    },
  };
  
  // Function to apply animation (example usage with Web Animation API)
  function applyAnimation(element, animationName) {
    if (!element || !animations[animationName]) return;
    element.animate(animations[animationName].keyframes, animations[animationName].options);
  }
  
  export { applyAnimation };