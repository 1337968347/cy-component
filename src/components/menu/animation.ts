import { createAnimation } from '../../utils/animation';
import { AnimationBuilder } from '../../interface';

const menuLeftAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
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

const menuRightAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('cy-backdrop'))
    .fromTo('opacity', '0', 'var(--opacity)');

  const menuEnterAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('.menu-container'))
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)');

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.4,0.0,0.6,1)')
    .duration(300)
    .addAnimation([backdropAnimation, menuEnterAnimation]);
};

export const menuAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement, side: 'left' | 'right' = 'left') => {
  return side === 'left' ? menuLeftAnimationBuilder(baseEl) : menuRightAnimationBuilder(baseEl);
};
