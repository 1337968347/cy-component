import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-ripple',
  styleUrl: 'ripple.scss',
  shadow: true,
})
export class ripple {
  @Prop() type: 'unbounded' | 'bounded' = 'bounded';

  render() {
    return <Host data-type={this.type} class="ripple-effect"></Host>;
  }
}
