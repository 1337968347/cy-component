import { Component, Element, State, Method, Host, h } from '@stencil/core';
import { ViewMode } from "../../interface"
import { getDecadeRange, getMouthOffset } from "./utils"

const ViewModeEnum: ViewMode[] = ['year', 'mouth', 'day']

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    @Element() el: HTMLElement;
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


    @Method()
    async prevPage() {
        const el = this.el.shadowRoot.querySelector('.translate-box').firstChild as any
        await el.prevPage()
        if (this.viewMode === "day") {
            const [prevMouthYear, prevMouthMouth] = getMouthOffset(parseInt(this.showDate[1]), parseInt(this.showDate[2]), -1)
            this.showDate.pop()
            this.showDate.pop()
            this.showDate.push(prevMouthYear + "")
            this.showDate.push(prevMouthMouth + "")
            this.showDate = [...this.showDate]
        }
    }

    @Method()
    async nextPage() {
        const el = this.el.shadowRoot.querySelector('.translate-box').firstChild as any
        await el.nextPage()
        if (this.viewMode === "day") {
            const [nextMouthYear, nextMouthMouth] = getMouthOffset(parseInt(this.showDate[1]), parseInt(this.showDate[2]), 1)
            this.showDate.pop()
            this.showDate.pop()
            this.showDate.push(nextMouthYear + "")
            this.showDate.push(nextMouthMouth + "")
            this.showDate = [...this.showDate]
        }
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