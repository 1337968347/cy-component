import { Component, State, Host, h } from '@stencil/core';
import { ViewMode } from "../../interface"


const ViewModeEnum: ViewMode[] = ['year', 'mouth', 'day']

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    @State() currentYear: number = 2021
    @State() currentMonth: number = 2
    @State() viewMode: ViewMode = 'day'


    switchViewMode() {
        const nextIndex = Math.max(ViewModeEnum.indexOf(this.viewMode) - 1, 1)
        this.viewMode = ViewModeEnum[nextIndex]
    }

    handleChooseMouth(chooseMouth: number[]) {
        this.currentYear = chooseMouth[0]
        this.currentMonth = chooseMouth[1]
        this.viewMode = 'day'
    }

    render() {
        return (
            <Host>
                <div class="calendar-header">
                    <div class="calendar-switch activatable" onClick={this.switchViewMode.bind(this)}>
                        {this.viewMode === 'year' ? (<span>{this.currentYear}年</span>) : null}
                        {this.viewMode === 'mouth' ? (<span>{this.currentYear}年</span>) : null}
                        {this.viewMode === 'day' ? (<span>{this.currentYear}年&nbsp;{this.currentMonth}月</span>) : null}
                        <cy-ripple />
                    </div>
                </div>
                <div class="calendar-content">
                    {this.viewMode === "day" ? <cy-calendar-day currentYear={this.currentYear} currentMonth={this.currentMonth} /> : null}
                    {this.viewMode === "mouth" ? <cy-calendar-mouth currentYear={this.currentYear} onChoose={(e) => { this.handleChooseMouth(e.detail) }} /> : null}
                </div>
            </Host >
        );
    }
}