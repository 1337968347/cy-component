import { Component, Element, Prop, State, ComponentInterface, h, Host } from '@stencil/core';
import { createGesture, Gesture, GestureDetail } from '../../utils/gesture';

@Component({
  tag: 'cy-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class toggle implements ComponentInterface {
  @Element() el: HTMLElement;
  private gesture: Gesture;
  private lastDrag: number = 0;
  @Prop() color: string = '';
  @State() checked: boolean = true;

  componentDidLoad() {
    this.gesture = createGesture({
      el: this.el,
      direction: 'x',
      passive: false,
      maxAngle: 25,
      threshold: 3,
      onMove: this.onMove.bind(this),
      onEnd: this.onEnd.bind(this),
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

  onEnd(e: GestureDetail) {
    e.event.preventDefault();
    e.event.stopImmediatePropagation();
    this.lastDrag = Date.now();
  }

  onClick(ev) {
    ev.preventDefault();
    if (this.lastDrag + 300 < Date.now()) {
      this.checked = !!!this.checked;
    }
  }

  render() {
    return (
      <Host
        onClick={this.onClick.bind(this)}
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
