import { Component,Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-button',
  styleUrl: 'cy-button.scss',
  shadow: true,
})
export class CyButton {
  @Prop() color: string = ''
  render() {
    return (
      <Host class={
        {
          [`cy-color-${this.color}`]: true,
          'activatable': true
        }
      }>
        <button class="button-native">
          <slot />
        </button>
        <cy-ripple></cy-ripple>
      </Host>
    );
  }
}
