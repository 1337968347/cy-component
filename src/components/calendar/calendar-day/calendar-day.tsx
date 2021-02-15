import { Component, Prop, State, Element, Event, EventEmitter, h, Method, Watch } from '@stencil/core';
import { calendarComponentInterface } from "../../../interface"
import { getRenderDay } from "../utils"

@Component({
    tag: 'cy-calendar-day'
})
export class CalendarMouth implements calendarComponentInterface {
    @Element() el: HTMLElement
    @Prop() chooseYear: number
    @Prop() chooseMonth: number

    @Watch('chooseMonth')
    handleNav() {
        this.calcTransformY()
    }

    @State() renderDate: number[][][] = []
    @State() transLateYArr = []

    @Event() choose: EventEmitter
    activateEl: HTMLElement

    componentWillLoad() {
        this.calcTransformY()
    }

    componentDidLoad() {
        const transLateEl = this.el.querySelector<HTMLElement>('.translateBox')
        transLateEl && (transLateEl.style.transform = `translateY(${this.transLateYArr[1]}px)`)
    }

    /**
     * 计算平移的距离
     */
    calcTransformY() {
        this.transLateYArr = []
        this.renderDate = getRenderDay(this.chooseYear, this.chooseMonth)
        const monthOneDayWeek = {}
        this.renderDate.map((week, index) => {
            week.map((day) => {
                if (day[2] === 1) {
                    monthOneDayWeek[`${day[0]}-${day[1]}`] = index
                }
            })
        })
        const oneRowHeight = this.el.closest('.translate-box').clientWidth / 7
        Object.keys(monthOneDayWeek).map((weekOne) => {
            this.transLateYArr.push(-1 * monthOneDayWeek[weekOne] * oneRowHeight)
        })
        this.transLateYArr = [...this.transLateYArr]
        const transLateEl = this.el.querySelector<HTMLElement>('.translateBox')
        transLateEl && (transLateEl.style.transform = `translateY(${this.transLateYArr[1]}px)`)
    }

    @Method()
    async prevPage() {
        return new Promise<void>((resolve) => {
            const transLateEl = this.el.querySelector<HTMLElement>('.translateBox')
            transLateEl.classList.add('translateAni')
            transLateEl.style.transform = `translateY(${this.transLateYArr[0]}px)`
            setTimeout(() => {
                transLateEl.style.transform = ""
                transLateEl.classList.remove('translateAni')
                resolve()
            }, 200)
        })
    }

    @Method()
    async nextPage() {
        return new Promise<void>((resolve) => {
            const transLateEl = this.el.querySelector<HTMLElement>('.translateBox')
            transLateEl.classList.add('translateAni')
            transLateEl.style.transform = `translateY(${this.transLateYArr[2]}px)`
            setTimeout(() => {
                transLateEl.style.transform = ""
                transLateEl.classList.remove('translateAni')
                resolve()
            }, 200)
        })
    }

    private isNow(day: number[]) {
        const dateNow = new Date()
        return day[0] === dateNow.getUTCFullYear() &&
            day[1] === dateNow.getUTCMonth() + 1 &&
            day[2] === dateNow.getUTCDate()
    }

    handleClick(e: any, day: number[]) {
        let targetEl = e.target.closest('.item')
        if (!targetEl) {
            return
        }
        if (this.activateEl) {
            this.activateEl.classList.remove('choosed')
        }
        this.activateEl = targetEl
        this.activateEl.classList.add('choosed')
        this.choose.emit([...day])
    }

    render() {
        return (
            <div class="table">
                <div class="tr">
                    {['一', '二', '三', '四', '五', '六', '日'].map((tag) => <div class="td">{tag}</div>)}
                </div>
                <div class="tbody">
                    <div class="translateBox">
                        {this.renderDate.map((week) =>
                            <div class="tr">
                                {week.map((day) =>
                                    <div class="td">
                                        <div onClick={(e) => { this.handleClick(e, day) }}
                                            class={{
                                                'item': true,
                                                'obvious': day[1] === this.chooseMonth,
                                                'now': this.isNow(day)
                                            }}>
                                            {day[2]}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        );
    }
}