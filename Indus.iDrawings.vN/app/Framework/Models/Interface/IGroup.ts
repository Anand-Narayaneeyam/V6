import {ICondition} from '../../Models/Interface/ICondition';
import {IField} from '../../Models/Interface/IField';
export interface IGroup {
    GroupId: number,
    Operator: number,/*1-AND,2-OR*/
    SubGroups: IGroup[],
    Conditions: ICondition[],
  Jointer:number,
    OperatorFieldObj:IField
}