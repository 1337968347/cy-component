import { Component, State, Host, h } from '@stencil/core';

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    @State() currentYear = 2021
    @State() currentMonth = 2


    render() {

        return (
            <Host>
                <div class="calendar-header">
                    {this.currentYear}&nbsp;年&nbsp;
                    {this.currentMonth}&nbsp;月
                </div>
                <div class="calendar-content">
                    <cy-calendar-mouth currentYear={this.currentYear} currentMonth={this.currentMonth}></cy-calendar-mouth>
                </div>
            </Host>
        );
    }
}