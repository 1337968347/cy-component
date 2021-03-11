import { AnimationBuilder } from '../../interface';
import { createAnimation } from '../../utils/animation';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .keyframes([
      { offset: 0, opacity: '0.1', transform: 'translateY(20%)' },
      { offset: 1, opacity: '1', transform: 'translateY(0)' },
    ])
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(400)
    .addElement(baseEl);
};

export const leaveAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .keyframes([
      { offset: 0, opacity: '1', transform: 'translateY(0%)' },
      { offset: 1, opacity: '0.1', transform: 'translateY(20%)' },
    ])
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(450)
    .addElement(baseEl);
};
