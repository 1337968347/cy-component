import { Component, Prop, Element, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderYear, getDecadeRange } from '../utils';

@Component({
  tag: 'cy-calendar-year',
})
export class CalendarYear implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  @Prop() calendarDate: CalendarDate;

  dateNow: Date = new Date();

  @Method()
  async prevPage() {}

  @Method()
  async nextPage() {}

  handleClick(year: number) {
    const decadeRange = getDecadeRange(year);
    this.parent.change({ year: year, decade: [decadeRange[0], decadeRange[1]] }, 'year');
  }

  render() {
    const renderYears = getRenderYear(this.calendarDate.decade);
    return (
      <div class="table">
        <div class="tbody">
          {renderYears.map(decade => (
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
    );
  }
}
