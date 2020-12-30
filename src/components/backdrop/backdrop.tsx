import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-backdrop',
  styleUrl: 'backdrop.scss',
  shadow: true,
})
export class backdrop {
  render() {
    return <Host></Host>;
  }
}
