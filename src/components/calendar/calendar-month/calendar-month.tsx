import { Component, Element, Prop, State, Method, Watch, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderMouth, TranslateClass } from '../utils';

@Component({
  tag: 'cy-calendar-month',
})
export class CalendarMonth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  @State() renderMouths: number[][][] = [];
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;
  @Watch('calendarDate')
  handleNav() {
    this.renderMouths = getRenderMouth(this.calendarDate.year);
  }

  componentWillLoad() {
    this.renderMouths = getRenderMouth(this.calendarDate.year);
  }

  @Method()
  async prevPage(animationDuration: number = 800) {
    return new Promise<void>(resolve => {
      const transEl = this.el.querySelector<HTMLElement>('.pageNavBox');
      transEl.classList.add(TranslateClass);

      setTimeout(() => {
        transEl.classList.remove(TranslateClass);
        transEl.style.transform = '';

        this.parent.change({ year: this.calendarDate.year - 1 });
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

        this.parent.change({ year: this.calendarDate.year + 1 });
        resolve();
      }, animationDuration);
    });
  }

  handleClick(chooseMouth: number[]) {
    this.parent.change({ year: chooseMouth[0], month: chooseMouth[1] }, 'month');
  }

  private isNow(month: number[]) {
    return month[0] === this.dateNow.getUTCFullYear() && month[1] === this.dateNow.getUTCMonth() + 1;
  }

  render() {
    return (
      <div class="table">
        <div class="tbody">
          <div class="pageNavBox">
            {this.renderMouths.map(mouths => (
              <div class="tr">
                {mouths.map(month => (
                  <div class="td">
                    <div
                      onClick={() => {
                        this.handleClick(month);
                      }}
                      class={{
                        item: true,
                        now: this.isNow(month),
                        obvious: month[0] === this.calendarDate.year,
                      }}>
                      {month[1]}月
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
