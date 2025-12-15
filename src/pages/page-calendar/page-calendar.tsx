import { Component, State, Element, h } from '@stencil/core';
import { configManager } from '../../utils/config';
import { Color } from '../../interface';

@Component({
  tag: 'page-calendar',
  styleUrl: 'page-calendar.scss',
})
export class PageCalendar {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();

  toggleMenu() {
    document.querySelector('cy-menu').toggle();
  }

  render() {
    return (
      <div class="cy-page">
        <a class="github-link" target="_blank" href="https://github.com/1337968347/cy-component/tree/master/src/components/calendar">
          <cy-icon name="github" />
          <span class="link-text">查看源码</span>
        </a>
        <cy-content>
          <cy-calendar color={this.color} />
          <cy-time color={this.color} />
        </cy-content>
      </div>
    );
  }
}
