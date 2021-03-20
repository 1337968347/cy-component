import { Component, Prop, Element, h, Method } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderDay, getMouthOffset } from '../utils';
@Component({
  tag: 'cy-calendar-day',
})
export class CalendarMouth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;

  activateEl: HTMLElement;

  @Method()
  async prevPage() {
    this.removeClick();
    const [prevMouthYear, prevMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, -1);
    this.parent.change({ year: prevMouthYear, month: prevMouthMouth });
  }

  @Method()
  async nextPage() {
    this.removeClick();
    const [nextMouthYear, nextMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, 1);
    this.parent.change({ year: nextMouthYear, month: nextMouthMouth });
  }

  private isNow(day: number[]) {
    return day[0] === this.dateNow.getUTCFullYear() && day[1] === this.dateNow.getUTCMonth() + 1 && day[2] === this.dateNow.getUTCDate();
  }

  handleClick(e: any) {
    this.removeClick();
    this.activateEl = e.target.closest('.td');
    this.activateEl.classList.add('choosed');
  }

  removeClick() {
    if (this.activateEl) {
      this.activateEl.classList.remove('choosed');
    }
  }

  render() {
    const currentRenderDate = getRenderDay(this.calendarDate.year, this.calendarDate.month);
    const [nextMouthYear, nextMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, 1);
    const [prevMouthYear, prevMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, -1);
    const prevRenderDate = getRenderDay(prevMouthYear, prevMouthMouth);
    const nextRenderDate = getRenderDay(nextMouthYear, nextMouthMouth);

    const getRenderDayTable = (renderDate: number[][][], tableName: string) => {
      return (
        <div class={tableName}>
          {renderDate.map(week => (
            <div class="tr">
              {week.map(day => (
                <div
                  class="td"
                  onClick={e => {
                    this.handleClick(e);
                  }}>
                  <div
                    class={{
                      item: true,
                      obvious: day[1] === this.calendarDate.month && tableName === 'current',
                      now: this.isNow(day),
                    }}>
                    {day[2]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div class="table">
        <div class="tr">
          {['一', '二', '三', '四', '五', '六', '日'].map(tag => (
            <div class="td">{tag}</div>
          ))}
        </div>
        <div class="tbody ">
          <div class="pageNavBox">
            {getRenderDayTable(prevRenderDate, 'prev')}
            {getRenderDayTable(currentRenderDate, 'current')}
            {getRenderDayTable(nextRenderDate, 'next')}
          </div>
        </div>
      </div>
    );
  }
}
