import { Component, Element, State, h, Host } from '@stencil/core';
import { createAnimation } from '../../utils/animation/animation';
@Component({
  tag: 'number-input',
  styleUrl: 'number-input.scss',
  shadow: true,
})
export class NumberInput {
  @Element() el: HTMLElement;
  @State() num = 1;
  animationNext: any = null;
  animationPrev: any = null;

  componentDidLoad() {
    this.animationNext = createAnimation().addElement(this.el).fill('none').duration(500).fromTo('transform', 'rotateY(0)', 'rotateY(180deg)');
    this.animationPrev = createAnimation().addElement(this.el).fill('none').duration(500).fromTo('transform', 'rotateY(0)', 'rotateY(-180deg)');
  }

  add() {
    this.modify(1);
    this.animationNext.play();
  }

  reduce() {
    this.modify(-1);
    this.animationPrev.play();
  }

  modify(numA) {
    setTimeout(() => {
      this.num = this.num + numA;
    }, 200);
  }

  render() {
    return (
      <Host>
        <div class="front">
          <div class="oper activatable" onClick={this.reduce.bind(this)}>
            -<cy-ripple />
          </div>
          <div class="num-box">{this.num}</div>
          <div class="oper activatable" onClick={this.add.bind(this)}>
            +<cy-ripple />
          </div>
        </div>
        <div class="back">
          <div class="oper activatable" onClick={this.reduce.bind(this)}>
            -<cy-ripple />
          </div>
          <div class="num-box">{this.num}</div>
          <div class="oper activatable" onClick={this.add.bind(this)}>
            +<cy-ripple />
          </div>
        </div>
      </Host>
    );
  }
}
