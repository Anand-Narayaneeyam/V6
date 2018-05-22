export interface IAnalytics {
    selectedRowCount?: number;
    menuId: number;
    menuName?: string;
    fieldObject?: any[];
    selectedIds?: any[];
    sortCol?: string;
    moduleId?: number;
    pageTarget?: number;
    IsKeywordSearch?: number;// 1 true 0 flase
    IsAdvanceSearch?: number;// 1 true 0 flase
    KeywordFilterValue?: string;
    AdvanceFilterValue?: string;
    FormId?: number;
    ParentFormId?: number;
    objectCategoryId?: number;
    dataOption?: number;
    attributeOption?: number;
    objectClassIds?: string;
    searchCondition?: string;
    isOrphan?: boolean;
    objectId?: number;
    isDataBasedOnUserAccess?: boolean;
    objectComponentType?: number;
    QueryCategryId?: number;     // for space query
    buildarray?: string;        // for space query
}