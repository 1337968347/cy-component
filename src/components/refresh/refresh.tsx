import { Component, State, Element, h, Host } from '@stencil/core';
import { createGesture } from '../../utils/gesture';
@Component({
  tag: 'cy-refresh',
  styleUrl: 'refresh.scss',
})
export class refresh {
  private gesture?: any;

  private scrollEl?: HTMLElement;

  @State() private state: RefresherState = RefresherState.Inactive;
  @Element() el;

  componentDidLoad() {
    this.scrollEl = this.el.closest('cy-content').querySelector('main');
    this.setNativeFresh();
    this.gesture.enable(true);
  }

  async setNativeFresh() {
    this.gesture = createGesture({
      el: this.scrollEl!,
      direction: 'y',
      threshold: 5,
      canStart: () => this.state !== RefresherState.Refreshing && this.state !== RefresherState.Completing && this.scrollEl!.scrollTop === 0,
      onStart: ev => {
        ev.data = { animation: undefined, didStart: false, cancelled: false };
      },
      onMove: ev => {
        console.log(ev);
      },
      onEnd: ev => {
        console.log(ev);
      },
    });
  }
  render() {
    return (
      <Host>
        <img src="../../assets/icon/icon.png" alt="" />
      </Host>
    );
  }
}

const enum RefresherState {
  Inactive = 1 << 0,
  Pulling = 1 << 1,
  Ready = 1 << 2,
  Refreshing = 1 << 3,
  Cancelling = 1 << 4,
  Completing = 1 << 5,

  _BUSY_ = Refreshing | Cancelling | Completing,
}
