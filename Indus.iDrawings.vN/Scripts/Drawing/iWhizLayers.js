var IDrawingsPolyLineType = {
    IDRAWINGS_GROSS: 1,
    IDRAWINGS_CONSTRUCTION: 2,
    IDRAWINGS_SPACE: 3,
    IDRAWINGS_NET: 4,
    IDRAWINGS_SYMBOL: 5,
    IDRAWINGS_LINK: 6
};

Layer = function (objiWhizApi) {
    this.m_Layerinfo = "",
    this.m_Mandatory = [],
    this.m_Applicaton = [],
    this.m_Default = [],
    this.m_GrossLayer = "",
    this.m_NetLayer = "",
    this.m_SpaceLayer = "",
    this.m_ConstructionLayer = "",
    this.setLayerVisibility = function (layerId, layerName, status, objViewer) {
        try {
            objiWhizApi.m_WebApp.setMetafileVisibilityByLayer(layerName, status, objViewer.m_DisplayFlag);
            for (var i in this.m_Layerinfo) {

                if (this.m_Layerinfo[i].id == layerId) {
                 //   if (objiWhizApi.m_WebApp.getVersion() == 1) {
                        if (status)
                            this.m_Layerinfo[i].type = "On";
                        else
                            this.m_Layerinfo[i].type = "Off";
                    //}
                    //else {
                    //    if (status)
                    //        this.m_Layerinfo[i].isOn = true;
                    //    else
                    //        this.m_Layerinfo[i].isOn = false;
                    //}


                    return iWhizError.SUCCESS;
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setLayerInfo = function (data) {
        this.m_Layerinfo = data;
        this.m_Mandatory = [], this.m_Applicaton = [], this.m_Default = []; //reset array when new file is open
    },
    this.addNewLayer = function (layerName, layerid, visibility) {
        try {
            var typeVal;
            if (visibility)
                typeVal = "On"
            else
                typeVal = "Off"
            this.m_Layerinfo.push({ id: layerid, name: layerName, type: typeVal, isOn: visibility });
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.deleteLayer = function (layerName) {
        try {
            for (var i in this.m_Layerinfo) {
                if (this.m_Layerinfo[i].name == layerName) {
                    this.m_Layerinfo.splice(i, 1);
                    return iWhizError.SUCCESS;
                }
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.renameLayer = function (oldLayerName, newLayerName) {
        try {
            for (var i in this.m_Layerinfo) {
                if (this.m_Layerinfo[i].name == oldLayerName) {
                    this.m_Layerinfo[i].name = newLayerName;
                    return iWhizError.SUCCESS;
                }
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getLayerName = function (layerId, layerName) {
        try {
            for (var i in this.m_Layerinfo) {
                if (this.m_Layerinfo[i].id == layerId) {
                    layerName[0] = this.m_Layerinfo[i].name;
                    return iWhizError.SUCCESS;
                }

            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getLayerId = function (layerName, layerId) {
        try {
            layerId[0] = "";
            for (var i in this.m_Layerinfo) {
                if (this.m_Layerinfo[i].name == layerName) {
                    layerId[0] = this.m_Layerinfo[i].id;
                    break;
                }
            }
            if (layerId[0] == "")
                return iWhizError.LAYER_NOT_EXIST;
            else
                return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.layerExists = function (layerName, isExist) {
        try {
            isExist[0] = false;
            for (var i in this.m_Layerinfo) {
                if ((this.m_Layerinfo[i].name).toLowerCase() == layerName.toLowerCase()) {
                    isExist[0] = true;
                    return iWhizError.SUCCESS;
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getLayerVisibility = function (layerName, isVisible) {
        try {
            for (var i in this.m_Layerinfo) {

                if ((this.m_Layerinfo[i].name).toLowerCase() == layerName.toLowerCase()) {
                   // if (objiWhizApi.m_WebApp.getVersion() == 1) {
                        if (this.m_Layerinfo[i].type == "On")
                            isVisible[0] = true;
                        else
                            isVisible[0] = false;
                    //}
                    //else {
                    //    if (this.m_Layerinfo[i].isOn)
                    //        isVisible[0] = true;
                    //    else
                    //        isVisible[0] = false;
                    //}


                    return iWhizError.SUCCESS;
                }
            }

            return iWhizError.NAME_NOT_EXIST;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getLayerCount = function (layerCount) {
        try {
            layerCount[0] = (this.m_Layerinfo).length;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.hideAllLayers = function (objViewer, resCallBack) {
        try {
            var strLayerNames = "";
            for (var i in this.m_Layerinfo) {
               // if (objiWhizApi.m_WebApp.getVersion() == 1) {
                    if (this.m_Layerinfo[i].type == "On") {
                        this.m_Layerinfo[i].type = "Off";
                        strLayerNames += this.m_Layerinfo[i].name + objViewer.m_ColumnDelimiter + "false" + objViewer.m_RowDelimiter;
                    }
                //}
                //else {

                //    if (this.m_Layerinfo[i].isOn) {
                //        this.m_Layerinfo[i].isOn = false;
                //        strLayerNames += this.m_Layerinfo[i].name + objViewer.m_ColumnDelimiter + "false" + objViewer.m_RowDelimiter;
                //    }
                //}
            }
            objiWhizApi.setLayersVisibility(strLayerNames, resCallBack);
        }
        catch (e) {
            return resCallBack(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.showAllLayers = function (objViewer, resCallBack) {
        try {
            var strLayerNames = "";
            for (var i in this.m_Layerinfo) {
               // if (objiWhizApi.m_WebApp.getVersion() == 1) {
                    if (this.m_Layerinfo[i].type == "Off") {
                        this.m_Layerinfo[i].type = "On";
                        strLayerNames += this.m_Layerinfo[i].name + objViewer.m_ColumnDelimiter + "true" + objViewer.m_RowDelimiter;
                    }
                //}
                //else {
                //    if (!this.m_Layerinfo[i].isOn) {
                //        this.m_Layerinfo[i].isOn = true;
                //        strLayerNames += this.m_Layerinfo[i].name + objViewer.m_ColumnDelimiter + "true" + objViewer.m_RowDelimiter;
                //    }
                //}
            }
            objiWhizApi.setLayersVisibility(strLayerNames, resCallBack);

        }
        catch (e) {
            return resCallBack(iWhizError.UNEXPECTED_ERROR);
        }
    },
    this.setMandatoryLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Applicaton) != -1)) {
                return iWhizError.ALREADY_SET_AS_APLAYER;
            }
            else if (($.inArray(layerName, this.m_Mandatory) == -1)) {
                (this.m_Mandatory).push(layerName);
                return iWhizError.SUCCESS;
            }
            else {
                return iWhizError.LAYER_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.releaseMandatoryLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Mandatory) != -1)) {
                for (var i in this.m_Mandatory) {
                    if (this.m_Mandatory[i] == layerName) {
                        (this.m_Mandatory).splice(i, 1);
                        return iWhizError.SUCCESS;
                    }
                }
            }
            else {
                return iWhizError.LAYER_NOT_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setApplicationLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Mandatory) != -1)) {
                return iWhizError.ALREADY_SET_AS_MDLAYER;
            }
            else if (($.inArray(layerName, this.m_Default) != -1)) {
                return iWhizError.ALREADY_SET_AS_DFLAYER;
            }
            else if (($.inArray(layerName, this.m_Applicaton) == -1)) {
                (this.m_Applicaton).push(layerName);
                return iWhizError.SUCCESS;
            }
            else {
                return iWhizError.LAYER_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.releaseApplicationLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Applicaton) != -1)) {
                for (var i in this.m_Applicaton) {
                    if (this.m_Applicaton[i] == layerName) {
                        (this.m_Applicaton).splice(i, 1);
                        return iWhizError.SUCCESS;
                    }
                }

            }
            else {
                return iWhizError.LAYER_NOT_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setDefaultLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Applicaton) != -1)) {
                return iWhizError.ALREADY_SET_AS_APLAYER;
            }
            else if (($.inArray(layerName, this.m_Default) == -1)) {
                (this.m_Default).push(layerName);
                return iWhizError.SUCCESS;
            }
            else {
                return iWhizError.LAYER_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.releaseDefaultLayer = function (layerName) {
        try {
            if (($.inArray(layerName, this.m_Default) != -1)) {

                for (var i in this.m_Default) {
                    if (this.m_Default[i] == layerName) {
                        (this.m_Default).splice(i, 1);
                        return iWhizError.SUCCESS;
                    }
                }

            }
            else {
                return iWhizError.LAYER_NOT_EXIST;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.showDefaultLayer = function (objViewer) {
        try {
            this.hideAllLayers(objViewer);

            for (var i in this.m_Default) {
                for (var j in this.m_Layerinfo) {
                    if ((this.m_Layerinfo[j].name).toLowerCase() == (this.m_Default[i]).toLowerCase()) {
                        objiWhizApi.setLayerVisibility(this.m_Layerinfo[j].name, true, function (retCode) { });
                        break;
                    }
                }
            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setiDrawingsLayer = function (layerIndex, layerName) {
        try {
            if (layerName.length <= 0)
                return iWhizError.LAYER_NAME_EMPTY;
            if ($.inArray(layerName, this.m_GrossLayer) != -1 || $.inArray(layerName, this.m_ConstructionLayer) != -1 || $.inArray(layerName, this.m_SpaceLayer) != -1 || $.inArray(layerName, this.m_NetLayer) != -1) {
                return iWhizError.LAYER_EXIST;
            }
            switch (parseInt(layerIndex)) {
                case 0: this.m_GrossLayer = layerName;
                    break;
                case 1: this.m_ConstructionLayer = layerName;
                    break;
                case 2: this.m_SpaceLayer = layerName;
                    break;
                case 3: this.m_NetLayer = layerName;
                    break;
                default:
                    return iWhizError.LAYER_NOT_EXIST;

            }
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getiDrawingsLayer = function (layerIndex, layerName) {
        try {
            switch (layerIndex) {
                case 0: layerName[0] = this.m_GrossLayer;
                    break;
                case 1: layerName[0] = this.m_ConstructionLayer;
                    break;
                case 2: layerName[0] = this.m_SpaceLayer;
                    break;
                case 3: layerName[0] = this.m_NetLayer;
                    break;
                default: return iWhizError.LAYER_NOT_EXIST;
            }
            return iWhizError.SUCCESS;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getAlliDrawingsLayers = function (layerNames)
    {
        layerNames[0] = this.m_GrossLayer;
        layerNames[1] = this.m_ConstructionLayer;
        layerNames[2] = this.m_SpaceLayer;
        layerNames[3] = this.m_NetLayer;
    },
    this.getMissingMandatoryLayer = function (missingLayers) {
        try {
            layerNames = [];
            if (this.m_Mandatory.length == 0) {
                return iWhizError.SUCCESS;
            }
            else {
                for (var j in this.m_Layerinfo) {
                    layerNames.push(this.m_Layerinfo[j].name);

                }
                for (var i in this.m_Mandatory) {
                    var temp = this.m_Mandatory[i];
                    if (-1 == ($.inArray(temp, layerNames))) {
                        missingLayers.push(temp);
                    }
                }
                return iWhizError.SUCCESS;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }

    },
    this.getiDrawingsPolylineType = function (layerName, type) {

        try {
            if (layerName == (this.m_GrossLayer))
                type[0] = IDrawingsPolyLineType.IDRAWINGS_GROSS;
            else if (layerName == (this.m_ConstructionLayer))
                type[0] = IDrawingsPolyLineType.IDRAWINGS_CONSTRUCTION;
            else if (layerName == (this.m_SpaceLayer))
                type[0] = IDrawingsPolyLineType.IDRAWINGS_SPACE;
            else if (layerName == (this.m_NetLayer))
                type[0] = IDrawingsPolyLineType.IDRAWINGS_NET; // not completed   
            else return iWhizError.ENTITY_TYPE_DIFFERENT;

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.checkForMandatoryLayers = function () {
        try {

            if (this.m_Mandatory.length == 0) {
                return iWhizError.SUCCESS;
            }
            else {
                layerNames = [];
                for (var j in this.m_Layerinfo) {
                    layerNames.push(this.m_Layerinfo[j].name);
                }
                for (var i in this.m_Mandatory) {
                    var temp = this.m_Mandatory[i];
                    if (-1 == ($.inArray(temp, layerNames))) {
                        return iWhizError.MD_LAYER_MISSING;
                    }

                }
                return iWhizError.SUCCESS;
            }
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    }

};

