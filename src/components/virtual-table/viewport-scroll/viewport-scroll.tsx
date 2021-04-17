import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';
import { DimensionType } from '../interface';

@Component({
  tag: 'cy-viewport-scroll',
  styleUrl: 'viewport-scroll.scss',
})
export class ViewportScroll {
  //   @Prop() contentWidth: number = 0;
  @Prop() contentHeight: number = 0;
  @Event() scrollChange: EventEmitter;

  onScroll(scrollType: DimensionType, e: MouseEvent) {
    scrollType;
    this.scrollChange.emit((e.target as any).scrollTop);
  }

  render() {
    return (
      <Host>
        <div
          class="scroll-content"
          onScroll={(e: MouseEvent) => {
            this.onScroll('rows', e);
          }}
          style={{ height: this.contentHeight + 'px' }}>
          <slot />
        </div>
      </Host>
    );
  }
}
