
var viewer = null;
var browser = null;
var keepTarget = false;
var isTransparent = false;
var isShowWalls = true;
var isShowSpaces = true;
var states = xState;
var types = xProductType;
var bIsPropLoaded = false;
var m_modelId = null;
function InitBrowser(productLabel, jsonData, productIds)
{
    browser = new xBrowser();

    blob = new Blob([jsonData], { type: "text/plain" });
    browser.load(blob, productIds);
   // $('#btnModel').show();

    browser.on("loaded", function (args) {
        var facility = args.model.facility;
        //render parts
        browser.renderSpatialStructure("structure", true);
        browser.renderAssetTypes("assetTypes", true);
        browser.renderSystems("systems");
        browser.renderZones("zones");
        browser.renderContacts("contacts");
        browser.renderDocuments(facility[0], "facility-documents");

        $('input[type="checkbox"]').change(checkboxChanged);

        function checkboxChanged() {
            var $this = $(this),
                checked = $this.prop("checked"),
                container = $this.parent(),
                siblings = container.siblings();

            container.find('input[type="checkbox"]')
            .prop({
                indeterminate: false,
                checked: checked
            })
            .siblings('label')
            .removeClass('custom-checked custom-unchecked custom-indeterminate')
            .addClass(checked ? 'custom-checked' : 'custom-unchecked');

            checkSiblings(container, checked);
        }

        function checkSiblings($el, checked) {
            var parent = $el.parent().parent(),
                all = true,
                indeterminate = false;

            $el.siblings().each(function () {
                return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
            });

            if (all && checked) {
                parent.children('input[type="checkbox"]')
                .prop({
                    indeterminate: false,
                    checked: checked
                })
                .siblings('label')
                .removeClass('custom-checked custom-unchecked custom-indeterminate')
                .addClass(checked ? 'custom-checked' : 'custom-unchecked');

                checkSiblings(parent, checked);
            }
            else if (all && !checked) {
                indeterminate = parent.find('input[type="checkbox"]:checked').length > 0;

                parent.children('input[type="checkbox"]')
                .prop("checked", checked)
                .prop("indeterminate", indeterminate)
                .siblings('label')
                .removeClass('custom-checked custom-unchecked custom-indeterminate')
                .addClass(indeterminate ? 'custom-indeterminate' : (checked ? 'custom-checked' : 'custom-unchecked'));

                checkSiblings(parent, checked);
            }
            else {
                $el.parents("li").children('input[type="checkbox"]')
                .prop({
                    indeterminate: true,
                    checked: false
                })
                .siblings('label')
                .removeClass('custom-checked custom-unchecked custom-indeterminate')
                .addClass('custom-indeterminate');
            }
        }
        //var spaceStyle = viewer.defineStyle([]);
        //open and selectfacility node
        $("#structure > ul > li").click();
       // viewer.zoomTo(productlabel);
       
        //$('#btnModel').show(); 
        //$('#btnDescription').show();
        $('#modelIndicator').hide();
        bIsPropLoaded = true;
    });

    browser.on("entityClick", function (args) {
        var span = $(args.element).children("span.xbim-entity");
        if (document._lastSelection)
            document._lastSelection.removeClass("ui-selected");
        span.addClass("ui-selected")
        document._lastSelection = span;
    });
    browser.on("entityActive", function (args) {
        var isRightPanelClick = false;
        if (args.element)
            if ($(args.element).parents("#semantic-descriptive-info").length != 0)
                isRightPanelClick = true;

        //set ID for location button
        $("#btnLocate").data("id", args.entity.id);

        browser.renderPropertiesAttributes(args.entity, "attrprop");
        browser.renderAssignments(args.entity, "assignments");
        browser.renderDocuments(args.entity, "documents");
        browser.renderIssues(args.entity, "issues");

        if (isRightPanelClick)
            $("#attrprop-header").click();

    });

    browser.on("entityDblclick", function (args) {
        var entity = args.entity;
        var allowedTypes = ["space", "assettype", "asset"];
        if (allowedTypes.indexOf(entity.type) === -1) return;

        var id = parseInt(entity.id);
        if (id && viewer) {
            viewer.resetStates();
            //viewer.renderingMode = "x-ray";
            if (entity.type === "assettype") {
                var ids = [];
                for (var i = 0; i < entity.children.length; i++) {
                    id = parseInt(entity.children[i].id);
                    ids.push(id);
                }
                viewer.setState(xState.HIGHLIGHTED, ids);
            }
            else {
                viewer.setState(xState.HIGHLIGHTED, [id]);
            }
            viewer.zoomTo(id);
            keepTarget = true;
        }
    });
}

