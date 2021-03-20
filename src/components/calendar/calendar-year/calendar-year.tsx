import { Component, Prop, Element, State, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderYear, getDecadeRange } from '../utils';

@Component({
  tag: 'cy-calendar-year',
})
export class CalendarYear implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  @State() renderYears: number[][] = [];
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;

  @Method()
  async prevPage() {
    this.parent.change({ decade: [this.calendarDate.decade[0] - 10, this.calendarDate.decade[1] - 10] });
  }

  @Method()
  async nextPage() {
    this.parent.change({ decade: [this.calendarDate.decade[0] + 10, this.calendarDate.decade[1] + 10] });
  }

  handleClick(year: number) {
    const decadeRange = getDecadeRange(year);
    this.parent.change({ year: year, decade: [decadeRange[0], decadeRange[1]] }, 'year');
  }

  render() {
    const getRenderTable = (renderYears: number[][], tableName: string) => {
      return (
        <div class={tableName}>
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
                      obvious: year >= this.calendarDate.decade[0] && year <= this.calendarDate.decade[1] && tableName === 'current',
                    }}>
                    {year}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    const currentRenderDate = getRenderYear(this.calendarDate.decade);
    const prevRenderDate = getRenderYear([this.calendarDate.decade[0] - 10, this.calendarDate.decade[1] - 10]);
    const nextRenderDate = getRenderYear([this.calendarDate.decade[0] + 10, this.calendarDate.decade[1] + 10]);

    return (
      <div class="table">
        <div class="tbody ">
          <div class="pageNavBox">
            {getRenderTable(prevRenderDate, 'prev')}
            {getRenderTable(currentRenderDate, 'current')}
            {getRenderTable(nextRenderDate, 'next')}
          </div>
        </div>
      </div>
    );
  }
}
