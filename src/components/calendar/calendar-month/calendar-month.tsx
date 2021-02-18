import { Component, Element, Prop, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderMouth, TranslateClass } from '../utils';

@Component({
  tag: 'cy-calendar-month',
})
export class CalendarMonth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() calendarDate: CalendarDate;
  @Prop() parent: HTMLCyCalendarElement;
  dateNow: Date = new Date();

  @Method()
  async prevPage() {
    return new Promise<void>(resolve => {
      const transEl = this.el.querySelector<HTMLElement>('.table');
      transEl.classList.add(TranslateClass);
      transEl.style.transform = `translateY(-100%)`;

      setTimeout(() => {
        transEl.classList.remove(TranslateClass);
        transEl.style.transform = '';

        this.parent.change({ year: this.calendarDate.year - 1 });
        resolve();
      }, 800);
    });
  }

  @Method()
  async nextPage() {
    return new Promise<void>(resolve => {
      const transEl = this.el.querySelector<HTMLElement>('.table');
      transEl.classList.add(TranslateClass);
      transEl.style.transform = `translateY(100%)`;
      setTimeout(() => {
        transEl.classList.remove(TranslateClass);
        transEl.style.transform = '';

        this.parent.change({ year: this.calendarDate.year + 1 });
        resolve();
      }, 800);
    });
  }

  handleClick(chooseMouth: number[]) {
    this.parent.change({ year: chooseMouth[0], month: chooseMouth[1] }, 'month');
  }

  private isNow(month: number[]) {
    return month[0] === this.dateNow.getUTCFullYear() && month[1] === this.dateNow.getUTCMonth() + 1;
  }

  render() {
    const renderMouths = getRenderMouth(this.calendarDate.year);
    return (
      <div class="table">
        <div class="tbody">
          {renderMouths.map(mouths => (
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
    );
  }
}