// mat4, mat3, vec3 are additional arguments used in gl-matrix.js
function InitViewer(byteArray, jsonData, productIds, productlabel, mat4, mat3, vec3)
{
    //viewer set up
    var check = xViewer.check();
    if (check.noErrors) {
        //alert('WebGL support is OK');
        viewer = new xViewer("viewer-canvas", mat4, vec3);
        viewer.background = [249, 249, 249, 255];
        //  viewer.highlightingColour = [0, 0, 255, 255];
        
        viewer.on("loaded", function (args) {
            m_modelId = args.id;

            $("#loadingScreen").hide();
            if (!bIsPropLoaded)
                 $('#modelIndicator').show();
            viewer.zoomTo(productlabel);
        });
        viewer.on("mouseDown", function (args) {
            if (!keepTarget) viewer.setCameraTarget(args.id);
        });
        viewer.on("pick", function (args) {
           // if(args.id!=null)
            {
            browser.activateEntity(args.id);
            viewer.renderingMode = "normal";
            var id = args.id;
            viewer.resetStates();
            viewer.setState(xState.HIGHLIGHTED, [id]);
            keepTarget = false;
            }
            
        });
        viewer.on("dblclick", function (args) {
            viewer.resetStates();
            //  viewer.renderingMode = "x-ray";
            var id = args.id;
            viewer.setState(xState.HIGHLIGHTED, [id]);
            viewer.zoomTo(id);
            keepTarget = true;
        });
        viewer.on("mouseMove", function (args) {
            if (args.id != null) {
                if (null == browser) return;
                var entity = browser._model.getEntity(args.id);
                if (entity != null) {
                    var propArray = entity.properties;
                    var ifcType = "";
                    for (var item in propArray) {
                        if (propArray[item].id == "ExternalEntity") {
                            ifcType = propArray[item].value;
                            break;
                        }
                    }
                    var tooltipData = "", header = "";
                    if (ifcType != "") {
                        header = ifcType.replace("Ifc", "");
                        tooltipData += "<center><label id=Header style=margin-left:5px;margin-right:5px;color:Brown;display: block;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;><b>" + header + "</b></label>" + "<br></center>";

                    }
                    tooltipData += "<label id=ID style=margin-left:5px;padding-top:3px;margin-right:5px;text-align:left;color:black;display: inline-block;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;>ID : <span style=color:blue>#" + entity.id + "</span></label>" + "<br>";
                    tooltipData += "<label id=Name style=margin-left:5px;margin-right:5px;text-align:left;color:black;display: inline-block;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;>Name: <span style=color:blue>" + entity.name + "</span></label>" + "<br>";
                    if (ifcType != "")
                        tooltipData += "<label id=IFCType style=margin-left:5px;margin-right:5px;text-align:left;color:black;display: inline-block;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;>IFC Type: <span style=color:blue>" + ifcType + "</span></label>" + "<br>";

                    $("#quickProperties").html(tooltipData);
                    $("#quickProperties").css({ position: "absolute", right: "auto", bottom: "auto", top: args.clientY - 150, left: args.clientX - 150, opacity: 1 });
                    $("#quickProperties").show();
                }
                else
                    $("#quickProperties").hide();
            }
            else
                $("#quickProperties").hide();
        });


        var blob = new Blob([byteArray], { type: "text/plain" });
        viewer.load(blob);

        //blob = new Blob([jsonData], { type: "text/plain" });
        //browser.load(blob, productIds);

       // $("#loadingScreen").hide();
        var cube = new xNavigationCube(mat3);
        cube.passiveAlpha = .6;
        cube.ratio = .1;
        viewer.addPlugin(cube);
        viewer.defineStyle(1, [0, 0, 255, 100]);  //semitransparent blue

        viewer.start();

        viewer.setState(states.UNDEFINED, types.IFCSPACE);
    }
    else {
        alert("WebGL support is unsufficient");
        var msg = document.getElementById("msg");
        msg.innerHTML = "";
        for (var i in check.errors) {
            if (check.errors.hasOwnProperty(i)) {
                var error = check.errors[i];
                msg.innerHTML += "<div style='color: red;'>" + error + "</div>";
            }
        }
    }
}
function InitControls(productLabel)
{
    $("#semantic-descriptive-info").accordion({
        heightStyle: "fill"
    });
    $("#semantic-model").accordion({
        heightStyle: "fill"
    });

    $("#btnExtents").click(function () {
        if (productLabel != "")
            viewer.zoomTo(productLabel);
        else
            ZoomExtents();
    });

    $("#btnWalls").click(function () {
        ShowHideWalls();
    });

    $("#btnSpaces").click(function () {
        ShowHideSpaces();
    });

    $("#btnGlass").click(function () {
        if (!isTransparent) {
            for (var i in types) {
                if (types[i] !== types.IFCSPACE) {
                    viewer.setStyle(1, types[i])
                }
            }
        }
        else {
            for (var i in types) {
                if (types[i] !== types.IFCSPACE) {
                    viewer.setStyle(xState.UNSTYLED, types[i])
                }
            }
        }
        isTransparent = !isTransparent;
    });

    $("#btnLocate").click(function () {
        var id = $(this).data("id");
        if (typeof (id) != "undefined" && viewer) {
            viewer.zoomTo(parseInt(id));
        }
    });

    $("#sel_proj").select().change(function () {
        if ($("#sel_proj").val() == "1") {
            viewer.camera = 'perspective';
        }
        else if ($("#sel_proj").val() == "2") {
            viewer.camera = 'orthogonal';
        }
    });

    $("#camView").click(function () {
        if ($("#camViewSubMenu").css('visibility') === 'hidden') {

            $("#camViewSubMenu").css('visibility', 'visible');
            $("#toolbar-camera").addClass('divSelection');
        }
        else
        {
            $("#camViewSubMenu").css('visibility', 'hidden');
            $("#toolbar-camera").removeClass('divSelection');
        }
    });

    $("#sel_view").select().change(function () {
        switch ($("#sel_view").val()) {
            case "1":
                viewer.show('top');
                break;
            case "2":
                viewer.show('bottom');
                break;
            case "3":
                viewer.show('front');
                break;
            case "4":
                viewer.show('back');
                break;
            case "5":
                viewer.show('left');
                break;
            case "6":
                viewer.show('right');
                break;
        }

    });

    $("#top").click(function ()
    {
        viewer.show('top');
    });
    $("#bottom").click(function () {
        viewer.show('bottom');
    });
    $("#front").click(function () {
        viewer.show('front');
    });
    $("#back").click(function () {
        viewer.show('back');
    });
    $("#left").click(function () {
        viewer.show('left');
    });
    $("#right").click(function () {
        viewer.show('right');
    });

    $("#btnDescription").button().click(function () {
        $('#semantic-descriptive-info-container').fadeToggle();
    });

    $("#btnModel").button().click(function () {
        $('#semantic-model-container').fadeToggle();
    });

    $("#semantic-model-container").mousemove(function (event) {
        $("#quickProperties").hide();
    });

    $("#semantic-descriptive-info-container").mousemove(function (event) {
        $("#quickProperties").hide();
    });

    $("#toolbar button").button();

    $("#showModelView").click(function () {
        if ($("#showModelView").hasClass("divSelection"))
        {
            //$('#btnModel').hide();
            $("#showModelView").removeClass("divSelection");
            $('#semantic-model-container').hide();
        }
        else
        {
           // $('#btnModel').show();
            $("#showModelView").addClass("divSelection");
            $('#semantic-model-container').fadeToggle();
        }
        
    });

    $("#showProperties").click(function () {
        if ($("#showProperties").hasClass("divSelection")) {
            //$('#btnModel').hide();
            $("#showProperties").removeClass("divSelection");
            $('#semantic-descriptive-info-container').hide();
        }
        else {
            // $('#btnModel').show();
            $("#showProperties").addClass("divSelection");
            $('#semantic-descriptive-info-container').fadeToggle();
        }

    });
    
}

