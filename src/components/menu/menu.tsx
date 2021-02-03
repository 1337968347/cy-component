import { Component, Element, h, Method, Host } from '@stencil/core';
import { Gesture, GestureDetail, Animation } from '../../interface';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';
import { createGesture } from '../../utils/gesture';
import { getTimeGivenProgression } from '../../utils/animation/cubic-bezier';
import { clamp } from '../../utils/helpers';

@Component({
  tag: 'cy-menu',
  styleUrl: 'menu.scss',
  shadow: true,
})
export class CyMenu {
  @Element() el: HTMLElement;
  private gesture: Gesture;
  private canMoveX: number = 0;
  private animation: Animation;
  private isOpen: boolean = false;

  componentDidLoad() {
    this.gesture = createGesture({
      el: document,
      direction: 'x',
      threshold: 15,
      passive: true,
      canStart: this.canStart.bind(this),
      onStart: this.onStart.bind(this),
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
    });
    this.gesture.enable();
    this.animation = enterAnimationBuilder(this.el);
  }

  canStart(e: GestureDetail) {
    if (!this.isOpen && e.startX > 80) {
      return false;
    }
    return true;
  }

  onStart() {
    this.toggleMenuVisiable(true);
    this.canMoveX = this.el.shadowRoot.querySelector('.menu-container').clientWidth;
    this.animation.progressStart(true, this.isOpen ? 1 : 0);
  }

  onMove(e: GestureDetail) {
    const step = this.getAnimationStep(this.isOpen, e.deltaX);
    this.animation.progressStep(step);
  }

  async onEnd(e: GestureDetail) {
    const step = this.getAnimationStep(this.isOpen, e.deltaX, true);
    let playTo: 0 | 1 = 1;
    if (step < 0.5) {
      playTo = 0;
    }
    this.animation
      .onFinish(
        () => {
          this.isOpen = playTo === 1;
          this.toggleMenuVisiable(playTo === 1);
        },
        { oneTimeCallback: true },
      )
      .progressEnd(playTo, step);
  }

  getAnimationStep(isOpen: boolean, deletaX: number, isOnEnd = false) {
    // 不能 用 Math.abc
    const _deletaX = isOpen ? -1 * deletaX : deletaX;
    let step = clamp(0.0001, _deletaX / this.canMoveX, 0.9999);
    if (isOpen) {
      step = 1 - step;
    }
    if (!isOnEnd) {
      return step;
    }
    return getTimeGivenProgression([0, 0], [0.4, 0], [0.6, 1], [1, 1], step)[0];
  }

  onBackDropClick() {
    this.close();
  }

  @Method()
  async open() {
    this.toggleMenuVisiable(true);
    const animation = enterAnimationBuilder(this.el);
    await animation.play();
    animation.destroy();
    this.isOpen = true;
  }

  @Method()
  async close() {
    const animation = leaveAnimationBuilder(this.el);
    await animation.play();
    animation.destroy();
    this.isOpen = false;
    this.toggleMenuVisiable(false);
  }

  toggleMenuVisiable(isOpen: boolean) {
    if (isOpen) {
      this.el.classList.add('open-menu');
    } else {
      this.el.classList.remove('open-menu');
    }
  }

  render() {
    return (
      <Host>
        <div class="menu-container">
          <slot />
        </div>
        <cy-backdrop onBackDrop={this.onBackDropClick.bind(this)} />
      </Host>
    );
  }
}
