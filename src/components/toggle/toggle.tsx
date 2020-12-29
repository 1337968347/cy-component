import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class toggle {
  @Prop() color: string = '';

  render() {
    return (
      <Host
        class={{
          [`ion-color-${this.color}`]: true,
        }}
      >
        <div class="toggle-icon"></div>
      </Host>
    );
  }
}
