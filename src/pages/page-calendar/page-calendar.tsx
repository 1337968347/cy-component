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
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">仿win10日历</h3>
          <a target="_blank" href="https://github.com/1337968347/cy-component/tree/master/src/components/calendar" slot="end">
            <cy-icon name="github" />
          </a>
        </cy-header>
        <cy-content>
          <cy-calendar color={this.color} />
          <cy-time color={this.color} />
        </cy-content>
      </div>
    );
  }
}
