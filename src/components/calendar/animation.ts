import { AnimationBuilder } from '../../interface';
import { createAnimation } from '../../utils/animation';

const ANIMATIONSHOWCLASS = 'animation-show';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .easing('ease-in')
    .duration(150)
    .addElement(baseEl.querySelector('.table'))
    .keyframes([
      { offset: 0, opacity: '0.01', transform: 'scale(1.1)' },
      { offset: 1, opacity: '1', transform: 'scale(1)' },
    ]);
};

export const backAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  return baseAnimation
    .easing('ease-in')
    .duration(150)
    .addElement(baseEl.querySelector('.table'))
    .keyframes([
      { offset: 0, opacity: '1', transform: 'scale(1)' },
      { offset: 1, opacity: '0.01', transform: 'scale(0.9)' },
    ]);
};

export const nextPageAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();

  const leaveAnimation = createAnimation()
    .addElement(baseEl.querySelector('.current'))
    .keyframes([
      { offset: 0, transform: 'translateX(0)' },
      { offset: 1, transform: 'translateX(-100%)' },
    ]);

  const enterAnimation = createAnimation()
    .addElement(baseEl.querySelector<HTMLElement>('.next'))
    .keyframes([
      { offset: 0, transform: 'translateX(100%)' },
      { offset: 1, transform: 'translateX(0)' },
    ])
    .beforeAddClass(ANIMATIONSHOWCLASS)
    .afterRemoveClass(ANIMATIONSHOWCLASS);

  return baseAnimation.easing('ease-in-out').duration(200).fill('none').addElement(baseEl).addAnimation([leaveAnimation, enterAnimation]);
};

export const prevPageAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();

  const leaveAnimation = createAnimation()
    .addElement(baseEl.querySelector('.current'))
    .keyframes([
      { offset: 0, transform: 'translateX(0)' },
      { offset: 1, transform: 'translateX(100%)' },
    ]);

  const enterAnimation = createAnimation()
    .addElement(baseEl.querySelector<HTMLElement>('.prev'))
    .keyframes([
      { offset: 0, transform: 'translateX(-100%)' },
      { offset: 1, transform: 'translateX(0%)' },
    ])
    .beforeAddClass(ANIMATIONSHOWCLASS)
    .afterRemoveClass(ANIMATIONSHOWCLASS);

  return baseAnimation.easing('ease-in-out').duration(200).fill('none').addElement(baseEl).addAnimation([leaveAnimation, enterAnimation]);
};
