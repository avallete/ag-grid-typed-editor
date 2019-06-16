// Import stylesheets
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {InputParameterizedCellEditor} from './ag-grid-typed-editor';
import {Grid} from 'ag-grid-community';

const rowDatas = [
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
    {number: 0, text: 'text', date: '2018-07-22', datetimelocal: '2018-06-12T19:30',  month: '2018-01', color: '#e66465', range: 10, week: '2018-W26', time: '13:30' },
];
const columnDefs = [
    {
        headerName: "number",
        field: "number",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'number',
                attrs: {
                }
            }
        },
        editable: true,
    },
    {
        headerName: "text",
        field: "text",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'text',
                attrs: {
                }
            }
        },
        editable: true,
    },
    {
        headerName: "date",
        field: "date",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'date',
                attrs: {
                    min: '2018-01-01',
                    max: '2018-12-31',
                }
            }
        },
        editable: true,
    },
    {
        headerName: "datetime-local",
        field: "datetimelocal",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'datetime-local',
                attrs: {
                }
            }
        },
        editable: true,
    },
    {
        headerName: "month",
        field: "month",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'month',
                attrs: {
                }
            }
        },
        editable: true,
    },
    {
        headerName: "color",
        field: "color",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'color',
                attrs: {
                }
            }
        },
        editable: true,
    },
    {
        headerName: "range",
        field: "range",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'range',
                attrs: {
                    min: 0,
                    max: 42,
                }
            }
        },
        editable: true,
    },
    {
        headerName: "week",
        field: "week",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'week',
            }
        },
        editable: true,
    },
    {
        headerName: "time",
        field: "time",
        cellEditor: InputParameterizedCellEditor,
        cellEditorParams: {
            inputAttrs: {
                type: 'time',
                attrs: {
                    min: '9:00',
                    max: '18:00',
                }
            }
        },
        editable: true,
    },
];
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowDatas,
    suppressScrollOnNewData: false,
};
let eGridDiv = document.querySelector('#myGrid');
new Grid(eGridDiv, gridOptions);
