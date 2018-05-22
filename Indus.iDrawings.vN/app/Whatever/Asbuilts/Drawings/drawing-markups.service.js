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
var DrawingMarkups = (function () {
    function DrawingMarkups(iWhizObject, userId) {
        this.iWhizObject = iWhizObject;
        this.userId = userId;
        this.points = "";
        this.pointcount = 0;
        this.isMarkupSaved = false;
        this.isMarkupEdit = false;
        this.isChangeInEdit = false;
        this.rowDelimiter = "§";
        this.columnDelimeter = "µ";
        this.editOnClick = function (resCallback) {
            this.isChangeInEdit = true;
            var contextObj = this;
            var entityHandle;
            var ratio = [0];
            var TextSize;
            contextObj.objiWhiz.setCursor(12);
            contextObj.objiWhiz.getDWGPoint(function (returnCode, x, y) {
                contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.layerName, 6, x, y, 12, function (retCode, entityHandle) {
                    contextObj.objiWhiz.setCursor(1);
                    if (retCode == 0) {
                        var handle = entityHandle.substring(0, entityHandle.length - 1);
                        console.log("entityHandleentityHandle", handle);
                        contextObj.objiWhiz.getContentText(handle, function (res, textContent) {
                            if (res == 0) {
                                contextObj.objiWhiz.getTextProperties(handle, function (res, isBold, isItalic, isUnderLine, textAngle, fontName) {
                                    if (retCode == 0) {
                                        contextObj.objiWhiz.getTextSize(handle, function (res, TextSize) {
                                            if (res == 0) {
                                                console.log("TextSize", TextSize);
                                                contextObj.editCommentEntityHandle = handle;
                                                contextObj.objiWhiz.clientDWGAreaRatio(ratio);
                                                TextSize = Math.round(TextSize / ratio[0]);
                                                console.log("isBold, isItalic, isUnderLine, textAngle, fontName,TextSize", isBold, isItalic, isUnderLine, textAngle, fontName, TextSize);
                                                resCallback(isBold, isItalic, isUnderLine, textAngle, fontName, TextSize, textContent);
                                            }
                                            else
                                                console.log("getTextSizereturned with error code : ", res);
                                        });
                                    }
                                    else
                                        console.log("getTextProperties returned with error code : ", res);
                                });
                            }
                            else
                                console.log("getContentText returned with error code : ", res);
                        });
                    }
                    else {
                        console.log("getEntityWithDWGPoint returned with error code : ", retCode);
                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    }
                });
            });
        };
        this.addcommentsOnClick = function (startx, starty, fontStyle, textFontSize, text, bold, italic, colorcode, edit, resCallback) {
            this.isChangeInEdit = true;
            var contextObj = this;
            var returnCode = 0;
            var fontSize = +textFontSize;
            var ratio = [0];
            var boldText = bold ? "b1" : "b0";
            var italicText = italic ? "i1" : "i0";
            var fontColorCode = colorcode;
            var formatedText;
            //{\\fArial|b1|i0|c0|p18;\\C1;\\H8;" + text +"}
            //"{\\fArial|b1|i0|c0|p18;\\C1;\\H8;SpaceID}"
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            //  layerName, autocadColor, startX, startY, angle, height, wrapWidth, lineSpace, text, textStyle, styleId, resCallback
            console.log("edit", edit);
            if (edit == false) {
                formatedText = "{\\f" + fontStyle + "|" + boldText + "|" + italicText + "|c0|p18;" + text + "}";
                contextObj.objiWhiz.createMultilineText(contextObj.layerName, fontColorCode, startx, starty, 0, ratio[0] * fontSize, 0, 1, formatedText, "Standard", 0, function (retCode, entityHandle) {
                    if (retCode != 0) {
                        console.log("createMultilineText returned with error code : ", retCode);
                    }
                    else {
                        console.log("Entity handle: " + entityHandle);
                    }
                    resCallback(retCode);
                });
            }
            else {
                if (this.editCommentEntityHandle) {
                    formatedText = "{\\f" + fontStyle + "|" + boldText + "|" + italicText + "|c0|p18;\\C" + fontColorCode + "\\H" + ratio[0] * fontSize + ";" + text + "}";
                    contextObj.objiWhiz.setText(contextObj.editCommentEntityHandle, formatedText, function (retCode) {
                        if (retCode != 0) {
                            console.log("setText returned with error code : ", retCode);
                        }
                        resCallback(retCode);
                        //contextObj.objiWhiz.setTextSize(contextObj.editCommentEntityHandle, ratio[0] * fontSize, function (retCode) {
                        //    if (retCode != 0) {
                        //        console.log("setTextSize returned with error code : ", retCode);
                        //        resCallback(retCode);
                        //    }
                        //    });
                    });
                }
            }
        };
        this.saveMarkUp = function (resCallback) {
            this.isChangeInEdit = false;
            var contextObj = this;
            var exportedxmlstring = "";
            contextObj.objiWhiz.exportToXML(false, contextObj.layerName, function (returnCode, exportedxmlstring) {
                resCallback(exportedxmlstring);
            });
        };
        this.hasMarkups = function (callBack) {
            var contextObj = this;
            var isEdit = false;
            contextObj.objiWhiz.getAllEntities(contextObj.layerName, function (res, entityhandles) {
                if (res == 0) {
                    if (entityhandles != "") {
                        if (contextObj.isMarkupEdit) {
                            if (contextObj.isChangeInEdit) {
                                isEdit = true;
                                callBack(0, isEdit);
                            }
                            else
                                callBack(2);
                        }
                        else
                            callBack(0, isEdit);
                    }
                    else
                        callBack(2);
                }
                else if (res == 21) {
                    callBack(2);
                }
                else {
                    console.log("getAllEntities faild due to ", res);
                    callBack(1);
                }
            });
        };
        this.hasMarkupsIndrawing = function (callBack) {
            var contextObj = this;
            contextObj.objiWhiz.getAllEntities(contextObj.layerName, function (res, entityhandles) {
                if (res == 0) {
                    if (entityhandles != "")
                        callBack(0);
                    else
                        callBack(2);
                }
                else if (res == 21) {
                    callBack(2);
                }
                else {
                    console.log("getAllEntities faild due to ", res);
                    callBack(1);
                }
            });
        };
        this.hasText = function (resCallback) {
            var contextObj = this;
            var Handles = [];
            var hasTxt = false;
            contextObj.objiWhiz.getAllEntities(contextObj.layerName, function (res, entityhandles) {
                if (res == 0) {
                    if (entityhandles != "") {
                        Handles = entityhandles.split(contextObj.rowDelimiter);
                        Handles.pop();
                        contextObj.hasMulitilineText(Handles, hasTxt, function (isText) {
                            resCallback(isText);
                        });
                    }
                    else
                        resCallback(hasTxt);
                }
                else {
                    console.log("getAllEntities faild due to ", res);
                    resCallback(hasTxt);
                }
            });
        };
        this.deleteMarkup = function (resCallback) {
            this.isChangeInEdit = true;
            var contextObj = this;
            contextObj.objiWhiz.setCursor(12);
            contextObj.objiWhiz.getDWGPoint(function (returnCode, x, y) {
                contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.layerName, 0, x, y, 12, function (retCode, entityHandle) {
                    contextObj.objiWhiz.setCursor(1);
                    if (retCode == 0) {
                        if (entityHandle != "") {
                            entityHandle = entityHandle.split(contextObj.rowDelimiter);
                            resCallback(entityHandle[0]);
                        }
                        else
                            resCallback(entityHandle);
                    }
                });
            });
        };
        console.log("hit 2 unlock", iWhizObject);
        this.objiWhiz = iWhizObject;
        this.layerName = this.createLayer();
    }
    DrawingMarkups.prototype.rectangleOnClick = function (lineThickness, lineAutocadColor) {
        this.isChangeInEdit = true;
        var contextObj = this;
        var ratio = [0];
        contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
        contextObj.objiWhiz.drawRectangle(contextObj.layerName, lineAutocadColor, lineThickness * ratio[0], "", 1, function (returnCode, EntityHandle) {
            console.log("returnCode, EntityHandle", returnCode, EntityHandle);
        });
    };
    DrawingMarkups.prototype.cloudOnClick = function (lineThickness, lineAutocadColor) {
        this.isChangeInEdit = true;
        var contextObj = this;
        var ratio = [0];
        contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
        contextObj.objiWhiz.getRectangle(function (returnCode, leftTop, bottomRight) {
            contextObj.objiWhiz.setCursor(1);
            if (returnCode == 0) {
                var cloudPoints = leftTop.x + contextObj.columnDelimeter + leftTop.y + contextObj.rowDelimiter + bottomRight.x + contextObj.columnDelimeter + leftTop.y + contextObj.rowDelimiter + bottomRight.x + contextObj.columnDelimeter + bottomRight.y + contextObj.rowDelimiter + leftTop.x + contextObj.columnDelimeter + bottomRight.y + contextObj.rowDelimiter;
                contextObj.objiWhiz.drawCloudMarkup(contextObj.layerName, lineAutocadColor, 20 * ratio[0], cloudPoints, lineThickness * ratio[0], "", 1, true, function (retCode, entityHandle) {
                    if (retCode != 0)
                        console.log("drawCloudMarkup returned with error code : " + retCode);
                    else
                        console.log("Entity handle: " + entityHandle);
                });
            }
            else {
                console.log("getRectangle failed with return code: " + returnCode);
            }
        });
    };
    DrawingMarkups.prototype.ellipseOnClick = function (lineThickness, lineAutocadColor) {
        this.isChangeInEdit = true;
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        var ratio = [0];
        contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
        contextObj.objiWhiz.getRectangle(function (returnCode, leftTop, bottomRight) {
            contextObj.objiWhiz.setCursor(1);
            if (returnCode == 0) {
                var CenterX, CenterY, endX, endY;
                CenterX = (leftTop.x + bottomRight.x) / 2;
                CenterY = (leftTop.y + bottomRight.y) / 2;
                if (Math.abs((bottomRight.x - leftTop.x)) > Math.abs((leftTop.y - bottomRight.y))) {
                    endX = bottomRight.x;
                    endY = CenterY;
                }
                else {
                    endX = CenterX;
                    endY = bottomRight.y;
                }
                contextObj.objiWhiz.drawEllipseMarkup(contextObj.layerName, lineAutocadColor, CenterX, CenterY, endX, endY, lineThickness * ratio[0], "", 1, false, function (retCode, entityHandle) {
                    if (retCode != 0)
                        console.log("drawEllipseMarkup returned with error code : " + retCode);
                    else
                        console.log("Entity handle: " + entityHandle);
                });
            }
            else {
                console.log("getRectangle failed with return code: " + returnCode);
            }
        });
    };
    DrawingMarkups.prototype.freehandOnClick = function (lineThickness, lineAutocadColor) {
        this.isChangeInEdit = true;
        var contextObj = this;
        var ratio = [0];
        contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
        contextObj.objiWhiz.addMarkup(contextObj.layerName, 0, lineThickness * ratio[0], "", lineAutocadColor, 1, function (retCode, entityHandle, actualpoints) {
            //objiWhiz.regenerate();
            if (retCode != 0)
                console.log("drawFreeHand returned with error code : " + retCode);
            else
                console.log("Entity handle: " + entityHandle + ", Action Points: " + actualpoints);
        });
    };
    DrawingMarkups.prototype.moveOnClick = function () {
        this.isChangeInEdit = true;
        var contextObj = this;
        contextObj.objiWhiz.setCursor(12);
        contextObj.objiWhiz.getDWGPoint(function (returnCode, x, y) {
            var rubx = [], ruby = [], rubz = [];
            rubx[0] = x;
            ruby[0] = y;
            rubz[0] = 0;
            contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
            contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
            contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.layerName, 0, x, y, 12, function (retCode, entityHandle) {
                contextObj.objiWhiz.setCursor(1);
                if (retCode == 0) {
                    contextObj.objiWhiz.getDWGPoint(function (returnCode, nextX, nextY) {
                        if (entityHandle != "" && returnCode == 0) {
                            entityHandle = entityHandle.split(contextObj.rowDelimiter);
                            contextObj.objiWhiz.moveEntity(entityHandle[0], nextX, nextY, function (retCode) {
                                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                contextObj.objiWhiz.regenerate();
                                if (retCode != 0)
                                    console.log("moveEntity returned with error code : " + retCode);
                                else
                                    console.log("Success!");
                            });
                        }
                        else {
                            contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                            contextObj.objiWhiz.regenerate();
                        }
                    });
                }
                else {
                    console.log("getEntityWithDWGPoint returned with error code : " + retCode);
                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.regenerate();
                }
            });
        });
    };
    DrawingMarkups.prototype.lineOnClick = function (lineThickness, lineAutocadColor) {
        this.isChangeInEdit = true;
        var contextObj = this;
        var result = contextObj.objiWhiz.getDWGPoint(function (retCode, x, y) {
            if (retCode == 0) {
                contextObj.points = contextObj.points + x + contextObj.columnDelimeter + y + contextObj.rowDelimiter;
                contextObj.pointcount++;
                var rubx = [], ruby = [], rubz = [];
                rubx[0] = x;
                ruby[0] = y;
                rubz[0] = 0;
                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                if (contextObj.pointcount > 1) {
                    contextObj.objiWhiz.createLine("temp", lineAutocadColor, contextObj.tempx, contextObj.tempy, x, y, function (retCode, entityHandle) {
                        if (retCode != 0) {
                            console.log("createLine returned with error code : ", retCode);
                            contextObj.objiWhiz.enableRubberband(x, y, 0, false);
                            return;
                        }
                        else {
                            contextObj.tempx = x, contextObj.tempy = y;
                            contextObj.lineOnClick(lineThickness, lineAutocadColor);
                        }
                    });
                }
                else {
                    contextObj.tempx = x, contextObj.tempy = y;
                    contextObj.lineOnClick(lineThickness, lineAutocadColor);
                }
            }
            else if (retCode == 8) {
                var ratio = [0];
                contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
                contextObj.objiWhiz.createPolyline(contextObj.layerName, lineAutocadColor, contextObj.points, lineThickness * ratio[0], "", 1, true, function (retCode, entityHandle) {
                    contextObj.points = "";
                    contextObj.pointcount = 0;
                    contextObj.objiWhiz.enableRubberband(x, y, 0, false);
                    if (retCode != 0)
                        console.log("createPolyline returned with error code : ", retCode);
                    else {
                        console.log("Entity handle: ", entityHandle);
                    }
                    contextObj.objiWhiz.deleteLayer("temp", function (retCode) {
                        contextObj.objiWhiz.regenerate();
                    });
                });
            }
            else {
                console.log("getDWGPoint faild due to ", retCode);
                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                contextObj.objiWhiz.regenerate();
            }
        });
    };
    DrawingMarkups.prototype.createLayer = function () {
        var contextObj = this;
        /////////to find date and time/////////
        var dateTime = new Date();
        var date = dateTime.getDate() + "-" + dateTime.getMonth() + "-" + dateTime.getFullYear();
        var hours = dateTime.getHours() > 12 ? dateTime.getHours() - 12 : dateTime.getHours().toString();
        var am_pm = dateTime.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();
        var seconds = dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds();
        var time = hours + "-" + minutes + "-" + seconds + "_" + am_pm;
        /////////to find date and time/////////
        //var datePipe = new DatePipe();
        //var date: string = datePipe.transform(new Date(), "mm-dd-yyyy");
        //var time: string = datePipe.transform(new Date(), "jms").replace(" ", "_").replace(/:/g, "-");
        var layerName = "$" + contextObj.userId + "_" + date + "_" + time;
        console.log("layerName", layerName);
        //var now = datePipe.transform(new Date(), "MM-dd-yyyy hh:mm:ss a/pm");
        //debugger
        //now = now.split("/")[0];
        //var layer = "$" + contextObj.userId + "_" + now;
        //layer = layer.replace(/:/g, "-");
        return layerName;
    };
    DrawingMarkups.prototype.createFolderPath = function () {
    };
    DrawingMarkups.prototype.hasMulitilineText = function (entityhandles, hasTxt, callback) {
        var contextObj = this;
        if (entityhandles.length > 0) {
            var textEntityhandle = entityhandles[entityhandles.length - 1];
            contextObj.objiWhiz.getEntityType(textEntityhandle, function (res, typeid) {
                if (res == 0) {
                    entityhandles.pop();
                    if (typeid == 6) {
                        hasTxt = true;
                        callback(hasTxt);
                    }
                    else {
                        contextObj.hasMulitilineText(entityhandles, hasTxt, callback);
                    }
                }
                else
                    alert("getEntityType faild due to " + res);
            });
        }
        else
            callback(hasTxt);
    };
    DrawingMarkups.prototype.isMarkupSave = function () {
        this.isMarkupSaved = true;
    };
    DrawingMarkups.prototype.isMarkupDelete = function () {
        this.isMarkupSaved = false;
        ;
    };
    DrawingMarkups.prototype.craeateNextMarkup = function (layername) {
        var contextObj = this;
        contextObj.objiWhiz.deleteLayer(layername, function (retCode) {
            contextObj.layerName = contextObj.createLayer();
            contextObj.isMarkupSaved = true;
        });
    };
    DrawingMarkups.prototype.setEditMarkupData = function (data) {
        this.selectedEditmarkupData = data;
    };
    DrawingMarkups = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object, Number])
    ], DrawingMarkups);
    return DrawingMarkups;
}());
exports.DrawingMarkups = DrawingMarkups;
//# sourceMappingURL=drawing-markups.service.js.map