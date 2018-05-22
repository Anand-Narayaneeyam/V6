Entity = function (objiWhizApi) {

    this.m_IsTrails = false;
    this.m_TrailsObject = null;
    this.m_TrailColor = 0;
    this.m_iWhizApi = objiWhizApi;

    this.getEntityMetaFile = function (entityHandle, metaFile) {
        metaFile[0] = this.m_iWhizApi.m_WebApp.viewer.getMetafile(String(entityHandle));
    },

    this.getEntityLayer = function (entityHandle, layerName, objLayer) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            var entitymetafile = [];
            this.getEntityMetaFile(String(entityHandle), entitymetafile);

            if (!entitymetafile[0]) return iWhizError.INVALID_ENTITY;
            objLayer.getLayerName(entitymetafile[0].layer, layerName);

            return iWhizError.SUCCESS;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.getEntityVisibility = function (entityHandle, visibility) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            var entitymetafile = [];
            this.getEntityMetaFile(String(entityHandle), entitymetafile);

            if (!entitymetafile[0]) return iWhizError.INVALID_ENTITY;

            visibility[0] = entitymetafile[0].visible;
            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }

    },
    this.setEntityVisibility = function (entityHandle, visibility) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            var entitymetafile = [];
            this.getEntityMetaFile(String(entityHandle), entitymetafile);

            if (!entitymetafile[0]) return iWhizError.INVALID_ENTITY;

            entitymetafile[0].visible = visibility;
            return iWhizError.SUCCESS;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setEntitiesVisibility = function (entityHandles, visibility) {
        try {
            if (entityHandles == "") return iWhizError.HANDLE_INVALID;
            var handleArray = entityHandles.split(";");
            for (var index = 0; index < handleArray.length; index++) {
                if (handleArray[index] != "") {
                    var entitymetafile = [];
                    this.getEntityMetaFile(String(handleArray[index]), entitymetafile);

                    if (!entitymetafile[0])
                        break;

                    entitymetafile[0].visible = visibility;
                }
            }
            return iWhizError.SUCCESS;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },
    this.setEntityLayer = function (entityHandle, layerName, objLayer) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;

            var layerId = [0];
            var result = objLayer.getLayerId(layerName, layerId);
            if (result != iWhizError.SUCCESS)
                return result;
            else {
                var entitymetafile = [];
                this.getEntityMetaFile(String(entityHandle), entitymetafile);
                entitymetafile[0].layer = layerId[0];
            }
            return iWhizError.SUCCESS;

        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    },   
    
    this.highlightEntity = function (entityHandle, isHighlight) {
        try {
            if (entityHandle == "") return iWhizError.HANDLE_INVALID;
            var entitymetafile = [];
            this.getEntityMetaFile(String(entityHandle), entitymetafile);

            if (!entitymetafile[0]) return iWhizError.INVALID_ENTITY;
            entitymetafile[0].highlighted = isHighlight;

            return iWhizError.SUCCESS;
        }
        catch (e) {
            return iWhizError.UNEXPECTED_ERROR;
        }
    }
}