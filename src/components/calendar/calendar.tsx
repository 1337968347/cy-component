import { Component, Element, State, Method, Host, h } from '@stencil/core';
import { ViewMode, CalendarDate } from '../../interface';
import { getDecadeRange } from './utils';
// import { nextPageAnimationBuilder, prevPageAnimationBuilder } from './animation';

const ViewModeEnum: ViewMode[] = ['decade', 'year', 'month'];

@Component({
  tag: 'cy-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class CyCalendar {
  @Element() el: HTMLCyCalendarElement;
  // 下标 0： 十年  1： 年  2：月份
  @State() calendarDate: CalendarDate;
  @State() viewMode: ViewMode = 'month';
  private isAsync: Boolean = false;
  private activeEl: HTMLElement;

  componentWillLoad() {
    this.initCalendarDate();
  }

  componentDidLoad() {
    this.switchViewMode('month');
  }

  /**
   * 初始值
   */
  private initCalendarDate() {
    const nowDate = new Date();
    const decadeRange = getDecadeRange(nowDate.getUTCFullYear());
    this.calendarDate = {
      decade: [decadeRange[0], decadeRange[1]],
      year: nowDate.getUTCFullYear(),
      month: nowDate.getUTCMonth() + 1,
    };
  }

  getShouldRenderDom() {
    let willActiveEl;
    switch (this.viewMode) {
      case 'decade':
        willActiveEl = document.createElement('cy-calendar-year');
        break;
      case 'year':
        willActiveEl = document.createElement('cy-calendar-month');
        break;
      case 'month':
        willActiveEl = document.createElement('cy-calendar-day');
        break;
      default:
        break;
    }

    willActiveEl.parent = this.el;
    willActiveEl.calendarDate = this.calendarDate;
    return willActiveEl;
  }

  switchViewMode(viewMode: ViewMode) {
    this.viewMode = viewMode;
    if (this.activeEl) {
      this.activeEl.remove();
      this.activeEl = null;
    }
    const showEl = this.getShouldRenderDom();
    const containerEl = this.el.shadowRoot.querySelector<HTMLElement>('.translate-box');
    containerEl.appendChild(showEl);
    this.activeEl = showEl;
  }

  /**
   * 点击日历左上角
   */
  backViewMode() {
    if (this.viewMode !== 'decade') {
      delete this.calendarDate[this.viewMode];
      this.calendarDate = { ...this.calendarDate };
    }
    const nextIndex = Math.max(ViewModeEnum.indexOf(this.viewMode) - 1, 0);
    this.switchViewMode(ViewModeEnum[nextIndex]);
  }

  @Method()
  async change(modifyCalendarDate: CalendarDate, viewMode?: ViewMode) {
    this.calendarDate = { ...this.calendarDate, ...modifyCalendarDate };
    (this.activeEl as any).calendarDate = this.calendarDate;
    if (viewMode) {
      this.switchViewMode(viewMode);
    }
  }

  @Method()
  async prevPage() {
    if (this.isAsync) {
      return;
    }
    this.isAsync = true;
    await (this.activeEl as any).prevPage(800);
    this.isAsync = false;
  }

  @Method()
  async nextPage() {
    if (this.isAsync) {
      return;
    }
    this.isAsync = true;
    await (this.activeEl as any).nextPage(800);
    this.isAsync = false;
  }

  render() {
    return (
      <Host>
        <div class="calendar-header">
          <div class="calendar-switch activatable" onClick={this.backViewMode.bind(this)}>
            {this.viewMode === 'decade' ? <span>{`${this.calendarDate.decade[0]}-${this.calendarDate.decade[1]}`}</span> : null}
            {this.viewMode === 'year' ? <span>{this.calendarDate.year}年</span> : null}
            {this.viewMode === 'month' ? (
              <span>
                {this.calendarDate.year}年{this.calendarDate.month}月
              </span>
            ) : null}
          </div>

          <div class="calendar-page-nav">
            <div class="nav-box">
              <cy-icon onClick={this.prevPage.bind(this)} class="activatable" name="up" />
            </div>
            <div class="nav-box">
              <cy-icon onClick={this.nextPage.bind(this)} class="activatable" name="down" />
            </div>
          </div>
        </div>
        <div class="calendar-content">
          <div class="translate-box">{/* container */}</div>
        </div>
      </Host>
    );
  }
}
