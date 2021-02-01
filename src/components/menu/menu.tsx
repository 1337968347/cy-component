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

  componentDidLoad() {
    this.gesture = createGesture({
      el: document,
      direction: 'x',
      threshold: 10,
      passive: true,
      canStart: this.canStart.bind(this),
      onStart: this.onStart.bind(this),
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
    });
    this.gesture.enable();
  }

  canStart(e: GestureDetail) {
    if (e.startX > 20) {
      return false;
    }
    return true;
  }

  onStart(e: GestureDetail) {
    if (this.isOpen() !== e.deltaX < 0) {
      return false;
    }
    this.animation = enterAnimationBuilder(this.el);
    this.toggleMenuVisiable(true);
    this.canMoveX = this.el.shadowRoot.querySelector('.menu-container').clientWidth;
    this.animation.progressStart(true, 0);
  }

  onMove(e: GestureDetail) {
    const step = clamp(0, e.deltaX / this.canMoveX, 1);
    console.log(step);
    this.animation.progressStep(step);
  }

  async onEnd(e: GestureDetail) {
    const moveX = e.currentX - e.startX;
    const step = clamp(0, e.deltaX / this.canMoveX, 1);
    const newStep = getTimeGivenProgression([0, 0], [0, 0], [0.2, 1], [1, 1], step)[0];
    let playTo: 0 | 1 = 1;
    if (moveX < this.canMoveX / 2) {
      playTo = 0;
    }
    this.animation
      .onFinish(
        () => {
          this.toggleMenuVisiable(playTo === 1);
        },
        { oneTimeCallback: true },
      )
      .progressEnd(playTo, newStep);
  }

  onBackDropClick() {
    this.close();
  }

  @Method()
  async open() {
    this.toggleMenuVisiable(true);
    this.animation = enterAnimationBuilder(this.el);
    this.animation.play();
  }

  @Method()
  async close() {
    this.animation = leaveAnimationBuilder(this.el);
    await this.animation.play();
    this.toggleMenuVisiable(false);
  }

  isOpen() {
    return this.el.classList.contains('open-menu');
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
