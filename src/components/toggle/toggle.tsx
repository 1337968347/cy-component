import { Component, Prop, State, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class toggle {
  @Prop() color: string = '';
  @State() checked: boolean = true;

  render() {
    return (
      <Host
        onClick={() => {
          this.checked = !!!this.checked;
        }}
        class={{
          [`cy-color-${this.color}`]: true,
          'toggle-checked': this.checked,
        }}
      >
        <div class="toggle-bg">
          <div class="toggle-icon-handle"></div>
        </div>
      </Host>
    );
  }
}
