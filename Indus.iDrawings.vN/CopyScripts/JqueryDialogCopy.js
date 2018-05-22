var jDialogOpenInstance = function ($dialogbox, Height, Width, SubmitButton, CancelButton, Title, ButtonPosition) {
    
    var showConfirmObject = {};//To show Dialog for the Add/Edit pages with instance
    showConfirmObject.$Dialogobj = $dialogbox;
    var buttonText = "";
    if ((SubmitButton != "" && CancelButton != "" )) {//atleast one customised button
        showConfirmObject.$Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: SetdialogSize(Height, Width).height,
            maxHeight: $(window).height(),
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            position: {
                my: "center",
                at: "center",
                of: window
            },

            close: function () {
                if (showConfirmObject.closeClick) {
                    showConfirmObject.closeClick();
                   // showConfirmObject.$Dialogobj.empty().dialog('destroy');
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
                "Add": function () {
                    if (showConfirmObject.successClick) {
                        showConfirmObject.successClick();
                    }
                },
                "Cancel": function () {
                    if (showConfirmObject.closeClick) {
                        showConfirmObject.closeClick();
                        //var isOpen = $dialogbox.dialog("isOpen");
                        //if (isOpen == true) {
                        //    showConfirmObject.$Dialogobj.empty();
                        //    showConfirmObject.$Dialogobj.dialog("option", "hide", "fade", null).dialog("destroy");
                        //}
                        //else
                        //    showConfirmObject.$Dialogobj.close();
                      //  showConfirmObject.$Dialogobj.empty().dialog('destroy');
                    }
                }
            },
            open: function () {
                //var buttons = $('.ui-dialog-buttonset').children('button');//changing default button text to custimsed text
                //if (SubmitButton) buttons[0].textContent = SubmitButton;
                //if (CancelButton) buttons[1].textContent = CancelButton;
                var length = $('.ui-dialog-buttonset').length;
                $('.ui-dialog-buttonset')[length - 1].children['0'].textContent = SubmitButton;
                $('.ui-dialog-buttonset')[length - 1].children['1'].textContent = CancelButton;

            }
        });
      
    }
    else if ((SubmitButton == "" && CancelButton == "")) {
        showConfirmObject.$Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: SetdialogSize(Height, Width).height,
            maxHeight: $(window).height(),
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            position: {
                my: "center",
                at: "center",
                of: window
            },

            close: function () {
                if (showConfirmObject.closeClick) {
                    showConfirmObject.closeClick();
                }
            },
            captionButtons: {
                minimize: { visible: false },
                maximize: { visible: false },
                pin: { visible: false },
                toggle: { visible: false },
                refresh: { visible: false }
            },           
        });
    }
    else {
        if (SubmitButton)
            buttonText = SubmitButton;
        else if (CancelButton)
            buttonText = CancelButton;

        showConfirmObject.$Dialogobj.dialog({
            width: Width,
            height: Height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            position: {
                my: "center",
                at: "center",
                of: window
            },

            close: function () {
                if (showConfirmObject.closeClick ) {
                    showConfirmObject.closeClick();
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
                "Close": function () {
                    if (showConfirmObject.successClick) {
                        showConfirmObject.successClick();
                    }
                    else if (showConfirmObject.closeClick) {
                        showConfirmObject.closeClick();
                    }
                }
               
            },
            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');//changing default button text to custimsed text
                if (SubmitButton) buttons[0].textContent = buttonText;
               

            }
            
        });
       
    }
   // if (SubmitButton) //$('.ui-dialog-buttonset').children('button')
    //    $('.ui-dialog-buttonset:contains(Update)').text('Add');
    showConfirmObject.$Dialogobj.dialog("open");
    return showConfirmObject;
}

