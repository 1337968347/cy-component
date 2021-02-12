import { Component, Prop, Event, EventEmitter, Method, h } from '@stencil/core';
import { calendarComponentInterface } from "../../../interface"
import { getRenderMouth } from "../utils"

@Component({
    tag: 'cy-calendar-mouth',
    styleUrl: 'calendar-mouth.scss'
})
export class CalendarMouth implements calendarComponentInterface {
    @Prop() currentYear: number
    @Event() choose: EventEmitter

    @Method()
    async prevPage() {

    }

    @Method()
    async nextPage() {

    }

    handleClick(chooseMouth: number[]) {
        this.choose.emit([...chooseMouth])
    }

    render() {
        const renderMouths = getRenderMouth(this.currentYear)
        return (
            <table>
                <tbody>
                    {renderMouths.map((mouths) =>
                        <tr>
                            {mouths.map((mouth) =>
                                <td>
                                    <div
                                        onClick={() => { this.handleClick(mouth) }}
                                        class={{
                                            'item': true,
                                            'activatable': true,
                                            'obvious': mouth[0] === this.currentYear,
                                        }}>
                                        {mouth[1]}
                                        <cy-ripple />
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}