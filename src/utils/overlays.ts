import { AnimationBuilder } from '../utils/animation';
let lastId: number = 10000;

export const prepareOverlay = el => {
  const overlayId = lastId++;
  el.overlayIndex = overlayId;
};

export const present = async (overlay, enterAnimationBuilder: AnimationBuilder) => {
  overlayAnimation(overlay.el, enterAnimationBuilder);
};

export const dismiss = async (overlay, leaveAnimationBuilder: AnimationBuilder) => {
  await overlayAnimation(overlay.el, leaveAnimationBuilder);
  overlay.el.remove();
};

const overlayAnimation = async (el: HTMLElement, animationBuilder: AnimationBuilder) => {
  el.classList.remove('overlay-hidden');
  const animation = animationBuilder(el);
  await animation.play();

  return true;
};
