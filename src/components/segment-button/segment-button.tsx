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
  }

  @Method()
  update() {
    this.check = this.segmentEl.value === this.value;
  }

  render() {
    return (
      <Host>
        <div class="segment-button-container">
          <slot />
        </div>
        <div class="segment-button-indicator segment-change-animation"></div>
      </Host>
    );
  }
}
