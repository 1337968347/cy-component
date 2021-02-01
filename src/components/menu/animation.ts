import { createAnimation } from '../../utils/animation';
import { AnimationBuilder } from '../../interface';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('cy-backdrop'))
    .fromTo('opacity', '0', 'var(--opacity)');

  const menuEnterAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('.menu-container'))
    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)');

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.0,0.0,0.2,1)')
    .duration(300)
    .addAnimation([backdropAnimation, menuEnterAnimation]);
};

export const leaveAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('cy-backdrop'))
    .fromTo('opacity', 'var(--opacity)', '0');

  const menuEnterAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('.menu-container'))
    .fromTo('transform', 'translateX(0)', 'translateX(-100%)');

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.4, 0, 0.6, 1)')
    .duration(300)
    .addAnimation([backdropAnimation, menuEnterAnimation]);
};
