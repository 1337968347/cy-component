import { Component, Element, Prop, Event, EventEmitter, Listen, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-backdrop',
  styleUrl: 'backdrop.scss',
  shadow: true,
})
export class backdrop {
  @Element() el: HTMLElement;

  @Prop() tappable: boolean = true;
  @Prop() stopPropagation = true;

  @Event() backDrop: EventEmitter;

  @Listen('click', { passive: false, capture: true })
  protected onMouseDown(ev: TouchEvent) {
    this.emitTap(ev);
  }

  private emitTap(ev: Event) {
    if (this.stopPropagation) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (this.tappable) {
      this.backDrop.emit();
    }
  }

  render() {
    return <Host></Host>;
  }
}
