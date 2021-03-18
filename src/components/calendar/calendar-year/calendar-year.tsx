import { Component, Prop, Element, State, Watch, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderYear, getDecadeRange, TranslateClass } from '../utils';

@Component({
  tag: 'cy-calendar-year',
})
export class CalendarYear implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  @State() renderYears: number[][] = [];
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;
  @Watch('calendarDate')
  handleNav() {
    this.renderYears = getRenderYear(this.calendarDate.decade);
  }

  componentWillLoad() {
    this.renderYears = getRenderYear(this.calendarDate.decade);
  }

  @Method()
  async prevPage(animationDuration: number = 800) {
    return new Promise<void>(resolve => {
      const transEl = this.el.querySelector<HTMLElement>('.pageNavBox');
      transEl.classList.add(TranslateClass);

      setTimeout(() => {
        transEl.classList.remove(TranslateClass);
        transEl.style.transform = '';

        this.parent.change({ decade: [this.calendarDate.decade[0] - 10, this.calendarDate.decade[1] - 10] });
        resolve();
      }, animationDuration);
    });
  }

  @Method()
  async nextPage(animationDuration: number = 800) {
    return new Promise<void>(resolve => {
      const transEl = this.el.querySelector<HTMLElement>('.pageNavBox');
      transEl.classList.add(TranslateClass);

      setTimeout(() => {
        transEl.classList.remove(TranslateClass);
        transEl.style.transform = '';

        this.parent.change({ decade: [this.calendarDate.decade[0] + 10, this.calendarDate.decade[1] + 10] });
        resolve();
      }, animationDuration);
    });
  }

  handleClick(year: number) {
    const decadeRange = getDecadeRange(year);
    this.parent.change({ year: year, decade: [decadeRange[0], decadeRange[1]] }, 'year');
  }

  render() {
    return (
      <div class="table">
        <div class="tbody">
          <div class="pageNavBox">
            {this.renderYears.map(decade => (
              <div class="tr">
                {decade.map(year => (
                  <div class="td">
                    <div
                      onClick={() => {
                        this.handleClick(year);
                      }}
                      class={{
                        item: true,
                        now: this.dateNow.getUTCFullYear() === year,
                        obvious: year >= this.calendarDate.decade[0] && year <= this.calendarDate.decade[1],
                      }}>
                      {year}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
