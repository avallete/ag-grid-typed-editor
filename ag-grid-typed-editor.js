var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { _, Component, Constants } from 'ag-grid-community';
var InputParameterizedCellEditor = /** @class */ (function (_super) {
    __extends(InputParameterizedCellEditor, _super);
    function InputParameterizedCellEditor() {
        var _this = _super.call(this, InputParameterizedCellEditor.TEMPLATE) || this;
        _this.highlightAllOnFocus = false;
        _this.focusAfterAttached = false;
        _this.eInput = _this.getGui().querySelector('input');
        return _this;
    }
    InputParameterizedCellEditor.prototype.init = function (params) {
        this.params = params;
        var eInput = this.eInput;
        var startValue;
        // cellStartedEdit is only false if we are doing fullRow editing
        if (params.cellStartedEdit) {
            this.focusAfterAttached = true;
            var keyPressBackspaceOrDelete = params.keyPress === Constants.KEY_BACKSPACE
                || params.keyPress === Constants.KEY_DELETE;
            if (keyPressBackspaceOrDelete) {
                startValue = '';
            }
            else if (params.charPress) {
                startValue = params.charPress;
            }
            else {
                startValue = this.getStartValue(params);
                if (params.keyPress !== Constants.KEY_F2) {
                    this.highlightAllOnFocus = true;
                }
            }
        }
        else {
            this.focusAfterAttached = false;
            startValue = this.getStartValue(params);
        }
        if (_.exists(startValue)) {
            eInput.value = startValue;
        }
        this.addDestroyableEventListener(eInput, 'keydown', function (event) {
            var keyCode = event.keyCode;
            var isNavigationKey = keyCode === Constants.KEY_LEFT
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
                var pageUp = event.keyCode === Constants.KEY_PAGE_UP;
                var pageDown = event.keyCode === Constants.KEY_PAGE_DOWN;
                if (pageUp || pageDown) {
                    event.preventDefault();
                }
            }
        });
        if (params.inputAttrs) {
            if (params.inputAttrs.attrs) {
                for (var key in params.inputAttrs.attrs) {
                    if (params.inputAttrs.attrs.hasOwnProperty(key)) {
                        this.eInput.setAttribute(key, params.inputAttrs.attrs[key]);
                    }
                }
            }
            if (params.inputAttrs.type) {
                this.eInput.setAttribute('type', params.inputAttrs.type);
            }
        }
    };
    InputParameterizedCellEditor.prototype.afterGuiAttached = function () {
        if (!this.focusAfterAttached) {
            return;
        }
        var eInput = this.eInput;
        eInput.focus();
        if (this.highlightAllOnFocus) {
            eInput.select();
        }
    };
    // gets called when tabbing trough cells and in full row edit mode
    InputParameterizedCellEditor.prototype.focusIn = function () {
        var eInput = this.eInput;
        eInput.focus();
    };
    InputParameterizedCellEditor.prototype.getValue = function () {
        var eInput = this.eInput;
        if (this.params) {
            return this.params.parseValue(eInput.value);
        }
    };
    InputParameterizedCellEditor.prototype.isPopup = function () {
        return false;
    };
    InputParameterizedCellEditor.prototype.getStartValue = function (params) {
        var formatValue = params.useFormatter || params.column.getColDef().refData;
        return formatValue ? params.formatValue(params.value) : params.value;
    };
    InputParameterizedCellEditor.TEMPLATE = '<div class="ag-input-text-wrapper"><input class="ag-cell-edit-input" type="text"/></div>';
    return InputParameterizedCellEditor;
}(Component));
export { InputParameterizedCellEditor };
//# sourceMappingURL=ag-grid-typed-editor.js.map