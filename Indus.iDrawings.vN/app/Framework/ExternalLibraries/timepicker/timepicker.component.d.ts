import { OnInit } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';
export interface TimepickerConfig {
    hourStep: number;
    minuteStep: number;
    secondStep: number; //secondStep
    showMeridian: boolean;
    meridians?: any[];
    readonlyInput: boolean;
    mousewheel: boolean;
    arrowkeys: boolean;
    showSpinners: boolean;
    min?: number;
    max?: number;
}
export declare const timepickerConfig: TimepickerConfig;
export declare class TimepickerComponent implements ControlValueAccessor, OnInit {
    cd: NgModel;
    hourStep: number;
    minuteStep: number;
    secondStep: number; // secondStep
    readonlyInput: boolean;
    mousewheel: boolean;
    arrowkeys: boolean;
    showSpinners: boolean;
    min: Date;
    max: Date;
    meridians: Array<string>;
    showMeridian: boolean;
    onChange: any;
    onTouched: any;
    private _selected;
    private _showMeridian;
    private meridian;
    private hours;
    private minutes;
    private seconds; //secondStep
    private selected;
    private invalidHours;
    private invalidMinutes;
    private invalidSeconds;
    constructor(cd: NgModel);
    ngOnInit(): void;
    writeValue(v: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    protected updateHours(): void;
    protected hoursOnBlur(): void;
    protected updateMinutes(): void;
    protected minutesOnBlur(): void;
    protected updateSeconds(): void;
    protected secondsOnBlur(): void;
    protected incrementHours(): void;
    protected decrementHours(): void;
    protected incrementMinutes(): void;
    protected decrementMinutes(): void;
    protected incrementSeconds(): void;
    protected decrementSeconds(): void;
    protected toggleMeridian(): void;
    private refresh();
    private updateTemplate();
    private getHoursFromTemplate();
    private getMinutesFromTemplate();
    private getSecondsFromTemplate();
    private pad(value);
    private noIncrementHours();
    private noDecrementHours();
    private noIncrementMinutes();
    private noDecrementMinutes();
    private noIncrementSeconds();
    private noDecrementSeconds();
    private addMinutesToSelected(minutes);
    private addSecondsToSelected(seconds);
    private noToggleMeridian();
}
