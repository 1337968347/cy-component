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
  private horScrollEle: HTMLElement;
  private verScrollEle: HTMLElement;
  private scrollService;

  connectedCallback() {
    this.scrollService = createScrollService(
      {
        beforeScroll: e => {
          this.scrollChange.emit(e);
        },
        afterScroll: e => {
          console.log(e);
          switch (e.dimension) {
            case 'rows':
              this.horScrollEle.scrollLeft = e.coordinate;
              break;
            case 'cols':
              this.verScrollEle.scrollTop = e.coordinate;
              break;
          }
        },
      },
      30,
    );
  }

  onScroll(scrollType: DimensionType, e: MouseEvent) {
    e.preventDefault();
    switch (scrollType) {
      case 'rows':
        this.scrollService.scroll(scrollType, (e.target as any).scrollLeft);
        break;
      case 'cols':
        this.scrollService.scroll(scrollType, (e.target as any).scrollTop);
        break;
    }
  }

  onMouseWeel(scrollType: DimensionType, delta: 'deltaX' | 'deltaY', e: WheelEvent) {
    const nowOffset = scrollType === 'rows' ? this.horScrollEle.scrollLeft : this.verScrollEle.scrollTop;
    const coordinate = nowOffset + e[delta];
    this.scrollService.scroll(scrollType, coordinate);
  }

  @Method() async setScroll(dimension: DimensionType, offset: number) {
    this.scrollService.setScroll(dimension, offset);
  }

  render() {
    return (
      <Host
        ref={e => (this.horScrollEle = e)}
        onScroll={(e: MouseEvent) => {
          this.onScroll('rows', e);
        }}>
        <div class="inner-content" style={{ width: this.contentWidth + 'px' }}>
          <div class="header-wrapper">
            <slot name="header" />
          </div>
          <div
            class="vertical-scroll"
            ref={e => (this.verScrollEle = e)}
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
