import { EventEmitter, ComponentInterface } from "@stencil/core"

export interface calendarComponentInterface extends ComponentInterface {
    nextPage(): Promise<void>
    prevPage(): Promise<void>
    choose: EventEmitter<any>
}

export interface CalendarDate {
    decade?: number[];
    year?: number;
    month?: number;
    day?: number
}

export declare type ViewMode = 'decade' | 'year' | "month" 