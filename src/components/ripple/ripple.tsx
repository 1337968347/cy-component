import { Component, h } from '@stencil/core';

@Component({
  tag: 'cy-ripple',
  styleUrl: 'ripple.scss',
})
export class ripple {
  render() {
    return (
      <button class="activatable ripple-parent">
        Profile page
        <div class="ripple-effect"></div>
      </button>
    );
  }
}
