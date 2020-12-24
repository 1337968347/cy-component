import { Element, Component, State, Method, h } from '@stencil/core';

@Component({
  tag: 'cy-nav',
  styleUrl: 'nav.scss',
})
export class nav {
  @Element() el;
  @State() comList = [];
  @State() lastId = 0;

  @Method()
  addCom() {
    const navContainer = this.el.querySelector('.nav-container');
    const com = document.createElement('page-one');
    [...navContainer.children]
      .filter((item, index) => index !== [...navContainer.children].length - 1)
      .forEach(ele => {
        ele.className = 'cy-page hidden';
      });
    const prev = navContainer.children[navContainer.children.length - 1];

    this.lastId++;
    com.style.zIndex = this.lastId + '';
    com.id = this.lastId + '';
    com.className = 'cy-page';

    setTimeout(() => {
      [...navContainer.children][[...navContainer.children].length - 2].className = 'cy-page hidden';
    }, 900);
    this.createAnimation(com);
    this.createHiddenAnimation(prev);
    navContainer.appendChild(com);
  }

  @Method()
  pop() {
    this.lastId--;
    const navContainer = this.el.querySelector('.nav-container');
    if (navContainer.children.length == 1) {
      return;
    }
    [...navContainer.children].slice(0, [...navContainer.children].length - 2).forEach(ele => {
      ele.className = 'hydrated hidden';
    });
    navContainer.children[navContainer.children.length - 2].className = 'cy-page hydrated';
    const prev = navContainer.children[navContainer.children.length - 1];
    console.log(prev);
    this.createPopHiddenAnimation(prev);
    setTimeout(() => {
      navContainer.removeChild(prev);
    }, 700);
  }

  // 创建动画
  createAnimation(ele: HTMLElement) {
    ele.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0px)' }], {
      delay: 0,
      duration: 1000,
      easing: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
      iterations: 1,
      fill: 'none',
      direction: 'normal',
    });
  }

  createHiddenAnimation(ele: HTMLElement) {
    ele.animate(
      [
        { transform: 'translateX(0)', opacity: '1' },
        { transform: 'translateX(-100%)', opacity: '0.8' },
      ],
      {
        delay: 0,
        duration: 1000,
        easing: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
        iterations: 1,
        fill: 'none',
        direction: 'normal',
      },
    );
  }

  createPopHiddenAnimation(ele: HTMLElement) {
    ele.animate(
      [
        { transform: 'translateX(0)', opacity: '1' },
        { transform: 'translateX(100%)', opacity: '0.8' },
      ],
      {
        delay: 0,
        duration: 1000,
        easing: 'cubic-bezier(0.36, 0.66, 0.04, 1)',
        iterations: 1,
        fill: 'none',
        direction: 'normal',
      },
    );
  }

  getLastComponent() {
    const children = this.el.querySelector('.nav-container');
    return children[children.length - 1];
  }

  render() {
    return (
      <div class="nav-container">
        <slot />
        {this.comList.map((id, index) => (
          <page-one
            style={{
              'z-index': id + '',
            }}
            id={id + ''}
          ></page-one>
        ))}
      </div>
    );
  }
}