function OpenFile(modelId, customer, productlabel, drawingId, revisionNo, mat4, mat3, vec3, resCallback) {
    try {
        
        $("#loadingScreen").height(innerHeight);
        $("#loadingScreen").width(innerWidth);
        $("#loadingScreen").show();
        $("#modelmenu").hide();
        $('#btnModel').hide();
        $('#btnDescription').hide();
        $('#modelIndicator').hide();
        $("#viewer-controls").show();
        
        $.ajax({
            url: 'api/WexBimData/GetWexBimData',
            type: "POST",
            dataType: "json",
            data: JSON.stringify([modelId, customer, productlabel, drawingId, revisionNo]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                if (returnObject.returnCode == 0) {
                    InitControls(productlabel);
                  //  InitBrowser(productlabel);
                    var WexBimData = _base64ToArrayBuffer(returnObject.WexBimData);
                    //var jsonData = _base64ToArrayBuffer(returnObject.JsonData);
                    var jsonData = "";
                    var productIds = returnObject.ProductIds;
                    var parentIds = returnObject.ParentIds;

                    InitViewer(WexBimData, jsonData, productIds + parentIds, productlabel, mat4, mat3, vec3);
                    
                    resCallback(0);
                    //$('#modelIndicator').show();
                    //OpenJsonFile(modelId, customer, productlabel);
                }
                else
                {
                    alert("Open failed with error code : " + returnObject.returnCode);
                    $("#loadingScreen").hide();
                    $("#modelmenu").show();
                    $("#viewer-controls").hide();
                    resCallback(returnObject.returnCode);
                }
            },
            error: function (xhr) {
                console.log(xhr);
                resCallback(9);
            }
        });

        OpenJsonFile(modelId, customer, productlabel, drawingId, revisionNo);
    }
    catch (x) {
        console.log(x);
        resCallback(9);
    }
}

