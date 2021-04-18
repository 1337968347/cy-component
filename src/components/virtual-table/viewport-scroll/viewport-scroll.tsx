import { Component, h, Host, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { DimensionType } from '../interface';

@Component({
  tag: 'cy-viewport-scroll',
  styleUrl: 'viewport-scroll.scss',
})
export class ViewportScroll {
    @Prop() contentWidth: number = 0;
  @Prop() contentHeight: number = 0;
  @Event() scrollChange: EventEmitter;

  onScroll(scrollType: DimensionType, e: MouseEvent) {
    switch (scrollType) {
      case 'rows':
        this.scrollChange.emit({
          type: scrollType,
          offset: (e.target as any).scrollLeft,
        });
        break;

      case 'cols':
        this.scrollChange.emit({
          type: scrollType,
          offset: (e.target as any).scrollTop,
        });
        break;
    }
  }

  @Method() setScroll(scrollTop: number) {
    console.log(scrollTop);
  }

  render() {
    return (
      <Host
        onScroll={(e: MouseEvent) => {
          this.onScroll('rows', e);
        }}>
        <div class="inner-content" style={{ width: this.contentWidth + 'px' }}>
          <div class="header-wrapper">
            <slot name="header" />
          </div>
          <div
            class="vertical-scroll"
            onScroll={(e: MouseEvent) => {
              this.onScroll('cols', e);
            }}>
            <div style={{ height: this.contentHeight + 'px' }} class="vertical-inner-content">
              <slot name="content" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
