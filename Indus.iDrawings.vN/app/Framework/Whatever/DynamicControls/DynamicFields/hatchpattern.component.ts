import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import {IField} from '../../../Models/Interface/IField';
import {TabsComponent} from '../../tab/tabs.component';
import {TabComponent} from '../../tab/tab.component';

@Component({
    selector: 'Hatch-Pattern',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/hatchpatterncomponent.html',
    inputs: ['fieldObject', 'patternId', 'angleInput','scaleInput'],
    directives: [TabsComponent, TabComponent],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class HatchPatternComponent implements OnInit, AfterViewInit {

    selectedTab: number = 0;
    isTabclick: boolean;
    showPicker: string = "none";
    strImageSrc: string = "";
    hatchAngle = new Array<number>();
    hatchScale = new Array<number>();
    @Output() hatchPatterEmit = new EventEmitter<IHatchPattern>();
    @Output() angleEmit = new EventEmitter();
    @Output() scaleEmit = new EventEmitter();
    arrHatchArray = new Array<HatchImgSource>();
    patternId: number;
    angleInput: number;
    scaleInput: number;

    constructor() {
    }

    ngOnInit() {
        for (var i = 0; i < 24; i++) {
            this.hatchAngle[i] = i*15;
        }
        for (var i = 0; i < 24; i++) {
            this.hatchScale[i] = (i*5)+10;
        }
        

        if (this.patternId != undefined || this.patternId != undefined) {
            this.arrHatchArray = this.GetHatchArray();

            this.arrHatchArray.find((e) => {
                if (e.PatternId == this.patternId) {
                    this.strImageSrc = e.src;
                    return true;
                }
            });
        }
    }

    ngAfterViewInit() {
    }

    getSelectedTab(event) {
    }

    toggleHatchPattern(event) {
        if (this.showPicker == "none") {
            this.showPicker = "block";
        }
        else {
            this.showPicker = "none";
        }
    }
    KeyPresstoggleHatchPattern(Keyevent) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            this.toggleHatchPattern(Keyevent);
        } else if (key != 9) {
            this.showPicker = "none";
        }
    }
    KeyPressselectedImageData(event, id) {
        var key = event.keyCode || event.which;
        if (key == 13 || key == 32) {
            var src: string = event.currentTarget.firstElementChild.src;
            var setImageSrc = "";
            if (src.includes("Content")) {
                setImageSrc = "Content" + src.split("Content")[1];
            }
            this.strImageSrc = setImageSrc;
            //console.log(setImageSrc);
            this.hatchPatterEmit.emit({
                id: id,
                src: src,
                angle: Number(this.angleInput),
                scale: Number(this.scaleInput)
            });
            this.toggleHatchPattern(event);
        } else if (key == 9 && !event.shiftKey) {
            if (id == 11 || id == 56 || id == 81 || id == 67) {               
                this.showPicker = "none";
            }
        }
    }

    onAngleChange(event) {      
        this.angleInput = event.target.value;
        this.angleEmit.emit({
            angle: this.angleInput
        });
    }
    onScaleChange(event) {       
        this.scaleInput = event.target.value;
        this.scaleEmit.emit({
            scale: this.scaleInput
        });
    }
    selectedImageData(event,id) {
        var src: string = event.currentTarget.src;
        var setImageSrc = "";
        if (src.includes("Content")) {
            setImageSrc ="Content" + src.split("Content")[1];
        }
        this.strImageSrc = setImageSrc;
        //console.log(setImageSrc);
        this.hatchPatterEmit.emit({
            id: id,
            src: src,
            angle: Number(this.angleInput),
            scale: Number(this.scaleInput)
        });    
        this.toggleHatchPattern(event);
    }
    GetHatchArray() {
        var contextObj = this;
        
        contextObj.arrHatchArray.push({ PatternId: 60, src: "Content/HatchPatterns/ANSI/ANSI31.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 61, src: "Content/HatchPatterns/ANSI/ANSI32.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 62, src: "Content/HatchPatterns/ANSI/ANSI33.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 63, src: "Content/HatchPatterns/ANSI/ANSI34.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 64, src: "Content/HatchPatterns/ANSI/ANSI35.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 65, src: "Content/HatchPatterns/ANSI/ANSI36.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 66, src: "Content/HatchPatterns/ANSI/ANSI37.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 67, src: "Content/HatchPatterns/ANSI/ANSI38.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 68, src: "Content/HatchPatterns/ISO/ISO02W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 69, src: "Content/HatchPatterns/ISO/ISO03W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 70, src: "Content/HatchPatterns/ISO/ISO04W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 71, src: "Content/HatchPatterns/ISO/ISO05W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 72, src: "Content/HatchPatterns/ISO/ISO06W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 73, src: "Content/HatchPatterns/ISO/ISO07W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 74, src: "Content/HatchPatterns/ISO/ISO08W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 75, src: "Content/HatchPatterns/ISO/ISO09W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 76, src: "Content/HatchPatterns/ISO/ISO10W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 77, src: "Content/HatchPatterns/ISO/ISO11W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 78, src: "Content/HatchPatterns/ISO/ISO12W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 79, src: "Content/HatchPatterns/ISO/ISO13W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 80, src: "Content/HatchPatterns/ISO/ISO14W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 81, src: "Content/HatchPatterns/ISO/ISO15W100.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 13, src: "Content/HatchPatterns/Predefined/ANGLE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 14, src: "Content/HatchPatterns/Predefined/AR-B816.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 15, src: "Content/HatchPatterns/Predefined/AR-B816C.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 16, src: "Content/HatchPatterns/Predefined/AR-B88.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 17, src: "Content/HatchPatterns/Predefined/AR-BRELM.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 18, src: "Content/HatchPatterns/Predefined/AR-BRSTD.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 19, src: "Content/HatchPatterns/Predefined/AR-HBONE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 21, src: "Content/HatchPatterns/Predefined/AR-RROOF.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 22, src: "Content/HatchPatterns/Predefined/AR-RSHKE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 23, src: "Content/HatchPatterns/Predefined/AR-SAND.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 20, src: "Content/HatchPatterns/Predefined/AR_PARQ1.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 24, src: "Content/HatchPatterns/Predefined/BOX.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 25, src: "Content/HatchPatterns/Predefined/BRASS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 26, src: "Content/HatchPatterns/Predefined/BRICK.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 27, src: "Content/HatchPatterns/Predefined/BRSTONE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 28, src: "Content/HatchPatterns/Predefined/CLAY.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 29, src: "Content/HatchPatterns/Predefined/CORK.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 30, src: "Content/HatchPatterns/Predefined/CROSS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 31, src: "Content/HatchPatterns/Predefined/DASH.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 32, src: "Content/HatchPatterns/Predefined/DOLMIT.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 33, src: "Content/HatchPatterns/Predefined/DOTS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 34, src: "Content/HatchPatterns/Predefined/EARTH.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 35, src: "Content/HatchPatterns/Predefined/ESCHER.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 36, src: "Content/HatchPatterns/Predefined/FLES.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 37, src: "Content/HatchPatterns/Predefined/GRASS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 38, src: "Content/HatchPatterns/Predefined/GRATE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 39, src: "Content/HatchPatterns/Predefined/HEX.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 40, src: "Content/HatchPatterns/Predefined/HONEY.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 58, src: "Content/HatchPatterns/Predefined/HEXAS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 41, src: "Content/HatchPatterns/Predefined/HOUND.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 42, src: "Content/HatchPatterns/Predefined/INSUL.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 43, src: "Content/HatchPatterns/Predefined/LINE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 45, src: "Content/HatchPatterns/Predefined/MESH.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 44, src: "Content/HatchPatterns/Predefined/MUDST.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 46, src: "Content/HatchPatterns/Predefined/NET3.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 59, src: "Content/HatchPatterns/Predefined/NOHEXAS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 47, src: "Content/HatchPatterns/Predefined/PLAST.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 48, src: "Content/HatchPatterns/Predefined/PLASTI.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 49, src: "Content/HatchPatterns/Predefined/SACNCR.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 50, src: "Content/HatchPatterns/Predefined/SQUARE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 51, src: "Content/HatchPatterns/Predefined/STARS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 52, src: "Content/HatchPatterns/Predefined/STEEL.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 53, src: "Content/HatchPatterns/Predefined/SWAMP.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 54, src: "Content/HatchPatterns/Predefined/TRANS.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 55, src: "Content/HatchPatterns/Predefined/TRIANGLE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 57, src: "Content/HatchPatterns/Predefined/WEAVE.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 56, src: "Content/HatchPatterns/Predefined/ZIGZAG.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 3, src: "Content/HatchPatterns/Others/Bevel Minus.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 1, src: "Content/HatchPatterns/Others/Bevel Plus.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 4, src: "Content/HatchPatterns/Others/Chamfer Minus.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 2, src: "Content/HatchPatterns/Others/Chamfer Plus.bmp" });
        contextObj.arrHatchArray.push({ PatternId: 7, src: "Content/HatchPatterns/Others/Course.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 6, src: "Content/HatchPatterns/Others/Custona.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 12, src: "Content/HatchPatterns/Others/Diamonds.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 5, src: "Content/HatchPatterns/Others/Fascia.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 8, src: "Content/HatchPatterns/Others/Frieze.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 9, src: "Content/HatchPatterns/Others/Grafiti.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 10, src: "Content/HatchPatterns/Others/Net.bmp" }); 
        contextObj.arrHatchArray.push({ PatternId: 11, src: "Content/HatchPatterns/Others/Solid.bmp" });

        return contextObj.arrHatchArray;
    }
}

export interface IHatchPattern {
    id: number,
    src: any,
    angle: number,
    scale: number;
}
export interface HatchImgSource {
    PatternId: number;
    src: string;
}