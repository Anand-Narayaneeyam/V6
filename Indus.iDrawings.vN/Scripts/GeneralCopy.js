function ajaxCallWithoutJson(url, parameters) {
  
    var dataResult;
    $.ajax({
        'async': false,
        'global': false,
        type: "POST",
        data: parameters,
        url: url,
        success: function (result) {
            dataResult = result

        }


    });
    return dataResult;


}

//Ajax Call without param
function ajaxCallAnalyticsPostMethod(url,param, $Dialogobj) {
    var isSuccess = true;
    $.ajax({
        url: url,
        type: 'POST',
        data: getTokenReq(param),
        success: function (result) {
            if (!result) {
                isSuccess = false;
            }
            else {
                $Dialogobj.html(result);
                isSuccess = true;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            return "";
        }
    });
    return isSuccess;
}
//Ajax Call Method for grid refresh
function ajaxCallGridRefresh(url, gridId) {
    //For Grid content        
    $.ajax({
        type: 'POST',
        url: url,
        data:getToken(),
        dataType: 'json',
        success: function (result) {
            gridRefreshData(result, gridId);
        },
        error: function (xhr, textStatus, errorThrown) {
            return "";
        }
    });

}
function ajaxCallParamGridRefresh(url, param, gridId) {
    //For Grid content   
    var succeed = false;
    $.ajax({
        type: 'POST',
        'async': false,
        'global': false,
        url: url,
        data: getTokenReq(param),
        dataType: 'json',
        success: function (result) {
            succeed = true;
            gridRefreshData(result, gridId);
        },
        error: function (xhr, textStatus, errorThrown) {
            return "";
        }
    });
    return succeed;

}
//-----------------From messageBox.js-------------------------------
function showAlertBox(msg) {//Messagebox with out grid page
    var $dvMessageBox = $("#dvMessageBox");
    var $dialogboxForMessage = $('#dialogboxForMessage');
    $dvMessageBox.html(msg);
    $(".ui-widget").css({ "font-weight": +"bold" });
    $dialogboxForMessage.dialog({
        title: 'iDrawings V6',
        showOnLoad: false,
        autoExpand: false,
        autoOpen: true,
        width: 370,
        modal: true,
        close: function () {
            $dialogboxForMessage.empty().dialog('destroy');
            $dvMessageBox.html('');

        },
        captionButtons: {
            minimize: { visible: false },
            maximize: { visible: false },
            pin: { visible: false },
            toggle: { visible: false },
            refresh: { visible: false }
        },
        buttons: {

            OK: function () {
                $dialogboxForMessage.dialog('destroy');
                $dvMessageBox.html('');
            }
        },
        show: 'fade',
        hide: 'fade',
        dialogClass: 'main-dialog-class'
    });
    $dialogboxForMessage.dialog("open");
}

function showConfirmationAlertBox(msg) {//Confirmation Messagebox with out grid page
    var $dvMessageBox = $("#dvMessageBox");
    $dvMessageBox.html(msg);
    $(".ui-widget").css({ "font-weight": +"bold" });
    var $dialogboxForMessage = $('#dialogboxForMessage');
    $dialogboxForMessage.dialog({
        title: 'Tech Advance+',
        showOnLoad: false,
        autoExpand: false,
        autoOpen: true,
        width: 390,
        modal: true,
        close: function () {
            $dialogboxForMessage.dialog('destroy');
            $dvMessageBox.html('');

        },
        captionButtons: {
            minimize: { visible: false },
            maximize: { visible: false },
            pin: { visible: false },
            toggle: { visible: false },
            refresh: { visible: false }
        },
        buttons: {

            Yes: function () {
                $dialogboxForMessage.dialog('destroy');
                $dvMessageBox.html('');
                Ok_OnClick();

            },
            No: function () {
                $dialogboxForMessage.dialog('destroy');
                $dvMessageBox.html('');
            }
        },
        show: 'fade',
        hide: 'fade',
        dialogClass: 'main-dialog-class'
    });
    $dialogboxForMessage.dialog("open");
}
function getToken(data)
{
    return $.extend(data, { '__RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val() });    
}

function getTokenReq(data)
{ 
    return (data +"&__RequestVerificationToken=" + $('input[name="__RequestVerificationToken"]').val());
}

var clearForm = function ($Container) {
    $Container.find('input:text, input:password, input:file, select, textarea').val('');
    $Container.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}
var clearValidation = function (container) {
    if (container !== null && container !== undefined && container.length > 0) {
        container.find(".field-validation-error").empty();
        container.find(".input-validation-error").removeClass("input-validation-error");
    }
}
var validateResponse = function (response, $Container) {
    
    if (response.toString().indexOf("field-validation-error") > 0 && $(response).find(".field-validation-error").length > 0) {
        $Container.html(response);
            
        //var $form = $Container.find('form');
        //$form.removeData("validator");
        //$form.removeData("unobtrusiveValidation");
        //$.validator.unobtrusive.parse($form);
        $(".field-validation-error").each(function (index) {
            $($(".field-validation-error")[index]).attr("title", $(".field-validation-error")[index].innerHTML);
        });
        $(".input-validation-error").on("keypress click",function () {
            $(this).siblings(".field-validation-error").html("");
            $(this).removeClass("input-validation-error");
        });
        if ($Container !== null && $Container !== undefined && $Container.length>0){
            assignFocusforFirstInputElement($Container);
        }
        return false;
    }
    return true;
};


function getDatawithToken(data) {
    var token = $('input[name="__RequestVerificationToken"]').val()
    $.extend(data, { '__RequestVerificationToken': token });
    return data;
}


function showConfirmationAlertBoxCallBack(msg, OkCallBack, closeCallBack) {//Messagebox with out grid page but passing callback function
    var $dvMessageBox = $("#dvMessageBox");
    $dvMessageBox.html(msg);
    $(".ui-widget").css({ "font-weight": +"bold" });
    var $dialogboxForMessage = $('#dialogboxForMessage');
    $dialogboxForMessage.dialog({
        title: 'Tech Advance+',
        showOnLoad: false,
        autoExpand: false,
        autoOpen: true,
        width: 470,
        modal: true,
        close: function () {
            //$dialogboxForMessage.dialog('destroy');
            //$dvMessageBox.html('');
            $dialogboxForMessage.dialog('destroy');
            $dvMessageBox.html('');
            if (closeCallBack) {
                if (typeof closeCallBack === "string") {
                    window[closeCallBack]();
                } else if (typeof closeCallBack === 'function') {
                    closeCallBack();
                }
            }

        },
        captionButtons: {
            minimize: { visible: false },
            maximize: { visible: false },
            pin: { visible: false },
            toggle: { visible: false },
            refresh: { visible: false }
        },
        buttons: {

            Yes: function () {
                $dialogboxForMessage.dialog('destroy');
                $dvMessageBox.html('');
                if (OkCallBack) {
                    if (typeof OkCallBack === "string") {
                        window[OkCallBack]();
                    } else if (typeof OkCallBack === 'function') {
                        OkCallBack();
                    }
                }

            },
            No: function () {
                $dialogboxForMessage.dialog('destroy');
                $dvMessageBox.html('');
                if (closeCallBack) {
                    if (typeof closeCallBack === "string") {
                        window[closeCallBack]();
                    } else if (typeof closeCallBack === 'function') {
                        closeCallBack();
                    }
                }
            }
        },
        show: 'fade',
        hide: 'fade',
        dialogClass: 'main-dialog-class'
    });
    $dialogboxForMessage.dialog("open");
}

function showAlertBoxInstance(msg) {//Messagebox with out grid page
    
    var showAlerObject = {};
    showAlerObject.$dvMessageBox = $("#dvMessageBox");
    showAlerObject.$dialogboxForMessage = $('#dialogboxForMessage');
   // console.log('Entered into ShowMessageBox', showAlerObject.$dvMessageBox);
    showAlerObject.$dvMessageBox.html(msg);
    $(".ui-widget").css({ "font-weight": +"bold" });
    showAlerObject.$dialogboxForMessage.dialog({
        title: 'Tech Advance+',
        showOnLoad: false,
        autoExpand: false,
        autoOpen: false,
        width: 370,
        modal: true,
        close: function () {
            
            showAlerObject.$dialogboxForMessage.dialog('destroy');
            showAlerObject.$dvMessageBox.html('');
        },
        buttons: {

            OK: function () {
                showAlerObject.$dialogboxForMessage.dialog('destroy');
                showAlerObject.$dvMessageBox.html('');
                if (showAlerObject.okClick !== null) {
                    showAlerObject.okClick();
                }                
            }
        },
        show: 'fade',
        hide: 'fade',
        dialogClass: 'main-dialog-class'
    });
    showAlerObject.$dialogboxForMessage.dialog("open");
   // console.log('Exit From ShowMessageBox');
    return showAlerObject;
}
