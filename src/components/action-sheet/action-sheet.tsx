import { Component, Element, Prop, h, Host, Method } from '@stencil/core';
import { ActionSheetButton } from '../../interface';

@Component({
  tag: 'cy-action-sheet',
  styleUrl: 'action-sheet.scss',
  scoped: true,
})
export class ActionSheet {
  @Element() el: HTMLElement;
  @Prop() header: string = '';
  @Prop() cssClass: string = '';
  @Prop() buttons: ActionSheetButton[] = [];

  @Method()
  async present() {
    this.el.classList.remove('action-sheet-hidden');
  }

  render() {
    const actionSheets = this.buttons.filter(item => item.role !== 'cancel');
    const actionCancel = this.buttons.find(item => item.role === 'cancel');
    return (
      <Host class="action-sheet-overlay action-sheet-hidden">
        <cy-backdrop />
        <div></div>
        <div class={'action-sheet-container ' + this.cssClass}>
          <div class="action-sheet-group">
            <div class="action-sheet-title">{this.header}</div>
            {actionSheets.map(button => (
              <div class="action-sheet-oper activatable" onClick={button.handler}>
                {button.text}
                <cy-ripple />
              </div>
            ))}
          </div>
          {actionCancel ? (
            <div class="action-sheet-group">
              <div class="action-sheet-oper action-sheet-cancel activatable" onClick={actionCancel.handler}>
                {actionCancel.text}
                <cy-ripple />
              </div>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
