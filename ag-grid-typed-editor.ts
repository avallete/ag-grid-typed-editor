import {_, Component, Constants, ICellEditorComp, ICellEditorParams} from 'ag-grid-community';

export type InputType =
    'number'
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'color'
    | 'range'
    | 'week'
    | 'time';

export interface IHtmlAttr {
    type?: InputType,
    attrs?: object,
}

/**
 * useFormatter: used when the cell value needs formatting prior to editing, such as when using reference data and you
 *               want to display text rather than code.
 */
export interface IInputParameterizedCellEditorParams extends ICellEditorParams {
    useFormatter?: boolean;
    inputAttrs?: IHtmlAttr;
}

export class InputParameterizedCellEditor extends Component implements ICellEditorComp {

    private static TEMPLATE = '<div class="ag-input-text-wrapper"><input class="ag-cell-edit-input" type="text"/></div>';

    private highlightAllOnFocus: boolean = false;
    private focusAfterAttached: boolean = false;
    private params?: ICellEditorParams;
    private eInput: HTMLInputElement;

    constructor() {
        super(InputParameterizedCellEditor.TEMPLATE);
        this.eInput = this.getGui().querySelector('input') as HTMLInputElement;
    }

    public init(params: IInputParameterizedCellEditorParams): void {

        this.params = params;

        const eInput = this.eInput;
        let startValue: string;

        // cellStartedEdit is only false if we are doing fullRow editing
        if (params.cellStartedEdit) {
            this.focusAfterAttached = true;

            const keyPressBackspaceOrDelete =
                params.keyPress === Constants.KEY_BACKSPACE
                || params.keyPress === Constants.KEY_DELETE;

            if (keyPressBackspaceOrDelete) {
                startValue = '';
            } else if (params.charPress) {
                startValue = params.charPress;
            } else {
                startValue = this.getStartValue(params);
                if (params.keyPress !== Constants.KEY_F2) {
                    this.highlightAllOnFocus = true;
                }
            }

        } else {
            this.focusAfterAttached = false;
            startValue = this.getStartValue(params);
        }

        if (_.exists(startValue)) {
            eInput.value = startValue;
        }

        this.addDestroyableEventListener(eInput, 'keydown', (event: KeyboardEvent) => {
            const keyCode = event.keyCode;
            const isNavigationKey = keyCode === Constants.KEY_LEFT
                || keyCode === Constants.KEY_RIGHT
                || keyCode === Constants.KEY_UP
                || keyCode === Constants.KEY_DOWN
                || keyCode === Constants.KEY_PAGE_DOWN
                || keyCode === Constants.KEY_PAGE_UP
                || keyCode === Constants.KEY_PAGE_HOME
                || keyCode === Constants.KEY_PAGE_END;
            if (isNavigationKey) {
                // this stops the grid from executing keyboard navigation
                event.stopPropagation();

                // this stops the browser from scrolling up / down
                const pageUp = event.keyCode === Constants.KEY_PAGE_UP;
                const pageDown = event.keyCode === Constants.KEY_PAGE_DOWN;
                if (pageUp || pageDown) {
                    event.preventDefault();
                }
            }
        });
        if (params.inputAttrs) {
            if (params.inputAttrs.attrs) {
                for (const key in params.inputAttrs.attrs) {
                    if (params.inputAttrs.attrs.hasOwnProperty(key)) {
                        this.eInput.setAttribute(key, (params.inputAttrs.attrs as any)[key]);
                    }
                }
            }
            if (params.inputAttrs.type) {
                this.eInput.setAttribute('type', params.inputAttrs.type)
            }
        }
    }

    public afterGuiAttached(): void {
        if (!this.focusAfterAttached) {
            return;
        }

        const eInput = this.eInput;
        eInput.focus();
        if (this.highlightAllOnFocus) {
            eInput.select();
        }
    }

    // gets called when tabbing trough cells and in full row edit mode
    public focusIn(): void {
        const eInput = this.eInput;
        eInput.focus();
    }

    public getValue(): any {
        const eInput = this.eInput;
        if (this.params) {
            return this.params.parseValue(eInput.value);
        }
    }

    public isPopup() {
        return false;
    }

    private getStartValue(params: IInputParameterizedCellEditorParams) {
        const formatValue = params.useFormatter || params.column.getColDef().refData;
        return formatValue ? params.formatValue(params.value) : params.value;
    }
}