function OpenJsonFile(modelId, customer, productlabel, drawingId, revisionNo) {

    try {
       // $('#modelIndicator').show();
        $.ajax({
            url: 'api/WexBimData/GetJsonData',
            type: "POST",
            dataType: "json",
            data: JSON.stringify([modelId, customer, productlabel, drawingId, revisionNo]),
            contentType: 'application/json; charset=utf-8',
            success: function (returnObject) {
                if (returnObject.returnCode == 0) {
                    var jsonData = _base64ToArrayBuffer(returnObject.JsonData);
                    InitBrowser(productlabel, jsonData, "");
                }
                else {
                    alert("Open failed with error code : " + returnObject.returnCode);
                    $('#modelIndicator').hide();
                }
            },
            error: function (xhr) {
                console.log(xhr);
                $('#modelIndicator').hide();
            }
        });
    }
    catch (x) {
        console.log(x);
        $('#modelIndicator').hide();
    }
}


window.onload = function () {
    if ((filename != "" && customer != "") || (filename != "" && productlabel != "")) {
        
        OpenFile(filename, customer, productlabel, function (returnCode) {
        });// loading model from iDrawings
       
    }
    else {
        if ((customer != "" && drawingId != 0) || (productlabel != "" && drawingId != 0)) {
            if (filename == "")
                ShowHideInstructionDlg(true, "File not found", false);
        }
        else
            $("#modelmenu").show();
    }
};

//$(window).resize(function () {
//    reinitControls();
//});


//to show/hide instruction dialog and to set text in it
function ShowHideInstructionDlg(bIsShow, text, bIsRefresh) {
    if (bIsShow) {
        $("#divInstrucDlg").show();
        $("#labelInstrcDlg").text(text);

        $("#butt_InstrcDlgOk").button().click(function () {
            $("#divInstrucDlg").hide();
            if (bIsRefresh)
                location.reload();
        });
    }
    else
        $("#divInstrucDlg").hide();
}

