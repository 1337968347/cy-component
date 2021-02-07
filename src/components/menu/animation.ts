import { createAnimation } from '../../utils/animation';
import { AnimationBuilder } from '../../interface';

export const menuAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('cy-backdrop'))
    .fromTo('opacity', '0', 'var(--opacity)');

  const menuEnterAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('.menu-container'))
    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)');

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.4,0.0,0.6,1)')
    .duration(300)
    .addAnimation([backdropAnimation, menuEnterAnimation]);
};
