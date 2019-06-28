
function AjaxPostCall(url, postData, successMethod, errorMethod, isAsync) {
    try {
        if (!isAsync) {
            isAsync = false;
        }
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            async: isAsync,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: postData,
            success: function (result) {
                if (successMethod) {
                    successMethod(result);
                }
            },
            error: function (ex) {
                SuperSolver.Loader.Hide();
                if (successMethod.toString().toLowerCase().indexOf('save') != -1) {
                    $(" .spnSuccessMsg").html("Save operation failed");
                    $(" .spnSuccessMsg").removeClass("noDisplay");
                    $(" .spnSuccessMsg").fadeOut(5000, function () {
                        $(" .spnSuccessMsg").css("display", "");
                        $(" .spnSuccessMsg").addClass("noDisplay");
                        $(" .spnSuccessMsg").html("Saved Successfully");
                    });
                }
                console.log(ex);
                CloseLoadingModal();
                if (modalPopupInterval >= 0) {
                    if (errorMethod) {
                        errorMethod(ex);
                    }
                    AccountLogError("JS Page: NLCManager.js, MethodName: NLCAjaxPostCall, MethodParameter: " + url + "|~|" + postData + "|~|" + successMethod + "|~|" + errorMethod + ", Message:" + ex.message);
                }
                else {
                    setTimeout(function () {
                        if (errorMethod) {
                            errorMethod(ex);
                        }
                        AccountLogError("JS Page: NLCManager.js, MethodName: NLCAjaxPostCall, MethodParameter: " + url + "|~|" + postData + "|~|" + successMethod + "|~|" + errorMethod + ", Message:" + ex.message);
                    }, Math.abs(modalPopupInterval));
                }

            }
        });
    }
    catch (ex) {
        AccountLogError("JS Page: NLCManager.js, MethodName: NLCAjaxPostCall, MethodParameter: " + url + "|~|" + postData + "|~|" + successMethod + "|~|" + errorMethod + ", Message:" + ex.message);
    }
}

function AjaxGetCall(url, postData, successMethod, errorMethod, isAsync) {
    try {
        if (url.indexOf("?") !== -1) {
            url += "&date=" + new Date().toLocaleTimeString();
        }
        else {
            url += "?date=" + new Date().toLocaleTimeString()
        }

        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            dataType: "json",
            async: isAsync,
            contentType: "application/json; charset=utf-8",
            data: postData,
            success: function (result) {
                if (successMethod) {
                    successMethod(result);
                }
            },
            error: function (ex) {
                if (errorMethod) {
                    errorMethod(ex);
                }
                if (successMethod.toString().toLowerCase().indexOf('save') != -1) {
                    $(" .spnSuccessMsg").html("Save operation failed");
                    $(" .spnSuccessMsg").removeClass("noDisplay");
                    $(" .spnSuccessMsg").fadeOut(5000, function () {
                        $(" .spnSuccessMsg").css("display", "");
                        $(" .spnSuccessMsg").addClass("noDisplay");
                        $(" .spnSuccessMsg").html("Saved Successfully");
                    });
                }
                AccountLogError("JS Page: NLCManager.js, MethodName: NLCAjaxGetCall, MethodParameter: " + url + "|~|" + postData + "|~|" + successMethod + "|~|" + errorMethod + ", Message:" + ex.message);
            }
        });
    }
    catch (ex) {
        //AccountLogError("JS Page: NLCManager.js, MethodName: NLCAjaxGetCall, MethodParameter: " + url + "|~|" + postData + "|~|" + successMethod + "|~|" + errorMethod + ", Message:" + ex.message);
    }
}

function GetModalSubmitValue(modalSelector) {
    try {
        var data = {};
        data[$(modalSelector).attr("data-prop-name")] = $(modalSelector).attr("data-id");

        $(modalSelector + " input," + modalSelector + " select," + modalSelector + " textarea").each(function () {
            if ($(this).attr("type") === "checkbox") {
                data[$(this).attr("data-prop-name")] = $(this).prop("checked");
            }
            else if (this.nodeName.toLowerCase() === "select") {
                if ($(this).hasClass("takeText")) {
                    data[$(this).attr("data-prop-name")] = unescape($(this).find("option:selected").html().trim());
                }
                else {
                    data[$(this).attr("data-prop-name")] = unescape($(this).val());
                }
            }
            else {
                if ($(this).hasClass("TakeKey")) {
                    data[$(this).attr("data-prop-name")] = $(this).attr('data-key');
                }
                else {
                    data[$(this).attr("data-prop-name")] = $(this).val().trim();
                }
            }
        });
        return data;
    }
    catch (ex) {
        AccountLogError("JS Page: NLCManager.js, MethodName: GetModalSubmitValue, MethodParameter: " + modalSelector + ", Message:" + ex.message);
    }
}

function ValidateForm(selector) {
    var errorMessage = "";
    $(selector).find("[data-required]:visible").each(function () {
        if (this.nodeName.toLowerCase() === "select") {
            if (!$(this).val() || $(this).val() === "0") {
                errorMessage += $(this).attr("data-required-message") + "<br />";
            }
        }
        else {
            if ($(this).val().trim().length === 0) {
                errorMessage += $(this).attr("data-required-message") + "<br />";
            }
        }
    });
    $(selector).find("[data-number]:visible").each(function () {
        if (Number($(this).val()) != NaN) {
            errorMessage += $(this).attr("data-number-message") + "<br />";
        }
    });

    $(selector).find("[data-match]:visible").each(function () {
        if ($(this).val() !== $($(this).attr("data-match-id")).val()) {
            errorMessage += $(this).attr("data-number-message") + "<br />";
        }
    });

    if (errorMessage.trim().length !== 0) {
        ShowAlert(errorMessage);
        return false;
    }

    return true;
}

function ShowAlert(message) {
    $("#globalAlertModalBody").html(message);
    $("#globalAlertModal").show();
}