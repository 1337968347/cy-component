import { Component, Element, Prop, h, Host, ComponentInterface, Method } from '@stencil/core';
import { ActionSheetButton } from '../../interface';
import { prepareOverlay, present, dismiss } from '../../utils/overlays';

import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';

@Component({
  tag: 'cy-action-sheet',
  styleUrl: 'action-sheet.scss',
  scoped: true,
})
export class ActionSheet implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() overlayIndex: number = 0;
  @Prop() header: string = '';
  @Prop() cssClass: string = '';
  @Prop() buttons: ActionSheetButton[] = [];

  componentWillLoad() {
    prepareOverlay(this.el);
  }

  @Method()
  async present() {
    present(this, enterAnimationBuilder);
  }

  @Method()
  async dismiss() {
    dismiss(this, leaveAnimationBuilder);
  }

  async onClick(button: ActionSheetButton) {
    await button.handler();
    this.dismiss();
  }

  onBackDropClick() {
    console.log("")
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
        <div></div>
        <div class={'action-sheet-container ' + this.cssClass}>
          <div class="action-sheet-group">
            <div class="action-sheet-title">{this.header}</div>
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
          {actionCancel ? (
            <div class="action-sheet-group">
              <div
                class="action-sheet-oper action-sheet-cancel activatable"
                onClick={() => {
                  this.onClick(actionCancel);
                }}
              >
                {actionCancel.text}
              </div>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
