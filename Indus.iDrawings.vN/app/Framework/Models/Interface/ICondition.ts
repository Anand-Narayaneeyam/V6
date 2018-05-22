import {IField} from '../../Models/Interface/IField';
export interface ICondition {
    ConditionId: number,
    FieldId: number,
    Condition: number,
    Value: any,
    OperatorFieldObj: IField,
    FldNameFieldObj: IField,
    ConditionFieldObj: IField,
    FldValueFieldObj: IField
}