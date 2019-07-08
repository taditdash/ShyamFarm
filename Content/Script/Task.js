$(document).ready(function () {
    $(document).on("click", ".saveTaskDetails", function () {
        if (ValidateForm(".homeTaskDataDetails")) {
            var taskData = GetModalSubmitValue("#taskCompleted");

            AjaxPostCall("/Task/CreateUpdateTaskDetails/", JSON.stringify({ taskData: taskData }), function (result) {
                window.location.href = window.location.href;
                //$("#taskDataDetails").append(
                //    "<tr>" +
                //        "<td>" + taskData.Task + "</td>" +
                //        "<td>" + taskData.MoneySpend + "</td>" +
                //    "</tr>");
            }, function (e) {
                console.log(e);
            });
        }
    });

    $(document).on("click", ".editTaskDetails", function () {
        var selectedTr = $(this).parents("tr");

        $("#taskCompleted").attr("data-id", selectedTr.attr("data-id"));
        $("#taksNote").val(selectedTr.find('.taskData').attr("data-task"));
        $("#totalAmountSpendOnThisTask").val(selectedTr.find('.moneySpend').attr("data-money-spend"));
        $("#taskCompleted").modal('show');
    });

    $(document).on("click", ".deleteTaskDetails", function () {
        var selectedTr = $(this).parents("tr");
        AjaxPostCall("/Task/DeleteTaskDetails/", JSON.stringify({ taskId: selectedTr.attr("data-id") }), function (result) {
            selectedTr.remove();
        }, function (e) {
            console.log(e);
        });
    });
});