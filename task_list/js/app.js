$(document).ready(function () {

    $('#create-task').submit(function (event) {
        event.preventDefault();

        var form = $(this);
        var formData = form.serialize();

        $('#name_error').html("");
        $('#description_error').html("");

        // Αν δεν έχω το ajax δεν θα γίνει update στην βάση μου
        $.ajax({
            url: 'create.php',
            method: 'POST',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (data) {

                if (data.success === false) {

                    if (data.message.name !== "") {
                        //display error
                        // target name error with jquery
                        $('#name_error').css("display", "block").html(data.message.name);
                    }

                    if (data.message.description !== "") {
                        //display error
                        // target description error with jquery
                        $('#description_error').css("display", "block").html(data.message.description);
                    }
                } else {
                    $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html(data.message);
                    document.getElementById("create-task").reset();
                }

            }
        });

    });


    // take the data to create and show up with a message


    // var name = $('#name').val();
    // var description = $('#description').val();

    // console.log(name + " " +description)

    $('#task-list').load('read.php');

});

// can type data or rename on task page the name and the description
function makeElementEditable(div) {
    div.style.border = "1px solid lavender";
    div.style.padding = "5px";
    div.style.background = "white";
    div.contentEditable = true;
}

// can add data or rename on task page name after you click out of the div name
function updateTask(target, taskId, column_name) {
    var data = target.textContent;
    target.style.border = "none";
    target.style.padding = "0px";
    target.style.background = "#ececec";
    target.contentEditable = false;

    $.ajax({
        url: 'update.php',
        method: 'POST',
        data: {theData: data, id: taskId, column: column_name},
        success: function (data) {
            $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html(data);
            // remove line below because we're not resetting any form.
            // document.getElementById('create-task').reset();
        }

    });
}


// Κάνει το ίδο με το παραπάνω
// function updateTaskName(target, taskId) {
//     let data = target.textContent;
//     target.style.border = "none";
//     target.style.padding = "0px";
//     target.style.background = "#ececec";
//     target.contentEditable = false;
//
//
//     $.ajax({
//         url: "update.php",
//         method: "POST",
//         data: {name: data, id: taskId},
//         success: function (data) {
//             $('#ajax_msg').css('display', 'block').delay(3000).slideUp(300).html(data);
//             // remove line below because we're not resetting any form.
//             // document.getElementById('create-task').reset();
//         }
//
//     });
// }
//
// function updateTaskDescription(target, taskId) {
//     let data = target.textContent;
//     target.style.border = "none";
//     target.style.padding = "0px";
//     target.style.background = "#ececec";
//     target.contentEditable = false;
//
//
//     $.ajax({
//         url: "update.php",
//         method: "POST",
//         data: {description: data, id: taskId},
//         success: function (data) {
//             $('#ajax_msg').css('display', 'block').delay(3000).slideUp(300).html(data);
//             // remove line below because we're not resetting any form.
//             // document.getElementById('create-task').reset();
//         }
//
//     });
// }
//
// function updateTaskStatus(target, taskId) {
//     let data = target.textContent;
//     target.style.border = "none";
//     target.style.padding = "0px";
//     target.style.background = "#ececec";
//     target.contentEditable = false;
//
//
//     $.ajax({
//         url: "update.php",
//         method: "POST",
//         data: {status: data, id: taskId},
//         success: function (data) {
//             $('#ajax_msg').css('display', 'block').delay(3000).slideUp(300).html(data);
//             // remove line below because we're not resetting any form.
//             // document.getElementById('create-task').reset();
//         }
//
//     });
// }

function deleteTask(taskId) {
    if (confirm("Do you really want to delete this task?")) {
        $.ajax({
            url: 'delete.php',
            method: 'POST',
            data: {id: taskId},
            success: function (data) {
                $('#ajax_msg').css("display", "block").delay(3000).slideUp(300).html(data);
                // remove line below because we're not resetting any form.
                // document.getElementById('create-task').reset();
            }

        });

        $('#task-list').load('read.php');
    }

    return false;
}