import { Component, h, Element, Host, Prop, State } from '@stencil/core';
import { createAnimation } from '../../utils/animation/animation';

@Component({
  tag: 'cy-time',
  styleUrl: 'time.scss',
  shadow: true,
})
export class CyTime {
  @Element() el: HTMLElement;
  @Prop() color: string = 'primary';
  @State() step: number;
  baseAnimation: any;
  hourAnimation: any;
  minusAnimation: any;
  secondAnimation: any;

  componentDidLoad() {
    this.baseAnimation = createAnimation().addElement(this.el).iterations(Infinity);
    this.hourAnimation = createAnimation().addElement(this.el.shadowRoot.querySelector('.hour')).duration(43200000).fromTo('transform', 'rotate(-180deg)', 'rotate(180deg)');
    this.minusAnimation = createAnimation().addElement(this.el.shadowRoot.querySelector('.minus')).duration(3600000).fromTo('transform', 'rotate(-180deg)', 'rotate(180deg)');
    this.secondAnimation = createAnimation().addElement(this.el.shadowRoot.querySelector('.second')).duration(60000).fromTo('transform', 'rotate(-180deg)', 'rotate(180deg)');
    this.baseAnimation.addAnimation([this.hourAnimation, this.minusAnimation, this.secondAnimation]);
    let currentDate = new Date();
    const secondStep = (currentDate.getSeconds() / 60).toFixed(4);
    const minusStep = ((currentDate.getSeconds() + currentDate.getMinutes() * 60) / 3600).toFixed(4);
    const hourStep = ((currentDate.getSeconds() + currentDate.getMinutes() * 60 + (currentDate.getHours() % 12) * 3600) / 43200).toFixed(4);
    this.baseAnimation.play(false);
    this.secondAnimation.progressStart(secondStep);
    this.minusAnimation.progressStart(minusStep);
    this.hourAnimation.progressStart(hourStep);
    this.baseAnimation.play(false);
  }

  render() {
    return (
      <Host
        class={{
          [`cy-color-${this.color}`]: true,
        }}
      >
        <div class="clock">
          <div class="hour"></div>
          <div class="minus"></div>
          <div class="second"></div>
        </div>
      </Host>
    );
  }
}
