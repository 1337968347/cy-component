import { AnimationBuilder } from '../../interface';
import { createAnimation } from '../../utils/animation';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .keyframes([
      { offset: 0, opacity: '0', transform: 'translateY(10%)' },
      { offset: 1, opacity: '1', transform: 'translateY(0)' },
    ])
    .easing('cubic-bezier(.42,0,1,1)')
    .duration(150)
    .addElement(baseEl);
};

export const leaveAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .keyframes([
      { offset: 0, opacity: '1', transform: 'translateY(0%)' },
      { offset: 1, opacity: '0', transform: 'translateY(10%)' },
    ])
    .easing('cubic-bezier(0,0,.58,1)')
    .duration(150)
    .addElement(baseEl);
};
