import { Component, Prop, State, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-item',
  styleUrl: 'item.scss',
  shadow: true,
})
export class item {
  @Prop() color: string = 'primary';
  @Prop() button: boolean = false;
  @Prop() line: boolean = false;
  @State() isFocus: boolean = false;

  render() {
    return (
      <Host
        class={{
          activatable: true,
          [`cy-color-${this.color}`]: true,
        }}
      >
        <div
          class={{
            'item-native': true,
            [`bottom-line`]: this.line,
          }}
        >
          <div class="item-inner">
            <slot name="start"></slot>
            <div class="input-wrapper">
              <slot></slot>
            </div>
            <slot name="end"></slot>
          </div>
        </div>
        {this.button ? <cy-ripple /> : null}
        {this.line && this.isFocus ? <div class="item-highlight"></div> : null}
      </Host>
    );
  }
}
