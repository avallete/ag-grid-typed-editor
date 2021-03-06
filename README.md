# ag-grid-typed-editor
Quick implementation of typed html input editor for [ag-Grid](https://github.com/ag-grid/ag-grid).

## Install
```bash
npm install --save ag-grid-typed-editor
```

## Description
The goal of this package is to provide an easy way to have html typed input for agGrid editors.

## Usage
This package provide a new cellEditor named: `InputParameterizedCellEditor`.
You can configure and customize the cell and behavior with the following `cellEditorParams`:

- `useFormatter`: (`boolean = false`) used when the cell value needs formatting prior to editing, such as when using
    reference data and you want to display text rather than code.
- `inputAttrs`: (`object = {type: 'text'}`)
    - `type`: (`string: required`) The name of the html type you want, must be one of:
        - 'number'
        - 'text'
        - 'date'
        - 'datetime-local'
        - 'month'
        - 'color'
        - 'range'
        - 'week'
        - 'time'
    - `attrs`: (`object`) All the attrs who are valid for the targeted html type.

## [Demo](https://stackblitz.com/edit/ag-grid-typed-editor)
![ag-grid-typed-editor-demo](https://user-images.githubusercontent.com/8771783/59564931-0b6bb380-904d-11e9-8ccf-330907b58fab.gif)
 
## Example
 
### Simple number input typed example
 ```js
import {InputParameterizedCellEditor} from './ag-grid-typed-editor';
...
{
    headerName: 'A number',
    field: 'somenumber',
    editable: true,
    resizable: true,
    cellEditor: InputParameterizedCellEditor,
    cellEditorParams: {
        inputAttrs: {
            type: 'number',
            attrs: {
                min: 1,
                max: Number.MAX_SAFE_INTEGER,   
            }
        },
    },
}
```

## Dependencies
 - [ag-Grid](https://github.com/ag-grid/ag-grid)

## Thank's to
- Thank's to [ag-Grid](https://github.com/ag-grid/ag-grid) for the great ag-Grid package.

 
## LICENSE
This project is onto MIT license see [LICENSE](./LICENSE) file.
