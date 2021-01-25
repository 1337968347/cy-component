import { Component, Element, Prop, h, Host, ComponentInterface, Method } from '@stencil/core';
import { ActionSheetButton, Animation } from '../../interface';
import { prepareOverlay } from '../../utils/overlays';
import { createGesture, Gesture, GestureDetail } from '../../utils/gesture';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';
@Component({
  tag: 'cy-action-sheet',
  styleUrl: 'action-sheet.scss',
  scoped: true,
})
export class ActionSheet implements ComponentInterface {
  private gesture?: Gesture;
  private enterAnimation: Animation;
  private leaveAnimation: Animation;
  @Element() el: HTMLElement;
  @Prop() overlayIndex: number = 0;
  @Prop() header: string = '';
  @Prop() cssClass: string = '';
  @Prop() buttons: ActionSheetButton[] = [];

  componentWillLoad() {
    prepareOverlay(this.el);
  }

  componentDidLoad() {
    this.enterAnimation = enterAnimationBuilder(this.el);
    this.leaveAnimation = leaveAnimationBuilder(this.el);
    this.gesture = createGesture({
      el: this.el.querySelector('.drag-container'),
      direction: 'y',
      passive: true,
      canStart: () => {
        return this.el.querySelector('.action-sheet-opers').scrollTop === 0;
      },
      onStart: this.onStart.bind(this),
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
    });
    this.gesture.enable();
  }

  onStart() {
    document.body.style.overscrollBehavior = 'none';
    this.leaveAnimation.progressStart(true, 0);
  }

  onMove(e: GestureDetail) {
    const step = Math.min(Math.max((e.currentY - e.startY) / this.el.clientHeight, 0), 1);
    this.leaveAnimation.progressStep(step);
  }

  async onEnd(e: GestureDetail) {
    document.body.style.removeProperty('overscroll-behavior');
    const moveY = e.currentY - e.startY;
    if (moveY > screen.height / 3) {
      await this.leaveAnimation.play();
      this.el.remove();
    } else {
      this.leaveAnimation.progressEnd(0, 0);
    }
  }

  @Method()
  async present() {
    this.enterAnimation.play();
  }

  @Method()
  async dismiss() {
    await this.leaveAnimation.play();
    this.el.remove();
  }

  async onClick(button: ActionSheetButton) {
    await button.handler();
    this.dismiss();
  }

  onBackDropClick() {
    this.dismiss();
  }

  render() {
    const actionSheets = this.buttons.filter(item => item.role !== 'cancel');
    const actionCancel = this.buttons.find(item => item.role === 'cancel');
    return (
      <Host
        class="action-sheet-overlay overlay-hidden"
        style={{
          zIndex: `${this.overlayIndex}`,
        }}
      >
        <cy-backdrop onBackDrop={this.onBackDropClick.bind(this)} />
        <div class={'action-sheet-container ' + this.cssClass}>
          <div class="drag-container">
            <div class="action-sheet-group">
              <div class="action-sheet-title">{this.header}</div>
              <div class="action-sheet-opers">
                {actionSheets.map(button => (
                  <div
                    class="action-sheet-oper activatable"
                    onClick={() => {
                      this.onClick(button);
                    }}
                  >
                    {button.text}
                  </div>
                ))}
              </div>
            </div>
            {actionCancel ? (
              <div class="action-sheet-group action-sheet-cancel">
                <div
                  class="action-sheet-oper activatable"
                  onClick={() => {
                    this.onClick(actionCancel);
                  }}
                >
                  {actionCancel.text}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
