import { Component, Element, h, Prop, Host, State, Method } from '@stencil/core';

@Component({
  tag: 'cy-segment-button',
  styleUrl: 'segment-button.scss',
  shadow: true,
})
export class SegmentButton {
  private segmentEl = null;
  @Element() el: HTMLElement;
  @Prop() value: string = '';
  @State() check: boolean = false;

  componentDidLoad() {
    this.segmentEl = this.el.closest('cy-segment');
    this.update();
  }

  @Method()
  async update() {
    this.check = this.segmentEl.value === this.value;
  }

  render() {
    return (
      <Host
        class={{
          'segment-button-checked': this.check,
        }}
      >
        <div class="segment-button-container">
          <slot />
        </div>
        <div
          class={{
            'segment-button-indicator': true,
          }}
        >
          {this.check ? <div class="seg-button-bg"></div> : null}
        </div>
      </Host>
    );
  }
}