function jDialogOpen($Dialogobj, Height, Width, SubmitButton, CancelButton, Title, ButtonPosition, successCallback, cancelCallback) {
        if (SubmitButton == "" && CancelButton == "") {//if dialog buttons are customised
        var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: "auto",
            maxHeight: $(window).height() * 0.85,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {


                $Dialogobj.empty().dialog('destroy');
            },
            position: {
                my: "center",
                at: "center",
                of: window
            },

            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');
                buttons.addClass('dialogButtons');

            },
            open: function (event, ui) {
                var Count = $('.ui-dialog').length;
                var dialogheight = $($(".ui-dialog")[Count - 1]).height();
                $($(".ui-dialog")[Count - 1]).css('top', dialogheight * 0.9);
                $Dialogobj.css('overflow', 'auto');
            }

        });

        } else {
          
            var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: "auto",
            maxHeight: $(window).height()* 0.85,
            modal: true,
            dialogClass: ButtonPosition,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {


                $Dialogobj.empty().dialog('destroy');
            },
            buttons: [
           {
               text: SubmitButton,
               //class: 'dialogButtons',//general.css
               click: function () {
                   var isOpen = $Dialogobj.dialog("isOpen");
                   if (isOpen == true) {
                       if (typeof successCallback === "string") {
                           window[successCallback]();
                       } else if (typeof successCallback === 'function') {
                           successCallback();
                       } else formSubmit();
                   }
               }
           },
           {
               text: CancelButton,
               //class: 'dialogButtons',
               click: function () {
                   if (typeof cancelCallback === "string") {
                       window[cancelCallback]();
                   }else if (typeof cancelCallback === 'function') {
                           cancelCallback();
                   }
                   jDialogClose($Dialogobj,"");
               }
           }
            ],

            position: {
                my: "center",
                at: "center",
                of: window

            },

            open: function (event, ui) {
                //var dialogheight = $(document.activeElement).closest(".ui-dialog").height();
                //$(this).parents('.ui-dialog').css('top', dialogheight);
                var Count = $('.ui-dialog').length;
                var dialogheight = $($(".ui-dialog")[Count - 1]).height();
                $($(".ui-dialog")[Count - 1]).css('top', dialogheight * 0.9);
                $Dialogobj.css('overflow', 'auto'); //this line does the actual hiding
            }
            });
        }

        $Dialogobj.dialog("open");
       
}
function jDialogOpenwithHeight($Dialogobj, Height, Width, SubmitButton, CancelButton, Title, ButtonPosition, successCallback) {

    if (SubmitButton == "" && CancelButton == "") {//if dialog buttons are customised
        var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: Height,
            maxHeight: $(window).height() * 0.85,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {


                $Dialogobj.empty().dialog('destroy');
                },
            position: {
                my: "center",
                at: "center",
                of: window
            },

            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');
                buttons.addClass('dialogButtons');

            },
            open: function (event, ui) {
                //var Count = $('.ui-dialog').length;
                //var dialogheight = $($(".ui-dialog")[Count - 1]).height();
                //$($(".ui-dialog")[Count - 1]).css('top', dialogheight * 1.1);
                $Dialogobj.css('overflow', 'auto');
            }

        });

    } else {

        var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: Height,
            maxHeight: $(window).height() * 0.85,
            modal: true,
            dialogClass: ButtonPosition,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {


                $Dialogobj.empty().dialog('destroy');
            },
            buttons: [
           {
               text: SubmitButton,
               //class: 'dialogButtons',//general.css
               click: function () {
                   var isOpen = $Dialogobj.dialog("isOpen");
                   if (isOpen == true) {
                       if (typeof successCallback === "string") {
                           window[successCallback]();
                       } else if (typeof successCallback === 'function') {
                           successCallback();
                       } else formSubmit();
                   }
               }
           },
           {
               text: CancelButton,
               //class: 'dialogButtons',
               click: function () {
                   jDialogClose($Dialogobj, "");
               }
           }
            ],

            position: {
                my: "center",
                at: "center",
                of: window
            },

            open: function (event, ui) {
                //var dialogheight = $(document.activeElement).closest(".ui-dialog").height();
                //$(this).parents('.ui-dialog').css('top', dialogheight);
                //var Count = $('.ui-dialog').length;
                //var dialogheight = $($(".ui-dialog")[Count - 1]).height();
                //$($(".ui-dialog")[Count - 1]).css('top', dialogheight * 1.1);
                $Dialogobj.css('overflow', 'auto'); //this line does the actual hiding
            }
        });
    }

    $Dialogobj.dialog("open");

}
function jDialogClose($Dialogobj, ParentGridId) {//close Dialog
     $Dialogobj.empty();
     $Dialogobj.dialog("option", "hide", "fade", null).dialog("destroy");
     
        if (ParentGridId != "" && ParentGridId != undefined) {
            clearGlobalIds();
            setGridObject(ParentGridId, "");
            gGridCount = $("#hdnTotal" + ParentGridId)[0].value;
            gGridDataKey = $("#" + ParentGridId).wijgrid("option", "dataKey");
            var selectedRowIndexes = $("#" + ParentGridId).wijgrid("selection").selectedCells()._getSelectedRowsIndicies();
            //$("#" + ParentGridId).wijgrid('doRefresh');
            var selection = $("#" + ParentGridId).wijgrid("selection");
            selection.clear();
            $.each(selectedRowIndexes, function (index, rowIndex) {
                selection.addRows(rowIndex);
            });
            setContextMenu(ParentGridId, "", $("#hdnContextMenu" + ParentGridId)[0].value)
        }

    //$Dialogobj.empty().dialog('destroy');

}
function jDialogOpenOK($Dialogobj, Height, Width, ButtonText, Title, actionUrl, gridId) {

    if (ButtonText == "") {
        var dialogs = $Dialogobj.dialog({
            width: Width,
            height: Height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {
                $Dialogobj.empty().dialog('destroy');
            },
            position: {
                my: "center",
                at: "center",
                of: window
            },
            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');
                buttons.addClass('dialogButtons');

            },
            open: function (event, ui) {
                $Dialogobj.css('overflow', 'hidden'); //this line does the actual hiding
            }
        });
    }
    else {
        var dialogs = $Dialogobj.dialog({
            width: Width,
            height: Height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {
                $Dialogobj.empty().dialog('destroy');
            },

            buttons: [
        {
            text: ButtonText,
            class: 'dialogButtons',
            click: function () {

                jDialogClose($Dialogobj, "");;
            }
        }],
            position: {
                my: "center",
                at: "center",
                of: window
            },
            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');
                buttons.addClass('dialogButtons');

            },
            open: function (event, ui) {
                $Dialogobj.css('overflow', 'hidden'); //this line does the actual hiding
            }

        });
    }
    $Dialogobj.dialog("open");
}
function jDialogOpenList(ParentGridId, $Dialogobj, Height, Width, SubmitButton, CancelButton, Title, ButtonPosition, successCallback) {//Grid List in Dialog(partialview)
  
    if (SubmitButton == "" && CancelButton == "") {//Dialog without buttons
        var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: SetdialogSize(Height, Width).height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            dialogClass: ButtonPosition,
            zIndex: 9999,
            title: Title,
            resizable: false,
            close: function () {

                jDialogClose($Dialogobj, ParentGridId);
                

            },
            position: {
                my: "center",
                at: "center",
                of: window
            },

            create: function () {
                var buttons = $('.ui-dialog-buttonset').children('button');
                buttons.addClass('dialogButtons');

            },
            open: function (event, ui) {
                $Dialogobj.css('overflow', 'hidden');
            }

        });

    }
    else if (SubmitButton == "") {
        //Dialog with buttons
        var dialogs = $Dialogobj.dialog({
            width: SetdialogSize(Height, Width).width,
            height: SetdialogSize(Height, Width).height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            dialogClass: ButtonPosition,
            resizable: false,
            close: function () {
                jDialogClose($Dialogobj, ParentGridId);
            

            },
            buttons: [          
           {
               text: CancelButton,
               class: 'dialogButtons',
               click: function () {

                   jDialogClose($Dialogobj, ParentGridId);
               }
           }
            ],

            position: {
                my: "center",
                at: "center",
                of: window
            },

            open: function (event, ui) {
                $Dialogobj.css('overflow', 'hidden'); //this line does the actual hiding
            }
        });
    }
    else {
        //Dialog with buttons
        var dialogs = $Dialogobj.dialog({
            width: Width,
            height: Height,
            modal: true,
            autoOpen: false,
            closeOnEscape: true,
            zIndex: 9999,
            title: Title,
            dialogClass: ButtonPosition,
            resizable: false,
            close: function () {
                jDialogClose($Dialogobj, ParentGridId);
            

            },
            buttons: [
           {
               text: SubmitButton,
               class: 'dialogButtons',//general.css
               click: function () {

                   var isOpen = $Dialogobj.dialog("isOpen");
                   if (isOpen == true) {
                       if (typeof successCallback === "string") {
                           window[successCallback]();
                       } else if (typeof successCallback === 'function') {
                           successCallback();
                       }else formSubmit();
                   }

               }
           },
           {
               text: CancelButton,
               class: 'dialogButtons',
               click: function () {

                   jDialogClose($Dialogobj, ParentGridId);
               }
           }
            ],

            position: {
                my: "center",
                at: "center",
                of: window
            },

            open: function (event, ui) {
                $Dialogobj.css('overflow', 'hidden'); //this line does the actual hiding
            }
        });
    }
    $Dialogobj.dialog("open");
}
function jDialogOpenAnalytics($dialogObj, height, width, submitButton, cancelButton, title, actionUrl, gridId) {//Analytics window
    var dialogs = $dialogObj.dialog({
        width: width,
        height: height,
        modal: true,
        autoOpen: false,
        closeOnEscape: true,
        zIndex: 9999,
        title: title,
        resizable: false,
        close: function () {
            $dialogObj.empty().dialog('destroy');
        },
        buttons: [
       {
           text: submitButton,
           class: 'dialogButtons',//general.css
           click: function () {
               var isOpen = $dialogObj.dialog("isOpen");
               if (isOpen == true) {
                   analyticsFormSubmit(actionUrl, gridId);
               }
           }
       },
       {
           text: cancelButton,
           class: 'dialogButtons',
           click: function () {
               jDialogClose($dialogObj,"");;
           }
       }
        ],

        position: {
            my: "center top", at: "center top", of: window,
            collision: 'fit'
        },

        open: function (event, ui) {
            $dialogObj.css('overflow', 'hidden'); //this line does the actual hiding
        }
    });
    $dialogObj.dialog("open");
}
function SetdialogSize(height, width) {
    var gdialogHeight = "";
    var gdialogWidth = "";
    var dialogheight = $(window).height();
    var dialogwidth = $(window).width();
    
        var testheight = (dialogheight / height);
        var testwidth = (dialogwidth / width);

        if (testheight < 1.3)
            gdialogHeight = height * 0.98;
        else
            gdialogHeight = height;

        if (testwidth < 1.2)
            gdialogWidth = width * 0.85;
        else
            gdialogWidth = width;
   
    return { height: gdialogHeight, width: gdialogWidth };

}





