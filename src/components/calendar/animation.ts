import { AnimationBuilder } from '../../interface';
import { createAnimation } from '../../utils/animation';

export const nextPageAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation().addElement(baseEl).fromTo('transform', 'translateY(100%)', 'translateY(0)');

  return baseAnimation.addAnimation([wrapperAnimation]).easing('cubic-bezier(.36,.66,.04,1)').duration(400).addElement(baseEl);
};

export const prevPageAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation().addElement(baseEl).fromTo('transform', 'translateY(0)', 'translateY(100%)');

  return baseAnimation.addAnimation([wrapperAnimation]).easing('cubic-bezier(.36,.66,.04,1)').duration(450).addElement(baseEl);
};
