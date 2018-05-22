Flowchart = function (objiWhizApi) {
    this.m_iWhizApi = objiWhizApi;
    this.createProcessBox = function (resCallback) {
        try {
            var that = this;
            this.m_iWhizApi.getRectangle(function (returnCode, leftTop, bottomRight) {
                if (returnCode == 0) {
                    var x0, y0, x1, y1;
                    x0 = leftTop.x; y0 = leftTop.y;
                    x1 = bottomRight.x; y1 = bottomRight.y;

                    var centerX, centerY, width, height;
                    centerX = (x0 + x1) / 2;
                    centerY = (y0 + y1) / 2;
                    height = Math.abs(y1 - y0);
                    width = Math.abs(x1 - x0);

                    $.ajax({
                        url: that.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateProcessBox',
                        type: "POST",
                        headers: { "__RequestVerificationToken": that.m_iWhizApi.m_csrfToken },
                        data: JSON.stringify([that.m_iWhizApi.m_DwgId, centerX, centerY, width, height]),
                        contentType: 'application/json; charset=utf-8',
                        success: function (returnObject) {
                            resCallback(returnObject.returnCode, returnObject.BoxHandle)
                            that.m_iWhizApi.updateViewport(function (retCode) {
                                // resCallback(returnObject.returnCode);
                            });
                        },
                        error: function (xhr) {
                            resCallback(9);
                        }
                    });
                }
                else
                    resCallback(returnCode);
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createBoxTextOnFlowchart = function (boxHandle, boxText, actionId, actionNo, resCallback) {
        try {         

            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateBoxTextOnFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, boxHandle, boxText, actionId, actionNo]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.cancelBox = function (boxHandle, resCallback) {
        try {
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CancelBox',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, boxHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode)
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.getNearestSnapPoint = function (entityHandle, xVal, yVal, resCallback) {
         try {
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetNearestSnapPoint',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, entityHandle, xVal, yVal]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.XValue, returnObject.YValue, returnObject.IsNear);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.getNearestSnapPointWithAllSnapPoints = function (entityHandle, xVal, yVal, resCallback) {
         try {
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetNearestSnapPointWithAllSnapPoints',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, entityHandle, xVal, yVal]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.XValue, returnObject.YValue, returnObject.IsNear, returnObject.SnapPoints);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.checkValidInOut = function (entityHandle, xVal, yVal, isSpace, resCallback) {
          try {
              if (!this.m_iWhizApi.m_Viewer.m_OpenFlag) {
                  resCallback(iWhizError.NOT_OPEND);
                  return;
              }
              $.ajax({
                  url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CheckValidInOut',
                  type: "POST",
                  headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, entityHandle, xVal, yVal, isSpace]),
                  contentType: 'application/json; charset=utf-8',
                  success: function (returnObject) {
                      resCallback(returnObject.returnCode);
                  },
                  error: function (xhr) {
                      resCallback(9);
                  }
              });
          }
          catch (e) {
              resCallback(iWhizError.UNEXPECTED_ERROR);
          }

     },
     this.createConnector = function (resCallback) {
         this.m_iWhizApi.m_Grip.setSnapStatus(true); 
         var sourceHandle, targetHandle;
         var that = this;
         this.m_iWhizApi.getDWGPoint(function (retCode, sourceX, sourceY) {
             if (retCode != 0) {
                 that.m_iWhizApi.m_Grip.setSnapStatus(false);
                 resCallback(retCode);
                 return;
             }
             else {
                 sourceHandle = that.m_iWhizApi.m_Grip.m_SnapHandle;
                 if (sourceHandle != "") {
                     sourceX = that.m_iWhizApi.m_Grip.m_SnapPoint.x;
                     sourceY = that.m_iWhizApi.m_Grip.m_SnapPoint.y;
                 }
                 that.checkValidInOut(sourceHandle, sourceX, sourceY, true, function (retCode) {
                     if (retCode != 0) {
                         that.m_iWhizApi.m_Grip.setSnapStatus(false);
                         resCallback(retCode);
                         return;
                     }
                     else {
                         var x = [0], y = [0], z = [0];
                         x[0] = sourceX; y[0] = sourceY; z[0] = 0;
                         that.m_iWhizApi.dwgToClient(x, y, z);
                         that.m_iWhizApi.enableRubberband(x[0], y[0], z[0], true);
                         that.m_iWhizApi.m_Grip.m_SnapHandle = "";
                         that.m_iWhizApi.getDWGPoint(function (retCode, targetX, targetY) {
                             if (retCode != 0) {
                                 that.m_iWhizApi.m_Grip.setSnapStatus(false);
                                 that.m_iWhizApi.enableRubberband(0, 0, 0, false);
                                 resCallback(retCode);
                                 return;
                             }
                             else {                                
                                 targetHandle = that.m_iWhizApi.m_Grip.m_SnapHandle;
                                 if (targetHandle != "") {
                                    targetX = that.m_iWhizApi.m_Grip.m_SnapPoint.x;
                                    targetY = that.m_iWhizApi.m_Grip.m_SnapPoint.y;
                                 }
                              
                                 
                                 that.checkValidInOut(targetHandle, targetX, targetY, false, function (retCode) {
                                     if (retCode != 0) {
                                         that.m_iWhizApi.m_Grip.setSnapStatus(false);
                                         that.m_iWhizApi.enableRubberband(0, 0, 0, false);
                                         resCallback(retCode);
                                         return;
                                     }
                                     else {
                                         var x = [0], y = [0], z = [0];
                                         x[0] = targetX; y[0] = targetY; z[0] = 0;
                                         that.m_iWhizApi.dwgToClient(x, y, z);
                                         that.m_iWhizApi.enableRubberband(x[0], y[0], z[0], false);
                                         that.m_iWhizApi.setSnapStatus(false);

                                         $.ajax({
                                             url: that.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateConnector',
                                             type: "POST",
                                             headers: { "__RequestVerificationToken": that.m_iWhizApi.m_csrfToken },
                                             data: JSON.stringify([that.m_iWhizApi.m_DwgId, sourceHandle, targetHandle, sourceX, sourceY, targetX, targetY]),
                                             contentType: 'application/json; charset=utf-8',
                                             success: function (returnObject) {
                                                 resCallback(returnObject.returnCode, returnObject.EntityHandle, returnObject.FromActionId, returnObject.ToActionId);
                                             },
                                             error: function (xhr) {
                                                 resCallback(9);
                                             }
                                         });
                                     }
                                 });
                             }
                         });
                     }
                 });
             }
         });
     },
     this.cancelConnector = function (connectorHandle, resCallback) {
         try {
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CancelConnector',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, connectorHandle]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode)
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.createNextAction = function (connectorHandle, type, id, actionText, actionNo, resCallback) {
         try {
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateNextAction',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, connectorHandle, type, id, actionText, actionNo]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode)
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.createConnectorTextOnFlowchart = function (connectorHandle, connectorText, outcomeId, connectorType, resCallback) {
         try {
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateConnectorTextOnFlowchart',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, connectorHandle, connectorText, outcomeId, connectorType]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode)
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.selectShape = function (resCallback) {
         try {
             this.m_iWhizApi.m_Viewer.m_State = this.m_iWhizApi.m_Viewer.STATE.GRIP_MODE;
             this.m_iWhizApi.m_Viewer.setCursor(14);
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.selectShapeOnPoint = function (xVal, yVal, resCallback) {
         try {
               var x = [0], y = [0], z = [0];
               x[0] = xVal; y[0] = yVal; z[0] = 0;
               this.m_iWhizApi.clientToDWG(x, y, z);

               var that = this;
               $.ajax({
                   url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SelectShape',
                   type: "POST",
                   headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                   data: JSON.stringify([this.m_iWhizApi.m_DwgId, x[0], y[0]]),
                   contentType: 'application/json; charset=utf-8',
                   success: function (returnObject) {
                       //if (returnObject.returnCode != 0)
                       //{
                       //    that.m_iWhizApi.m_Viewer.m_State = that.m_iWhizApi.m_Viewer.STATE.NONE;
                       //    that.m_iWhizApi.m_Grip.hideGrips();

                       //}
                       //else
                     if (returnObject.returnCode == 0) {
                           that.m_iWhizApi.m_Grip.showGrips(returnObject.SelectHandle, function (retCode) {
                             //that.m_iWhizApi.getEntityType(returnObject.SelectHandle, function (ret, typeId) {
                             that.m_iWhizApi.m_Grip.m_GripEntityType = returnObject.TypeId;
                                   resCallback(retCode);
                            // });
                               });
                       }
                   },
                   error: function (xhr) {
                       resCallback(9);
                   }
               });
               
           }
           catch (e) {
               resCallback(iWhizError.UNEXPECTED_ERROR);
           }
     },
     this.setActionParams = function (autoCadBoxFillColor, lineWidth, lineType, lineTypeScale, resCallback) {
        try {  
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetActionParams',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadBoxFillColor, lineWidth, lineType, lineTypeScale]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {                  
                    resCallback(returnObject.retCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
     },
     this.setActionTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetActionTextParams',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.retCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
     },
     this.setOutcomeParams = function (autoCadColor, arrowsize, scale, lineType, lineTypeScale, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetOutcomeParams',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadColor, arrowsize, scale, lineType, lineTypeScale]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.retCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setOutcomeTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetOutcomeTextParams',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadColor, angle, height, wrapWidth, lineSpace, textStyle, styleId]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.retCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setCircleOfFlowchartParams = function (autoCadCircleColor, autoCadCircleFillColor, radius, textHeight, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetCircleOfFlowchartParams',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadCircleColor, autoCadCircleFillColor, radius, textHeight]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.retCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setEndRectangleParams = function (autoCadBoxColor, autoCadBoxFillColor, lineWidth, lineType,
                                    lineTypeScale, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetEndRectangleParams',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadBoxColor, autoCadBoxFillColor, lineWidth, lineType,
                                    lineTypeScale]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.retCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.setEndRectangleTextParams = function (autoCadColor, angle, height, wrapWidth, lineSpace,
                                    textStyle, styleId, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetEndRectangleTextParams',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, autoCadColor, angle, height, wrapWidth, lineSpace,
                                    textStyle, styleId]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.retCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },    
     this.updateTextOnFlowchart = function (isActionPoint, id, text, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/UpdateTextOnFlowchart',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, isActionPoint, id, text]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.updateTextsOnFlowchart = function (inputArray, resCallback) {
        try {
            var that = this;

            var splitCount = 20;
            if (inputArray.length < splitCount) {
                that.updateTextsFromArray(inputArray, resCallback);
            }
            else {
                that.updateTextsHandler(inputArray, splitCount, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.updateTextsHandler = function (inputArray, splitCount, resCallback) {
         var that = this;
         var tempArray = inputArray.slice(0, splitCount);

         if (inputArray.length <= splitCount) {
             that.updateTextsFromArray(inputArray, function (retCode) {
                 resCallback(retCode);
                 return;
             });
         }
         else {
             //textArray.splice(0, splitCount);
             inputArray = inputArray.slice(splitCount, inputArray.length);
             that.updateTextsFromArray(tempArray, function (retCode) {
                 that.updateTextsHandler(inputArray, splitCount, resCallback);
             });
         }
     },
    this.updateTextsFromArray = function (inputArray, resCallback) {
        var that = this;
        var dataXml = "<UPDATETEXT>";
        for (var item in inputArray) {
            dataXml += "<ITEM>";
            var textData = inputArray[item];
            dataXml += "<ISACTIONPOINT>";
            dataXml += textData[0];
            dataXml += "</ISACTIONPOINT>";
            dataXml += "<ID>";
            dataXml += textData[1];
            dataXml += "</ID>";
            dataXml += "<TEXT>";
            dataXml += textData[2];
            dataXml += "</TEXT>";
            dataXml += "</ITEM>";
        }
        dataXml += "</UPDATETEXT>";
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/UpdateTextsOnFlowchart',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
     this.selectTextOfShape = function (xCoord, yCoord, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SelectTextOfShape',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, xCoord, yCoord]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.IsBox, returnObject.Id);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.getBoxId = function (boxHandle, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetBoxId',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, boxHandle]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode, returnObject.ActionId);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
     this.getConnectorId = function (connectorHandle, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetConnectorId',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, connectorHandle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.OutcomeId);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
     },    
    this.getItemId = function (Handle, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetItemId',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, Handle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Id, returnObject.IsActionPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
     this.deleteActionPoint = function (actionId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/DeleteActionPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, actionId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0)
                        that.m_iWhizApi.hideGrips();
                    resCallback(returnObject.returnCode, returnObject.DeletedOutcomeIds);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
     },
    this.deleteOutcome = function (outcomeId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/DeleteOutcome',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, outcomeId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0)
                        that.m_iWhizApi.hideGrips();
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.deleteEndRectangle = function (endrectId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/DeleteEndRectangle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, endrectId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
     },
    this.showHideCirclesInFlowchart = function (isShow, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ShowHideCirclesInFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, isShow]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.showHideActionPointsInFlowchart = function (actionPointIds, isShow, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ShowHideActionPointsInFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, actionPointIds, isShow]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.showHideOutcomesInFlowchart = function (outcomeIds, isShow, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ShowHideOutcomesInFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, outcomeIds, isShow]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.showHideEndPointsInFlowchart = function (endPointIds, isShow, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ShowHideEndPointsInFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, endPointIds, isShow]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.arrangeFlowchart = function (arrangeType, isByActionPointNumber, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ArrangeFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, arrangeType, isByActionPointNumber]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.setBoxCount = function (count, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetBoxCount',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, count]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
 this.createActionPoints = function (actionPointArray, resCallback) {
     try {
         var that = this;

         var splitCount = 20;
         if (actionPointArray.length < splitCount) {
             that.createActionFromArray(actionPointArray, resCallback);
         }
         else {
             that.createActionHandler(actionPointArray, splitCount, resCallback);
         }

     }
     catch (e) {
         resCallback(iWhizError.UNEXPECTED_ERROR);
     }
 },
    this.createActionHandler = function (actionPointArray, splitCount, resCallback) {
        var that = this;
        var tempArray = actionPointArray.slice(0, splitCount);

        if (actionPointArray.length <= splitCount) {
            that.createActionFromArray(actionPointArray, function (retCode) {
                resCallback(retCode);
                return;
            });
        }
        else {
            //textArray.splice(0, splitCount);
            actionPointArray = actionPointArray.slice(splitCount, actionPointArray.length);
            that.createActionFromArray(tempArray, function (retCode) {
                that.createActionHandler(actionPointArray, splitCount, resCallback);
            });
        }
    },
    this.createActionFromArray = function (textArray, resCallback) {
        var that = this;
        var dataXml = "<ACTIONPOINT>";
        for (var item in textArray) {
            dataXml += "<ACTION_ITEM>";
            var textData = textArray[item];
            dataXml += "<ACTION_ID>";
            dataXml += textData[0];
            dataXml += "</ACTION_ID>";
            dataXml += "<ACTION_TEXT>";
            dataXml += textData[1];
            dataXml += "</ACTION_TEXT>";
            dataXml += "<ACTION_NUMBER>";
            dataXml += textData[2];
            dataXml += "</ACTION_NUMBER>";
            dataXml += "<ACTION_COORDS>";
            dataXml += textData[3];
            dataXml += "</ACTION_COORDS>";
            dataXml += "</ACTION_ITEM>";
        }
        dataXml += "</ACTIONPOINT>";
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateActionPoints',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.createEndPoints = function (endPointArray, resCallback) {
        try {
            var that = this;

            var splitCount = 20;
            if (endPointArray.length < splitCount) {
                that.createEndFromArray(endPointArray, resCallback);
            }
            else {
                that.createEndHandler(endPointArray, splitCount, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createEndHandler = function (endPointArray, splitCount, resCallback) {
        var that = this;
        var tempArray = endPointArray.slice(0, splitCount);

        if (endPointArray.length <= splitCount) {
            that.createEndFromArray(endPointArray, function (retCode) {
                resCallback(retCode);
                return;
            });
        }
        else {
            //textArray.splice(0, splitCount);
            endPointArray = endPointArray.slice(splitCount, endPointArray.length);
            that.createEndFromArray(tempArray, function (retCode) {
                that.createEndHandler(endPointArray, splitCount, resCallback);
            });
        }
    },
    this.createEndFromArray = function (textArray, resCallback) {
        var that = this;
        var dataXml = "<ENDPOINT>";
        for (var item in textArray) {
            dataXml += "<END_ITEM>";
            var textData = textArray[item];
            dataXml += "<END_ID>";
            dataXml += textData[0];
            dataXml += "</END_ID>";
            dataXml += "<END_TEXT>";
            dataXml += textData[1];
            dataXml += "</END_TEXT>";
            dataXml += "<END_COORDS>";
            dataXml += textData[2];
            dataXml += "</END_COORDS>";
            dataXml += "</END_ITEM>";
        }
        dataXml += "</ENDPOINT>";
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateEndPoints',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.createOutcomes = function (outcomeArray, resCallback) {
        try {
            var that = this;

            var splitCount = 20;
            if (outcomeArray.length < splitCount) {
                that.createOutcomeFromArray(outcomeArray, resCallback);
            }
            else {
                that.createOutcomeHandler(outcomeArray, splitCount, resCallback);
            }

        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createOutcomeHandler = function (outcomeArray, splitCount, resCallback) {
        var that = this;
        var tempArray = outcomeArray.slice(0, splitCount);

        if (outcomeArray.length <= splitCount) {
            that.createOutcomeFromArray(outcomeArray, function (retCode) {
                resCallback(retCode);
                return;
            });
        }
        else {
            //textArray.splice(0, splitCount);
            outcomeArray = outcomeArray.slice(splitCount, outcomeArray.length);
            that.createOutcomeFromArray(tempArray, function (retCode) {
                that.createOutcomeHandler(outcomeArray, splitCount, resCallback);
            });
        }
    },
    this.createOutcomeFromArray = function (textArray, resCallback) {
        var that = this;
        var dataXml = "<OUTCOME>";
        for (var item in textArray) {
            dataXml += "<OUTCOME_ITEM>";
            var textData = textArray[item];
            dataXml += "<OUTCOME_ID>";
            dataXml += textData[0];
            dataXml += "</OUTCOME_ID>";
            dataXml += "<OUTCOME_TEXT>";
            dataXml += textData[1];
            dataXml += "</OUTCOME_TEXT>";
            dataXml += "<FROMACTION_ID>";
            dataXml += textData[2];
            dataXml += "</FROMACTION_ID>";
            dataXml += "<TOACTION_ID>";
            dataXml += textData[3];
            dataXml += "</TOACTION_ID>";
            dataXml += "<ENDACTION_TYPE>";
            dataXml += textData[4];
            dataXml += "</ENDACTION_TYPE>";
            dataXml += "<ENDACTION_TEXT>";
            dataXml += textData[5];
            dataXml += "</ENDACTION_TEXT>";
            dataXml += "<CONNECTOR_TYPE>";
            dataXml += textData[6];
            dataXml += "</CONNECTOR_TYPE>";
            dataXml += "<OUTCOME_COORDS>";
            dataXml += textData[7];
            dataXml += "</OUTCOME_COORDS>";
            dataXml += "</OUTCOME_ITEM>";
        }
        dataXml += "</OUTCOME>";
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateOutcomes',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId, dataXml]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
     this.createActionPoint = function (actionId, text, actionNumber, coordinates, resCallback) {
         try {
             var that = this;
             $.ajax({
                 url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateActionPoint',
                 type: "POST",
                 headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                 data: JSON.stringify([this.m_iWhizApi.m_DwgId, actionId, text, actionNumber, coordinates]),
                 contentType: 'application/json; charset=utf-8',
                 success: function (returnObject) {
                     resCallback(returnObject.returnCode);
                 },
                 error: function (xhr) {
                     resCallback(9);
                 }
             });
         }
         catch (e) {
             resCallback(iWhizError.UNEXPECTED_ERROR);
         }
     },
    this.createEndPoint = function (endId, text, coordinates, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateEndPoint',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, endId, text, coordinates]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.createOutcome = function (outcomeId, text, fromActionId, toActionId, endActionType, endActionText, connectorType, coordinates, hidetimeout, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/CreateOutcome',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, outcomeId, text, fromActionId, toActionId, endActionType, endActionText, connectorType, coordinates ,hidetimeout]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.setFlowchartDefaultParams = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SetFlowchartDefaultParams',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.saveFlowchartView = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/SaveFlowchartView',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.XMLData);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.openFlowchartView = function (xmlString, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/OpenFlowchartView',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, xmlString]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getBoxHandle = function (actionId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetBoxHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, actionId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.BoxHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getConnectorHandle = function (outcomeId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetConnectorHandle',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, outcomeId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ConnectorHandle);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getAllIdsInFlowchart = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetAllIdsInFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.ActionIds, returnObject.OutcomeIds, returnObject.EndPointIds);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.isItemExistsOnFlowchart = function (itemType, id, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/IsItemExistsOnFlowchart',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, itemType, id]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.IsExists);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getOutcomeDetails = function (outcomeId, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetOutcomeDetails',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, outcomeId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.FromActionId, returnObject.ToActionId, returnObject.OutcomeText);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.exitGripMode = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/ExitGripMode',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.getSelectedFlowchartId = function (handle, resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetSelectedFlowchartId',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, handle]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.Id, returnObject.IsActionPoint);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.initiateWorkFlow = function(resCallback)
    {
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/InitiateWorkFlow',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                resCallback(returnObject.returnCode);
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.moveActionPoint = function (direction, resCallback) {
        var that = this;
        $.ajax({
            url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/MoveActionPoint',
            type: "POST",
            headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
            data: JSON.stringify([this.m_iWhizApi.m_DwgId, direction]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                that.m_iWhizApi.m_Grip.updateGrips(function (retCode) {
                    resCallback(returnObject.returnCode);
                });
            },
            error: function (xhr) {
                resCallback(9);
            }
        });
    },
    this.getEntityAndSnapPoints = function (currentMoveX, currentMoveY, resCallback)
    {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/GetEntityAndSnapPoints',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId, currentMoveX, currentMoveY]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode, returnObject.SnapHandle, returnObject.XValue, returnObject.YValue, returnObject.SnapPoints);                   
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.startUndoRecording = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/StartUndoRecording',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.disableUndoRecording = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/DisableUndoRecording',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    resCallback(returnObject.returnCode);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.undo = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/Undo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.m_iWhizApi.m_Grip.hideGrips();
                    resCallback(returnObject.returnCode, returnObject.ChangedOutcomeId, returnObject.ChangedFromId, returnObject.ChangedToId);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.redo = function (resCallback) {
        try {
            var that = this;
            $.ajax({
                url: this.m_iWhizApi.m_BaseURL + '/api/iWhiz/Redo',
                type: "POST",
                headers: { "__RequestVerificationToken": this.m_iWhizApi.m_csrfToken },
                data: JSON.stringify([this.m_iWhizApi.m_DwgId]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    that.m_iWhizApi.m_Grip.hideGrips();
                    resCallback(returnObject.returnCode, returnObject.ChangedOutcomeId, returnObject.ChangedFromId, returnObject.ChangedToId);
                },
                error: function (xhr) {
                    resCallback(9);
                }
            });
        }
        catch (e) {
            resCallback(iWhizError.UNEXPECTED_ERROR);
        }
    }
};