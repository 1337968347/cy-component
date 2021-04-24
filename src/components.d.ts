/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ActionSheetButton, CalendarDate, CalendarViewMode } from "./interface";
import { DataParse, ViewPortRange } from "./components/virtual-table/interface";
export namespace Components {
    interface CyActionSheet {
        "buttons": ActionSheetButton[];
        "color": string;
        "cssClass": string;
        "dismiss": () => Promise<void>;
        "header": string;
        "overlayIndex": number;
        "present": () => Promise<void>;
    }
    interface CyApp {
    }
    interface CyBackdrop {
        "stopPropagation": boolean;
        "tappable": boolean;
    }
    interface CyButton {
        "color": string;
        "expend": 'default' | 'full' | 'block';
    }
    interface CyCalendar {
        "change": (modifyCalendarDate: CalendarDate, viewMode?: CalendarViewMode) => Promise<void>;
        "color": string;
        "nextPage": () => Promise<void>;
        "prevPage": () => Promise<void>;
    }
    interface CyCalendarDay {
        "calendarDate": CalendarDate;
        "nextPage": () => Promise<void>;
        "parent": HTMLCyCalendarElement;
        "prevPage": () => Promise<void>;
    }
    interface CyCalendarMonth {
        "calendarDate": CalendarDate;
        "nextPage": () => Promise<void>;
        "parent": HTMLCyCalendarElement;
        "prevPage": () => Promise<void>;
    }
    interface CyCalendarYear {
        "calendarDate": CalendarDate;
        "nextPage": () => Promise<void>;
        "parent": HTMLCyCalendarElement;
        "prevPage": () => Promise<void>;
    }
    interface CyCheckbox {
        "checked": boolean;
        "color": string;
    }
    interface CyContent {
    }
    interface CyHeader {
    }
    interface CyIcon {
        "color": string;
        "name": string;
    }
    interface CyItem {
        "button": boolean;
        "color": string;
        "line": boolean;
    }
    interface CyMenu {
        "close": () => Promise<void>;
        "open": () => Promise<void>;
        "side": 'left' | 'right';
        "toggle": () => Promise<void>;
    }
    interface CyMenuButton {
    }
    interface CyNav {
        "pop": () => Promise<void>;
        "push": (componentName: string) => Promise<void>;
    }
    interface CyRefresh {
    }
    interface CyRipple {
        "type": 'unbounded' | 'bounded';
    }
    interface CySegment {
        "color": string;
        "scrollable": boolean;
        "value": any;
    }
    interface CySegmentButton {
        "update": () => Promise<void>;
        "value": any;
    }
    interface CySpinner {
        "color": string;
    }
    interface CyTime {
        "color": string;
    }
    interface CyToggle {
        "checked": boolean;
        "color": string;
        "gestureEnable": boolean;
    }
    interface CyViewportScroll {
        "contentHeight": number;
        "contentWidth": number;
        "setScroll": (scrollTop: number) => Promise<void>;
    }
    interface CyVirtualData {
        "viewPortRange": ViewPortRange;
        "vituralParse": DataParse;
    }
    interface CyVirtualTable {
        "columns": any[];
        "source": any[];
    }
    interface NavPageone {
    }
    interface NavPagetwo {
    }
    interface PageCalendar {
    }
    interface PageDatascreen {
    }
    interface PageNav {
    }
    interface PageRoot {
    }
    interface PageSetting {
    }
    interface PageVirtual {
    }
}
declare global {
    interface HTMLCyActionSheetElement extends Components.CyActionSheet, HTMLStencilElement {
    }
    var HTMLCyActionSheetElement: {
        prototype: HTMLCyActionSheetElement;
        new (): HTMLCyActionSheetElement;
    };
    interface HTMLCyAppElement extends Components.CyApp, HTMLStencilElement {
    }
    var HTMLCyAppElement: {
        prototype: HTMLCyAppElement;
        new (): HTMLCyAppElement;
    };
    interface HTMLCyBackdropElement extends Components.CyBackdrop, HTMLStencilElement {
    }
    var HTMLCyBackdropElement: {
        prototype: HTMLCyBackdropElement;
        new (): HTMLCyBackdropElement;
    };
    interface HTMLCyButtonElement extends Components.CyButton, HTMLStencilElement {
    }
    var HTMLCyButtonElement: {
        prototype: HTMLCyButtonElement;
        new (): HTMLCyButtonElement;
    };
    interface HTMLCyCalendarElement extends Components.CyCalendar, HTMLStencilElement {
    }
    var HTMLCyCalendarElement: {
        prototype: HTMLCyCalendarElement;
        new (): HTMLCyCalendarElement;
    };
    interface HTMLCyCalendarDayElement extends Components.CyCalendarDay, HTMLStencilElement {
    }
    var HTMLCyCalendarDayElement: {
        prototype: HTMLCyCalendarDayElement;
        new (): HTMLCyCalendarDayElement;
    };
    interface HTMLCyCalendarMonthElement extends Components.CyCalendarMonth, HTMLStencilElement {
    }
    var HTMLCyCalendarMonthElement: {
        prototype: HTMLCyCalendarMonthElement;
        new (): HTMLCyCalendarMonthElement;
    };
    interface HTMLCyCalendarYearElement extends Components.CyCalendarYear, HTMLStencilElement {
    }
    var HTMLCyCalendarYearElement: {
        prototype: HTMLCyCalendarYearElement;
        new (): HTMLCyCalendarYearElement;
    };
    interface HTMLCyCheckboxElement extends Components.CyCheckbox, HTMLStencilElement {
    }
    var HTMLCyCheckboxElement: {
        prototype: HTMLCyCheckboxElement;
        new (): HTMLCyCheckboxElement;
    };
    interface HTMLCyContentElement extends Components.CyContent, HTMLStencilElement {
    }
    var HTMLCyContentElement: {
        prototype: HTMLCyContentElement;
        new (): HTMLCyContentElement;
    };
    interface HTMLCyHeaderElement extends Components.CyHeader, HTMLStencilElement {
    }
    var HTMLCyHeaderElement: {
        prototype: HTMLCyHeaderElement;
        new (): HTMLCyHeaderElement;
    };
    interface HTMLCyIconElement extends Components.CyIcon, HTMLStencilElement {
    }
    var HTMLCyIconElement: {
        prototype: HTMLCyIconElement;
        new (): HTMLCyIconElement;
    };
    interface HTMLCyItemElement extends Components.CyItem, HTMLStencilElement {
    }
    var HTMLCyItemElement: {
        prototype: HTMLCyItemElement;
        new (): HTMLCyItemElement;
    };
    interface HTMLCyMenuElement extends Components.CyMenu, HTMLStencilElement {
    }
    var HTMLCyMenuElement: {
        prototype: HTMLCyMenuElement;
        new (): HTMLCyMenuElement;
    };
    interface HTMLCyMenuButtonElement extends Components.CyMenuButton, HTMLStencilElement {
    }
    var HTMLCyMenuButtonElement: {
        prototype: HTMLCyMenuButtonElement;
        new (): HTMLCyMenuButtonElement;
    };
    interface HTMLCyNavElement extends Components.CyNav, HTMLStencilElement {
    }
    var HTMLCyNavElement: {
        prototype: HTMLCyNavElement;
        new (): HTMLCyNavElement;
    };
    interface HTMLCyRefreshElement extends Components.CyRefresh, HTMLStencilElement {
    }
    var HTMLCyRefreshElement: {
        prototype: HTMLCyRefreshElement;
        new (): HTMLCyRefreshElement;
    };
    interface HTMLCyRippleElement extends Components.CyRipple, HTMLStencilElement {
    }
    var HTMLCyRippleElement: {
        prototype: HTMLCyRippleElement;
        new (): HTMLCyRippleElement;
    };
    interface HTMLCySegmentElement extends Components.CySegment, HTMLStencilElement {
    }
    var HTMLCySegmentElement: {
        prototype: HTMLCySegmentElement;
        new (): HTMLCySegmentElement;
    };
    interface HTMLCySegmentButtonElement extends Components.CySegmentButton, HTMLStencilElement {
    }
    var HTMLCySegmentButtonElement: {
        prototype: HTMLCySegmentButtonElement;
        new (): HTMLCySegmentButtonElement;
    };
    interface HTMLCySpinnerElement extends Components.CySpinner, HTMLStencilElement {
    }
    var HTMLCySpinnerElement: {
        prototype: HTMLCySpinnerElement;
        new (): HTMLCySpinnerElement;
    };
    interface HTMLCyTimeElement extends Components.CyTime, HTMLStencilElement {
    }
    var HTMLCyTimeElement: {
        prototype: HTMLCyTimeElement;
        new (): HTMLCyTimeElement;
    };
    interface HTMLCyToggleElement extends Components.CyToggle, HTMLStencilElement {
    }
    var HTMLCyToggleElement: {
        prototype: HTMLCyToggleElement;
        new (): HTMLCyToggleElement;
    };
    interface HTMLCyViewportScrollElement extends Components.CyViewportScroll, HTMLStencilElement {
    }
    var HTMLCyViewportScrollElement: {
        prototype: HTMLCyViewportScrollElement;
        new (): HTMLCyViewportScrollElement;
    };
    interface HTMLCyVirtualDataElement extends Components.CyVirtualData, HTMLStencilElement {
    }
    var HTMLCyVirtualDataElement: {
        prototype: HTMLCyVirtualDataElement;
        new (): HTMLCyVirtualDataElement;
    };
    interface HTMLCyVirtualTableElement extends Components.CyVirtualTable, HTMLStencilElement {
    }
    var HTMLCyVirtualTableElement: {
        prototype: HTMLCyVirtualTableElement;
        new (): HTMLCyVirtualTableElement;
    };
    interface HTMLNavPageoneElement extends Components.NavPageone, HTMLStencilElement {
    }
    var HTMLNavPageoneElement: {
        prototype: HTMLNavPageoneElement;
        new (): HTMLNavPageoneElement;
    };
    interface HTMLNavPagetwoElement extends Components.NavPagetwo, HTMLStencilElement {
    }
    var HTMLNavPagetwoElement: {
        prototype: HTMLNavPagetwoElement;
        new (): HTMLNavPagetwoElement;
    };
    interface HTMLPageCalendarElement extends Components.PageCalendar, HTMLStencilElement {
    }
    var HTMLPageCalendarElement: {
        prototype: HTMLPageCalendarElement;
        new (): HTMLPageCalendarElement;
    };
    interface HTMLPageDatascreenElement extends Components.PageDatascreen, HTMLStencilElement {
    }
    var HTMLPageDatascreenElement: {
        prototype: HTMLPageDatascreenElement;
        new (): HTMLPageDatascreenElement;
    };
    interface HTMLPageNavElement extends Components.PageNav, HTMLStencilElement {
    }
    var HTMLPageNavElement: {
        prototype: HTMLPageNavElement;
        new (): HTMLPageNavElement;
    };
    interface HTMLPageRootElement extends Components.PageRoot, HTMLStencilElement {
    }
    var HTMLPageRootElement: {
        prototype: HTMLPageRootElement;
        new (): HTMLPageRootElement;
    };
    interface HTMLPageSettingElement extends Components.PageSetting, HTMLStencilElement {
    }
    var HTMLPageSettingElement: {
        prototype: HTMLPageSettingElement;
        new (): HTMLPageSettingElement;
    };
    interface HTMLPageVirtualElement extends Components.PageVirtual, HTMLStencilElement {
    }
    var HTMLPageVirtualElement: {
        prototype: HTMLPageVirtualElement;
        new (): HTMLPageVirtualElement;
    };
    interface HTMLElementTagNameMap {
        "cy-action-sheet": HTMLCyActionSheetElement;
        "cy-app": HTMLCyAppElement;
        "cy-backdrop": HTMLCyBackdropElement;
        "cy-button": HTMLCyButtonElement;
        "cy-calendar": HTMLCyCalendarElement;
        "cy-calendar-day": HTMLCyCalendarDayElement;
        "cy-calendar-month": HTMLCyCalendarMonthElement;
        "cy-calendar-year": HTMLCyCalendarYearElement;
        "cy-checkbox": HTMLCyCheckboxElement;
        "cy-content": HTMLCyContentElement;
        "cy-header": HTMLCyHeaderElement;
        "cy-icon": HTMLCyIconElement;
        "cy-item": HTMLCyItemElement;
        "cy-menu": HTMLCyMenuElement;
        "cy-menu-button": HTMLCyMenuButtonElement;
        "cy-nav": HTMLCyNavElement;
        "cy-refresh": HTMLCyRefreshElement;
        "cy-ripple": HTMLCyRippleElement;
        "cy-segment": HTMLCySegmentElement;
        "cy-segment-button": HTMLCySegmentButtonElement;
        "cy-spinner": HTMLCySpinnerElement;
        "cy-time": HTMLCyTimeElement;
        "cy-toggle": HTMLCyToggleElement;
        "cy-viewport-scroll": HTMLCyViewportScrollElement;
        "cy-virtual-data": HTMLCyVirtualDataElement;
        "cy-virtual-table": HTMLCyVirtualTableElement;
        "nav-pageone": HTMLNavPageoneElement;
        "nav-pagetwo": HTMLNavPagetwoElement;
        "page-calendar": HTMLPageCalendarElement;
        "page-datascreen": HTMLPageDatascreenElement;
        "page-nav": HTMLPageNavElement;
        "page-root": HTMLPageRootElement;
        "page-setting": HTMLPageSettingElement;
        "page-virtual": HTMLPageVirtualElement;
    }
}
declare namespace LocalJSX {
    interface CyActionSheet {
        "buttons"?: ActionSheetButton[];
        "color"?: string;
        "cssClass"?: string;
        "header"?: string;
        "overlayIndex"?: number;
    }
    interface CyApp {
    }
    interface CyBackdrop {
        "onBackDrop"?: (event: CustomEvent<any>) => void;
        "stopPropagation"?: boolean;
        "tappable"?: boolean;
    }
    interface CyButton {
        "color"?: string;
        "expend"?: 'default' | 'full' | 'block';
    }
    interface CyCalendar {
        "color"?: string;
        "onChoose"?: (event: CustomEvent<any>) => void;
    }
    interface CyCalendarDay {
        "calendarDate"?: CalendarDate;
        "parent"?: HTMLCyCalendarElement;
    }
    interface CyCalendarMonth {
        "calendarDate"?: CalendarDate;
        "parent"?: HTMLCyCalendarElement;
    }
    interface CyCalendarYear {
        "calendarDate"?: CalendarDate;
        "parent"?: HTMLCyCalendarElement;
    }
    interface CyCheckbox {
        "checked"?: boolean;
        "color"?: string;
    }
    interface CyContent {
    }
    interface CyHeader {
    }
    interface CyIcon {
        "color"?: string;
        "name"?: string;
    }
    interface CyItem {
        "button"?: boolean;
        "color"?: string;
        "line"?: boolean;
    }
    interface CyMenu {
        "side"?: 'left' | 'right';
    }
    interface CyMenuButton {
    }
    interface CyNav {
    }
    interface CyRefresh {
    }
    interface CyRipple {
        "type"?: 'unbounded' | 'bounded';
    }
    interface CySegment {
        "color"?: string;
        "onCyChange"?: (event: CustomEvent<any>) => void;
        "scrollable"?: boolean;
        "value"?: any;
    }
    interface CySegmentButton {
        "value"?: any;
    }
    interface CySpinner {
        "color"?: string;
    }
    interface CyTime {
        "color"?: string;
    }
    interface CyToggle {
        "checked"?: boolean;
        "color"?: string;
        "gestureEnable"?: boolean;
        "onCyChange"?: (event: CustomEvent<any>) => void;
    }
    interface CyViewportScroll {
        "contentHeight"?: number;
        "contentWidth"?: number;
        "onScrollChange"?: (event: CustomEvent<any>) => void;
    }
    interface CyVirtualData {
        "viewPortRange"?: ViewPortRange;
        "vituralParse"?: DataParse;
    }
    interface CyVirtualTable {
        "columns"?: any[];
        "source"?: any[];
    }
    interface NavPageone {
    }
    interface NavPagetwo {
    }
    interface PageCalendar {
    }
    interface PageDatascreen {
    }
    interface PageNav {
    }
    interface PageRoot {
    }
    interface PageSetting {
    }
    interface PageVirtual {
    }
    interface IntrinsicElements {
        "cy-action-sheet": CyActionSheet;
        "cy-app": CyApp;
        "cy-backdrop": CyBackdrop;
        "cy-button": CyButton;
        "cy-calendar": CyCalendar;
        "cy-calendar-day": CyCalendarDay;
        "cy-calendar-month": CyCalendarMonth;
        "cy-calendar-year": CyCalendarYear;
        "cy-checkbox": CyCheckbox;
        "cy-content": CyContent;
        "cy-header": CyHeader;
        "cy-icon": CyIcon;
        "cy-item": CyItem;
        "cy-menu": CyMenu;
        "cy-menu-button": CyMenuButton;
        "cy-nav": CyNav;
        "cy-refresh": CyRefresh;
        "cy-ripple": CyRipple;
        "cy-segment": CySegment;
        "cy-segment-button": CySegmentButton;
        "cy-spinner": CySpinner;
        "cy-time": CyTime;
        "cy-toggle": CyToggle;
        "cy-viewport-scroll": CyViewportScroll;
        "cy-virtual-data": CyVirtualData;
        "cy-virtual-table": CyVirtualTable;
        "nav-pageone": NavPageone;
        "nav-pagetwo": NavPagetwo;
        "page-calendar": PageCalendar;
        "page-datascreen": PageDatascreen;
        "page-nav": PageNav;
        "page-root": PageRoot;
        "page-setting": PageSetting;
        "page-virtual": PageVirtual;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cy-action-sheet": LocalJSX.CyActionSheet & JSXBase.HTMLAttributes<HTMLCyActionSheetElement>;
            "cy-app": LocalJSX.CyApp & JSXBase.HTMLAttributes<HTMLCyAppElement>;
            "cy-backdrop": LocalJSX.CyBackdrop & JSXBase.HTMLAttributes<HTMLCyBackdropElement>;
            "cy-button": LocalJSX.CyButton & JSXBase.HTMLAttributes<HTMLCyButtonElement>;
            "cy-calendar": LocalJSX.CyCalendar & JSXBase.HTMLAttributes<HTMLCyCalendarElement>;
            "cy-calendar-day": LocalJSX.CyCalendarDay & JSXBase.HTMLAttributes<HTMLCyCalendarDayElement>;
            "cy-calendar-month": LocalJSX.CyCalendarMonth & JSXBase.HTMLAttributes<HTMLCyCalendarMonthElement>;
            "cy-calendar-year": LocalJSX.CyCalendarYear & JSXBase.HTMLAttributes<HTMLCyCalendarYearElement>;
            "cy-checkbox": LocalJSX.CyCheckbox & JSXBase.HTMLAttributes<HTMLCyCheckboxElement>;
            "cy-content": LocalJSX.CyContent & JSXBase.HTMLAttributes<HTMLCyContentElement>;
            "cy-header": LocalJSX.CyHeader & JSXBase.HTMLAttributes<HTMLCyHeaderElement>;
            "cy-icon": LocalJSX.CyIcon & JSXBase.HTMLAttributes<HTMLCyIconElement>;
            "cy-item": LocalJSX.CyItem & JSXBase.HTMLAttributes<HTMLCyItemElement>;
            "cy-menu": LocalJSX.CyMenu & JSXBase.HTMLAttributes<HTMLCyMenuElement>;
            "cy-menu-button": LocalJSX.CyMenuButton & JSXBase.HTMLAttributes<HTMLCyMenuButtonElement>;
            "cy-nav": LocalJSX.CyNav & JSXBase.HTMLAttributes<HTMLCyNavElement>;
            "cy-refresh": LocalJSX.CyRefresh & JSXBase.HTMLAttributes<HTMLCyRefreshElement>;
            "cy-ripple": LocalJSX.CyRipple & JSXBase.HTMLAttributes<HTMLCyRippleElement>;
            "cy-segment": LocalJSX.CySegment & JSXBase.HTMLAttributes<HTMLCySegmentElement>;
            "cy-segment-button": LocalJSX.CySegmentButton & JSXBase.HTMLAttributes<HTMLCySegmentButtonElement>;
            "cy-spinner": LocalJSX.CySpinner & JSXBase.HTMLAttributes<HTMLCySpinnerElement>;
            "cy-time": LocalJSX.CyTime & JSXBase.HTMLAttributes<HTMLCyTimeElement>;
            "cy-toggle": LocalJSX.CyToggle & JSXBase.HTMLAttributes<HTMLCyToggleElement>;
            "cy-viewport-scroll": LocalJSX.CyViewportScroll & JSXBase.HTMLAttributes<HTMLCyViewportScrollElement>;
            "cy-virtual-data": LocalJSX.CyVirtualData & JSXBase.HTMLAttributes<HTMLCyVirtualDataElement>;
            "cy-virtual-table": LocalJSX.CyVirtualTable & JSXBase.HTMLAttributes<HTMLCyVirtualTableElement>;
            "nav-pageone": LocalJSX.NavPageone & JSXBase.HTMLAttributes<HTMLNavPageoneElement>;
            "nav-pagetwo": LocalJSX.NavPagetwo & JSXBase.HTMLAttributes<HTMLNavPagetwoElement>;
            "page-calendar": LocalJSX.PageCalendar & JSXBase.HTMLAttributes<HTMLPageCalendarElement>;
            "page-datascreen": LocalJSX.PageDatascreen & JSXBase.HTMLAttributes<HTMLPageDatascreenElement>;
            "page-nav": LocalJSX.PageNav & JSXBase.HTMLAttributes<HTMLPageNavElement>;
            "page-root": LocalJSX.PageRoot & JSXBase.HTMLAttributes<HTMLPageRootElement>;
            "page-setting": LocalJSX.PageSetting & JSXBase.HTMLAttributes<HTMLPageSettingElement>;
            "page-virtual": LocalJSX.PageVirtual & JSXBase.HTMLAttributes<HTMLPageVirtualElement>;
        }
    }
}
