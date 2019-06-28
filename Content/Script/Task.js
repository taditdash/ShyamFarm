$(document).ready(function () {
    $(document).on("click", ".saveTaskDetails", function () {
        if (ValidateForm(".homeTaskDataDetails")) {
            var taskData = GetModalSubmitValue(".homeTaskDataDetails");

            AjaxPostCall("/Task/CreateUpdateTaskDetails/", JSON.stringify({ taskData: taskData }), function (result) {
                $("#taskDataDetails").append(
                    "<tr>" +
                        "<td>" + taskData.Task + "</td>" +
                        "<td>" + taskData.MoneySpend + "</td>" +
                    "</tr>");
            }, function (e) {
                console.log(e);
            });
        }
    });
});