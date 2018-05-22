wexBimConveter = function () {
    this.convertToWexBim = function (drawingId, filename, revisionNo, customerName, resCallback) {

        try {
            $.ajax({
                url: 'api/WexBimData/ConvertToWexBim',
                type: "POST",
                dataType: "json",
                data: JSON.stringify([drawingId, filename, revisionNo, customerName]),
                contentType: 'application/json; charset=utf-8',
                success: function (returnObject) {
                    if (returnObject.returnCode == 0) {
                        resCallback(9)
                    }
                    else {
                        resCallback(returnObject.returnCode)
                    }
                },
                error: function (xhr) {
                    console.log(xhr);
                    resCallback(9)

                }
            });
        }
        catch (x) {
            console.log(x);
            resCallback(9)
        }
    }
};