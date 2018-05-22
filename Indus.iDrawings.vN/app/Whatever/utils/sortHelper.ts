import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
//import {IValidation} from './validations';
import {IField} from '../../Framework/Models//Interface/IField'


@Injectable()
export class SortHelper{
   //the below method is to be deleted in the main version
    sortByProperty = function (property, direction) {
        return function (x, y) {
            if (direction == "ASC")
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            else if (direction == "DESC")
                return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
        };
    };
}