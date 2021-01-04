import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true,
})
export class checkbox {
  @Prop() color: string = 'primary';
  @Prop() checked: boolean = true;

  render() {
    return (
      <Host
        onClick={() => {
          this.checked = !!!this.checked;
        }}
        class={{
          [`cy-color-${this.color}`]: true,
          'cy-checked': this.checked,
        }}
      >
        <svg version="1.1" viewBox="0 0 64 64">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            style={{
              'fill': 'var(--fill-color)',
              'stroke': 'var(--border-color)',
              'stroke-width': 'var(--border-width)',
            }}
          />
          <path
            d="M 12 29 L 25 45 L 52.3 20.8"
            style={{
              'fill': 'transparent',
              'stroke': 'var(--right-color)',
              'stroke-width': 'var(--right-width)',
            }}
          />
        </svg>
      </Host>
    );
  }
}
