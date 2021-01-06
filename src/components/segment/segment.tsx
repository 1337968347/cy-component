import { Component, Prop, Host, h, Listen } from '@stencil/core';

@Component({
  tag: 'cy-segment',
  styleUrl: 'segment.scss',
  shadow: true,
})
export class segment {
  private currentEl;
  @Prop() color: string = 'primary';
  @Prop() value: string = '';

  @Listen('choose')
  handleSegChoose(e) {
    this.value = e.detail.value;
  }

  clickSeg(e) {
    
  }

  render() {
    return (
      <Host
        onClick={e => {
          this.clickSeg(e);
        }}
        class={{
          [`cy-color-${this.color}`]: true,
        }}
      >
        <slot />
      </Host>
    );
  }
}
