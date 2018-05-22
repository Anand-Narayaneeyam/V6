(function ($) {
    // var baseUrl = "/" + window.location.href.split('/')[3];// window.location.href.split('/')[3];
    var baseUrl = "";
    var isIE11 = /msie|Trident/.test(navigator.userAgent);
    if (isIE11 == false) {
        baseUrl = window.document.baseURI;

        var baseUrlArr = baseUrl.split('/');
        baseUrl = "";
        for (var i = 0; i < baseUrlArr.length; i++) {
            if ((i > 2) && (baseUrlArr[i] != ""))
                baseUrl = baseUrl + '/' + baseUrlArr[i];
        }
    }
    else {
        baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
    }
    if (baseUrl.includes("undefined")) {
        baseUrl = baseUrl.replace("undefined", "");
    }
    $.ajax({
        url: baseUrl + "/updategs/hubs",
        dataType: "script",
        type: "POST",
        async: false
    });
}(jQuery));