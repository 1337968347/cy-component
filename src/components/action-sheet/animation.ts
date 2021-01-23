import { AnimationBuilder } from '../../interface';
import { createAnimation } from '../../utils/animation';

export const enterAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation().addElement(baseEl.querySelector('cy-backdrop')).fromTo('opacity', '0', 'var(--opacity)');
  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector('.action-sheet-container'))
    .fromTo('transform', 'translateY(100%)', 'translateY(0)');

  return baseAnimation
    .addAnimation([backdropAnimation, wrapperAnimation])
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(400)
    .addElement(baseEl);
};

export const leaveAnimationBuilder: AnimationBuilder = (baseEl: HTMLElement, startTranslateY: string = 'translateY(0)') => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation().addElement(baseEl.querySelector('cy-backdrop')).fromTo('opacity', 'var(--opacity)', '0');
  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelector('.action-sheet-container'))
    .fromTo('transform', startTranslateY, 'translateY(100%)');

  return baseAnimation
    .addAnimation([backdropAnimation, wrapperAnimation])
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(450)
    .addElement(baseEl);
};
