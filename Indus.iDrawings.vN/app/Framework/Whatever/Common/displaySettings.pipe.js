var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DisplaySettingsPipe = (function () {
    function DisplaySettingsPipe() {
    }
    DisplaySettingsPipe.prototype.transform = function (allFields, dataKey) {
        if ((allFields == null) || (allFields == undefined)) {
            return null;
        }
        if (dataKey != undefined) {
            // return allFields.filter(field => field.FieldName != dataKey);
            for (var i = 0; i < dataKey.length; i++) {
                allFields = allFields.filter(function (field) { return field.FieldName != dataKey[i]; });
            }
        }
        return allFields;
    };
    DisplaySettingsPipe = __decorate([
        core_1.Pipe({ name: 'displayPipe', pure: false }), 
        __metadata('design:paramtypes', [])
    ], DisplaySettingsPipe);
    return DisplaySettingsPipe;
}());
exports.DisplaySettingsPipe = DisplaySettingsPipe;
//# sourceMappingURL=displaySettings.pipe.js.map