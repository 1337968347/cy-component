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
    }, 200);
  }

  // 创建动画
  createAnimation(ele: HTMLElement, keyframes: any[]) {
    ele.animate(keyframes, {
      delay: 0,
      duration: 300,
      fill: 'none',
      iterations: 1,
      direction: 'normal',
    });
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
