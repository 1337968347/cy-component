import { Animation } from '../interface';
let lastId: number = 10000;

export const prepareOverlay = el => {
  const overlayId = lastId++;
  el.overlayIndex = overlayId;
};

export const present = async (overlay, enterAnimation: Animation) => {
  overlayAnimation(overlay.el, enterAnimation);
};

export const dismiss = async (overlay, leaveAnimation: Animation) => {
  await overlayAnimation(overlay.el, leaveAnimation);
  overlay.el.remove();
};

const overlayAnimation = async (el: HTMLElement, animation: Animation) => {
  el.classList.remove('overlay-hidden');
  await animation.play();

  return true;
};
