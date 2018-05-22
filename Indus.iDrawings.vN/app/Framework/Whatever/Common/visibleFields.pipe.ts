import { Pipe, PipeTransform } from '@angular/core';
import {IField} from '../../Models//Interface/IField';

@Pipe({ name: 'visibleFields' })
export class VisibleFieldsPipe implements PipeTransform {
    transform(allFields: IField[]) {
        return allFields.filter(field => field.IsVisible==true);
    }
}