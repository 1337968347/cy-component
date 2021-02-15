import { Component, State, Host, h } from '@stencil/core';
import { ViewMode } from "../../interface"
import { getDecadeRange } from "./utils"

const ViewModeEnum: ViewMode[] = ['year', 'mouth', 'day']

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    // 下标 0： 十年  1： 年  2：月份
    @State() showDate: string[] = []
    @State() viewMode: ViewMode = 'day'

    componentWillLoad() {
        const nowDate = new Date()
        const decadeRange = getDecadeRange(nowDate.getUTCFullYear())
        this.showDate = [`${decadeRange[0]} - ${decadeRange[1]}`, nowDate.getUTCFullYear() + "", nowDate.getUTCMonth() + 1 + ""]
    }

    /**
     * 点击日历左上角
     */
    switchViewMode() {
        const nextIndex = Math.max(ViewModeEnum.indexOf(this.viewMode) - 1, 0)
        this.viewMode = ViewModeEnum[nextIndex]
        console.log(this.showDate)
        if (this.showDate.length > 1) {
            this.showDate.pop()
        }
    }

    handleChooseMouth(chooseMouth: number[]) {
        this.showDate.pop()
        this.showDate.push(chooseMouth[0] + "")
        this.showDate.push(chooseMouth[1] + "")
        this.viewMode = 'day'
    }

    handleChooseYear(chooseYear: number) {
        this.showDate.pop()
        const decadeRange = getDecadeRange(chooseYear)
        this.showDate = [`${decadeRange[0]} - ${decadeRange[1]}`, chooseYear + ""]
        this.viewMode = 'mouth'
    }

    render() {
        return (
            <Host>
                <div class="calendar-header">
                    <div class="calendar-switch activatable" onClick={this.switchViewMode.bind(this)}>
                        {this.showDate[0] && !this.showDate[1] ? (<span>{this.showDate[0]}</span>) : null}
                        {this.showDate[1] ? (<span>{this.showDate[1]}年</span>) : null}
                        {this.showDate[2] ? (<span>{this.showDate[2]}月</span>) : null}
                    </div>

                    <div class="page-nav"></div>
                </div>
                <div class="calendar-content">
                    <div class="translate-box">
                        {this.viewMode === "day" ? <cy-calendar-day chooseYear={parseInt(this.showDate[1])} chooseMonth={parseInt(this.showDate[2])} /> : null}
                        {this.viewMode === "mouth" ? <cy-calendar-mouth chooseYear={parseInt(this.showDate[1])} onChoose={(e) => { this.handleChooseMouth(e.detail) }} /> : null}
                        {this.viewMode === "year" ? <cy-calendar-year chooseYear={parseInt(this.showDate[0].split('-')[0])} onChoose={(e) => { this.handleChooseYear(e.detail) }} /> : null}
                    </div>
                </div>
            </Host >
        );
    }
}