export interface IGrid {
    selectedIds?: any[];
    sortCol?: string;
    sortDir?: string;
    currentItem?: any;
    dataKey: string;
    groupBy?: string[];
    grpWithCheckBx?: boolean;
    allowAdd?: boolean;
    allowEdit?: boolean;
    headerVisibility?: boolean; //false
    selectioMode?: string;  //single,none 
    isHeaderCheckBx?: boolean;
    rowData?: any;
    allowSort?: boolean;
    isautosizecolms?: boolean;
    hideContextMenuIds?: number[];
    showContextMenu?: boolean;
    isClientSort?: boolean;
}