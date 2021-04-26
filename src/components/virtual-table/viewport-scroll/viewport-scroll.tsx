import { Component, h, Host, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { createScrollService } from '../scroll';
import { DimensionType } from '../interface';

@Component({
  tag: 'cy-viewport-scroll',
  styleUrl: 'viewport-scroll.scss',
})
export class ViewportScroll {
  @Prop() contentWidth: number = 0;
  @Prop() contentHeight: number = 0;
  @Event() scrollChange: EventEmitter;
  private scrollService;

  connectedCallback() {
    this.scrollService = createScrollService(
      {
        beforeScroll: e => {
          this.scrollChange.emit(e);
        },
        afterScroll: e => {},
      },
      30,
    );
  }

  onScroll(scrollType: DimensionType, e: MouseEvent) {
    switch (scrollType) {
      case 'rows':
        this.scrollService.scroll(scrollType, (e.target as any).scrollLeft);
        break;
      case 'cols':
        this.scrollService.scroll(scrollType, (e.target as any).scrollTop);
        break;
    }
  }

  @Method() async setScroll(scrollTop: number) {
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
