export interface IField {
    FormFieldId:number,
    FieldId: number,
    ReportFieldId: number,
    FieldLabel: string,
    DataEntryControlId: number,
    GenericDataTypeId: number,
    Whitelist: { Id: number, FormatString: string, RegularExpression: string },
    FieldValue?: string,
    MultiFieldValues?: string[],
    IsValidated?: boolean,      /*Has lookup values */
    IsMultivalued?: boolean,      /*Can select multiple values from the lookup */
    LookupDetails?: { LookupValues: ILookupValues[], PopupComponent: IPopUpComponent },   
    IsMandatory: boolean,
    IsVisible?: boolean,
    IsEnabled?: boolean,
    ReadOnlyMode?: boolean,
    NotificationType?: string,
    MaxLength?: number,
    Width?: string,
    Format?: { Id:number,FormatString: string, RegularExpression: string },
    isContentHtml: string,
    Precision: number,
    Scale: number,
    Height: number,
    IsSigned: boolean,
    RangeFrom : string,
    RangeTo : string,
    HelpText : string,
    IsGrouped : boolean,
    HasChild : boolean,
    ParentId : number,
    IsSubField : boolean,
    SubFields ?: IField[],
    IsHiddenLabel?: boolean,
    IsLocallyValidated?: boolean,
    HasValidationError?: boolean,
    IsComputationalField?: boolean,
    FileData?: string;
    HasAutoLookUp?:boolean;
    ShowSelect?: boolean;
}

/*Fieldtypes 
1. Text Box
2. Date Picker
3. Text Area
4. Drop - down list
5. Radio Buttons
6. Check Box(s)
7. List Box
8. Date Time Picker
9. File Control
10.Button
11.Color Picker
12.Image Upload
13.DynamicList
14.Hatch Pattern Control
*/


export interface ILookupValues {
    Id?: number,
    Value?: string,
    IsDisabled?: boolean,
    Type?: number
}

export interface IPopUpComponent {
    Name: string,
    showImage: boolean
}