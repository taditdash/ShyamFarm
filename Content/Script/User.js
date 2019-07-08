$(document).ready(function () {
    $(document).on("click", ".saveUserDetails", function () {
        SaveUserDetails();
    });

    $(document).on("change", "#loginName", function () {
        AjaxGetCall("/User/CheckLoginName/?userId=" + $("#CreateUser").attr("data-id") + "&loginName=" + $(this).val().trim(), null, function (result) {
            if (result && result.DoesLoginNameExist) {
                alert("Login Name already in user, Please try another one");
                $("#loginName").val("");
            }
        }, function (e) {
            console.log(e.message);
        });
    });

    $(document).on("click", "#login", function () {
        var userDetails = {
            LoginName: $("#userLoginName").val().trim(),
            Key: $("#userPassword").val().trim()
        }

        AjaxPostCall("/User/LoginUser/", JSON.stringify({ userData: userDetails }), function () {
            window.location.href = window.location.origin + "/Home/";
        }, ErrorUserSave);
    });
});

function SaveUserDetails() {
    try {
        if (ValidateForm("#CreateUser")) {
            var userDetails = GetModalSubmitValue(".UserDetails");
            AjaxPostCall("/User/CreateUpdateUserDetails/", JSON.stringify({ userData: userDetails }), SuccessUserSave, ErrorUserSave);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function SuccessUserSave() {
    try {

    }
    catch (e) {
        console.log(e.message);
    }
}

function ErrorUserSave() {
    try {

    }
    catch (e) {
        console.log(e.message);
    }
}