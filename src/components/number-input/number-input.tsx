import { Component, Element, State, h, Host } from '@stencil/core';

@Component({
  tag: 'number-input',
  styleUrl: 'number-input.scss',
  shadow: true,
})
export class NumberInput {
  @Element() el: HTMLElement;
  @State() num = 1;

  add() {
    this.modify(1);
    const addKeyframes = [{ transform: 'rotateY(0)' }, { transform: 'rotateY(180deg)' }];
    this.createAnimation(this.el, addKeyframes);
  }

  reduce() {
    this.modify(-1);
    const reduceKeyframes = [{ transform: 'rotateY(0)' }, { transform: 'rotateY(-180deg)' }];
    this.createAnimation(this.el, reduceKeyframes);
  }

  modify(numA) {
    setTimeout(() => {
      this.num = this.num + numA;
    }, 150);
  }

  // 创建动画
  createAnimation(ele: HTMLElement, keyframes: any[]) {
    ele.animate(keyframes, {
      delay: 0,
      duration: 400,
      easing: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
      fill: 'both',
      iterations: 1,
      direction: 'normal',
    });
  }

  render() {
    return (
      <Host>
        <div class="front">
          <div class="oper" onClick={this.reduce.bind(this)}>
            -
          </div>
          <div class="num-box">{this.num}</div>
          <div class="oper" onClick={this.add.bind(this)}>
            +
          </div>
        </div>
        <div class="back">
          <div class="oper" onClick={this.reduce.bind(this)}>
            -
          </div>
          <div class="num-box">{this.num}</div>
          <div class="oper" onClick={this.add.bind(this)}>
            +
          </div>
        </div>
      </Host>
    );
  }
}
