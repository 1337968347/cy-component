import { createAnimation } from '../../utils/animation';
import { AnimationBuilder } from '../../interface';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation().addElement(baseEl.querySelector('cy-backdrop')).fromTo('opacity', '0', 'var(--opacity)');

  const menuEnterAnimation = createAnimation()
    .addElement(baseEl.querySelector('.menu-container'))
    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)');

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(450)
    .addAnimation([backdropAnimation, menuEnterAnimation]);
};
