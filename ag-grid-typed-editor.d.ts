import { Component, ICellEditorComp, ICellEditorParams } from 'ag-grid-community';
export declare type InputType = 'number' | 'text' | 'date' | 'datetime-local' | 'email' | 'checkbox' | 'password' | 'range' | 'tel' | 'time' | 'url';
export interface IHtmlAttr {
    type?: InputType;
    attrs?: object;
}
/**
 * useFormatter: used when the cell value needs formatting prior to editing, such as when using reference data and you
 *               want to display text rather than code.
 */
export interface IInputParameterizedCellEditorParams extends ICellEditorParams {
    useFormatter?: boolean;
    inputAttrs?: IHtmlAttr;
}
export declare class InputParameterizedCellEditor extends Component implements ICellEditorComp {
    private static TEMPLATE;
    private highlightAllOnFocus;
    private focusAfterAttached;
    private params?;
    private eInput;
    constructor();
    init(params: IInputParameterizedCellEditorParams): void;
    afterGuiAttached(): void;
    focusIn(): void;
    getValue(): any;
    isPopup(): boolean;
    private getStartValue;
}
