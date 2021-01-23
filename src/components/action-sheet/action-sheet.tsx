import { Component, Element, Prop, h, Host, ComponentInterface, Method } from '@stencil/core';
import { ActionSheetButton } from '../../interface';
import { prepareOverlay, present, dismiss } from '../../utils/overlays';
import { createGesture, Gesture, GestureDetail } from '../../utils/gesture';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';

@Component({
  tag: 'cy-action-sheet',
  styleUrl: 'action-sheet.scss',
  scoped: true,
})
export class ActionSheet implements ComponentInterface {
  private gesture?: Gesture;
  @Element() el: HTMLElement;
  @Prop() overlayIndex: number = 0;
  @Prop() header: string = '';
  @Prop() cssClass: string = '';
  @Prop() buttons: ActionSheetButton[] = [];

  componentWillLoad() {
    prepareOverlay(this.el);
  }

  componentDidLoad() {
    this.gesture = createGesture({
      el: this.el.querySelector('.action-sheet-title'),
      direction: 'y',
      threshold: 3,
      passive: true,
      canStart: () => {
        this.el.querySelector('.action-sheet-opers').scrollTop === 0;
      },
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
    });
    this.gesture.enable();
  }

  onMove(e: GestureDetail) {
    console.log('move');
    const translateY = Math.max(e.currentY - e.startY, 0);
    const containerEl = this.el.querySelector('.drag-container') as HTMLElement;
    containerEl.style.transform = `translateY(${translateY}px)`;
  }

  onEnd(e: GestureDetail) {
    console.log('end');
    const containerEl = this.el.querySelector('.drag-container') as HTMLElement;
    containerEl.style.transform = `translateY(${0}px)`;
    const moveY = e.currentY - e.startY;
    if (moveY > 150) {
      dismiss(this, leaveAnimationBuilder(this.el, `translateY(${moveY}px)`));
    }
  }

  @Method()
  async present() {
    present(this, enterAnimationBuilder(this.el));
  }

  @Method()
  async dismiss() {
    dismiss(this, leaveAnimationBuilder(this.el));
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
