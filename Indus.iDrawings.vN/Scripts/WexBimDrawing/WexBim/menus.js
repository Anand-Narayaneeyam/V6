$(document).ready(function () {
    makeMenuDraggableResizeable();

    $("#modelmenu").height(450); $("#modelmenu").width(400);
    
    $("#quickProperties").hide();

});

///setting draggable ,resizable properties for the dialogs and list 
function makeMenuDraggableResizeable() {
    try {
         $('#modelmenu').draggable({ handle: '.menuHeader', opacity: '0.5' }).resizable({ minWidth: 200 });        
    }
    catch (e) {
        console.error("makeMenuDraggableResizeable: " + e);
    }
}

