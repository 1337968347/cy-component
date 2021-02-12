export interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
}
export * from './components/action-sheet/action-sheet-interface';
export * from './utils/animation/animation-interface';
export * from './utils/gesture';