function ZoomExtents() {
    var meter = viewer._handles[0]._model.meter;
    if (viewer._handles.length === 1) {
        //set centre and default distance based on the most populated region in the model
        viewer.setCameraTarget();

        //set perspective camera near and far based on 1 meter dimension and size of the model
        var region = viewer._handles[0].region;
        var maxSize = Math.max(region.bbox[3], region.bbox[4], region.bbox[5]);
        viewer.perspectiveCamera.far = maxSize * 50;
        viewer.perspectiveCamera.near = meter / 10.0;

        //set orthogonalCamera boundaries so that it makes a sense
        viewer.orthogonalCamera.far = viewer.perspectiveCamera.far;
        viewer.orthogonalCamera.near = viewer.perspectiveCamera.near;
        var ratio = 1.8;
        viewer.orthogonalCamera.top = maxSize / ratio;
        viewer.orthogonalCamera.bottom = maxSize / ratio * -1;
        viewer.orthogonalCamera.left = maxSize / ratio * -1 * viewer._width / viewer._height;
        viewer.orthogonalCamera.right = maxSize / ratio * viewer._width / viewer._height;

        //set default view
        viewer.setCameraTarget();
        var dist = Math.sqrt(viewer._distance * viewer._distance / 3.0);
        viewer.setCameraPosition([region.centre[0] + dist * -1.0, region.centre[1] + dist * -1.0, region.centre[2] + dist]);
    }
}
function ShowHideWalls() {
    if (isShowWalls)
        HideWalls();
    else
        ShowWalls();
    isShowWalls = !isShowWalls;
}

function HideWalls() {

    viewer.setState(states.HIDDEN, types.IFCWALLSTANDARDCASE);
    viewer.setState(states.HIDDEN, types.IFCCURTAINWALL);
    viewer.setState(states.HIDDEN, types.IFCWALL);
    
}

var ShowWalls = function () {

    viewer.setState(states.UNDEFINED, types.IFCWALLSTANDARDCASE);
    viewer.setState(states.UNDEFINED, types.IFCCURTAINWALL);
    viewer.setState(states.UNDEFINED, types.IFCWALL);
    
}

function ShowHideSpaces() {
    if (isShowSpaces)
        HideSpaces();
    else
        ShowSpaces();
    isShowSpaces = !isShowSpaces;
}

function HideSpaces() {
    viewer.setState(states.HIDDEN, types.IFCSPACE);
}

var ShowSpaces = function () {
    viewer.setState(states.UNDEFINED, types.IFCSPACE);
}

function HideSlabs() {
    viewer.setState(states.HIDDEN, types.IFCSLAB);
}

var ShowSlabs = function () {
    viewer.setState(states.UNDEFINED, types.IFCSLAB);
}
var ShowHideItem = function (entity, isShow) {

    var entityType = (entity.type).toLowerCase();
    if (entityType == 'site' || entityType == 'facility' || entityType == 'building')
    {
        var typeArray = Object.keys(types).map(function (type) {
            return types[type];
        });

        if (isShow)
            for (var i in typeArray) {
                viewer.setState(states.UNDEFINED, typeArray[i]);
            }
        else
            for (var i in typeArray) {
                viewer.setState(states.HIDDEN, typeArray[i]);
            }

    }
    else
    {
        if (isShow)
            viewer.setState(states.UNDEFINED, [parseInt(entity.id)]);
        else
            viewer.setState(states.HIDDEN, [parseInt(entity.id)]);

        if (entity.children.length > 0) {
            for (var index = 0; index < entity.children.length; index++) {
                 ShowHideItem(entity.children[index], isShow);
              
            }

        }

    }
   
}


function reinitControls() {
    if ($("#semantic-model"))
        $("#semantic-model").accordion("refresh");
    if ($("#semantic-descriptive-info"))
        $("#semantic-descriptive-info").accordion("refresh");
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
function CloseModel() {
    if (m_modelId != null) {
        viewer.unload(m_modelId);
        m_modelId = null;
    }
}

