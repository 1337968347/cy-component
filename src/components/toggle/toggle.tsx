import { Component, Element, Prop, State, h, Host } from '@stencil/core';
import { createGesture, Gesture, GestureDetail } from '../../utils/gesture';

@Component({
  tag: 'cy-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class toggle {
  @Element() el: HTMLElement;
  private gesture: Gesture;
  @Prop() color: string = '';
  @State() checked: boolean = true;

  componentDidLoad() {
    this.gesture = createGesture({
      el: this.el,
      direction: 'x',
      passive: true,
      maxAngle: 25,
      onMove: this.onMove.bind(this),
    });
    this.gesture.enable();
  }

  onMove(e: GestureDetail) {
    const rect = this.el.getBoundingClientRect();
    const boundary = rect.left + rect.width / 2;

    if (e.currentX > boundary) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

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
