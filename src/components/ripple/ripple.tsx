import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-ripple',
  styleUrl: 'ripple.scss',
  shadow: true,
})
export class ripple {
  render() {
    return <Host class="ripple-effect"></Host>;
  }
}
