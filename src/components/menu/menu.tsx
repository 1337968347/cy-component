import { Component, Element, h, Method, Listen, Host } from '@stencil/core';
import { Gesture, GestureDetail, Animation } from '../../interface';
import { menuAnimationBuilder } from './animation';
import { createGesture } from '../../utils/gesture';
import { getTimeGivenProgression } from '../../utils/animation/cubic-bezier';
import { clamp } from '../../utils/helpers';

const ANIMATIONClASS = 'open-menu';

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
      blurOnStart: true,
      canStart: this.canStart.bind(this),
      onWillStart: this.onWillStart.bind(this),
      onStart: this.onStart.bind(this),
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
    });
    this.gesture.enable(true);
  }

  canStart(e: GestureDetail) {
    if (!this.isOpen && e.startX > 40) {
      return false;
    }
    return true;
  }

  onWillStart() {
    this.beforeAnimation();
    return this.loadAnimation();
  }

  beforeAnimation() {
    this.el.classList.add(ANIMATIONClASS);
  }

  onStart() {
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
          this.afterAnimation(playTo === 1);
        },
        { oneTimeCallback: true },
      )
      .progressEnd(playTo, step);
  }

  afterAnimation(isOpen: boolean) {
    this.isOpen = isOpen;
    if (!this.isOpen) {
      this.el.classList.remove(ANIMATIONClASS);
    }
  }

  getAnimationStep(isOpen: boolean, deletaX: number, isOnEnd = false) {
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

  @Listen('click', { capture: true })
  onBackDropClick() {
    this.close();
  }

  @Method()
  async open() {
    this._setOpen(true);
  }

  @Method()
  async close() {
    this._setOpen(false);
  }

  @Method()
  async toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private async _setOpen(shouldOpen: boolean) {
    this.beforeAnimation();
    await this.loadAnimation();
    await this.startAnimation(shouldOpen);
    this.afterAnimation(shouldOpen);
  }

  private async startAnimation(shouldOpen: boolean): Promise<void> {
    const isReversed = !shouldOpen;

    const ani = (this.animation as Animation)!.direction(isReversed ? 'reverse' : 'normal').onFinish(() => {
      if (ani.getDirection() === 'reverse') {
        ani.direction('normal');
      }
    });

    await ani.play();
  }

  private async loadAnimation(): Promise<void> {
    const width = this.el.shadowRoot.querySelector('.menu-container').clientWidth;
    if (width === this.canMoveX && this.animation !== undefined) {
      return;
    }
    this.canMoveX = width;
    if (this.animation) {
      this.animation.destroy();
      this.animation = null;
    }
    this.animation = await menuAnimationBuilder(this.el);
    this.animation.fill('both');
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
