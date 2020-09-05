// Load All Tasks
function LoadAllData(){
    $.ajax({
        url: '/api/tasks/dashboard',
        type: 'GET'
    })
    .then(data => {
        $('#content').html('')
        for (element of data) {
            var tr = $(`
                <tr id="${element._id}">
                    <td><span class="taskName">${element.taskName}</span></td> 
                    <td><span class="deadLine">${(element.deadLine).slice(0,10)}</span></td>
                    <td><button type="button" class="btn btn-warning viewBtn">View</button></td>
                    <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
                </tr>`)
            $('#content').append(tr)
        }
        ViewDetail()
        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()    
    })
    .catch(err => {
        console.log(err);
        alert('Server error LoadAllData')
    })
}

// Add new Task

$('#addBtn').click(() => {
    var taskName = $('#newTaskName').val()
    var deadLine = $('#newDeadLine').val()
    if (taskName == '' || deadLine == '') {
        alert('Missing task name or deadline')
        return
    }
    $.ajax({
        url: '/api/tasks',
        type: 'POST',
        data: {
            taskName: taskName,
            deadLine: deadLine
        }
    })
    .then(data => {
        var newTr = $(`
            <tr id="${data._id}">
                <td><span class="taskName">${data.taskName}</span></td>
                <td><span class="deadLine">${(data.deadLine).slice(0,10)}</span></td>
                <td><button type="button" class="btn btn-warning viewBtn">View</button></td>
                <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
            </tr>`)
        $('#content').append(newTr)
        $('#newTaskName').val('')
        $('#newDeadLine').val('')

        ViewDetail()
        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()
    })
    .catch(err => {
        console.log(err);
        alert('Server error Add new Task')
    })
})

// Edit Task
function EditTaskEvent(){
    $('.taskName').click(function() {
        oldText = $(this).text();
        $(this).hide()
        var textInput = $(`<input type="text">`)
        textInput.appendTo($(this).parent('td')).val(oldText)
        .select()
        .blur(function() {
            var newText = $.trim(this.value)
            if (newText == '') {
                $(this).prev().text(oldText)
            } else {
                $(this).prev().text(newText)
            }    
            
            trId = $(this).parents('tr').attr('id')
            $.ajax({
                url: '/api/tasks/' + trId,
                type: 'PUT',
                data: {
                    taskName: newText
                }
            })
            .then(data => {
                console.log('Update Task: Success');
            })
            .catch(err => {
                alert('Server error Edit Task')
                console.log(err);
            })
            $(this).prev().show()
            $(this).remove()
        })
    })
}

// Edit Deadline
function EditDeadLineEvent(){
    $('.deadLine').click(function(){
        oldDate = $(this).text()
        // console.log(oldDate);
        $(this).hide()
        var dateInput = $(`<input type="date">`)
        dateInput.appendTo($(this).parent('td'))
        .blur(function() {
            var newDate = dateInput.val()
            if (newDate == '') {
                $(this).prev().text(oldDate)
                newDate = oldDate
            } else {
                $(this).prev().text(newDate)
            }  

            trId = $(this).parents('tr').attr('id')
            newDate = new Date(newDate)
            $.ajax({
                url: '/api/tasks/' + trId,
                type: 'PUT',
                data: {
                    deadLine: newDate
                }
            })
            .then(data => {
                console.log('Update Date: Success');
            })
            .catch(err => {
                alert('Server error Edit Deadline')
                console.log(err);
            })

            $(this).prev().show()
            $(this).remove()
        })
    })
}

// Delete Task
function DeleteEvent(){
    $('.deleteBtn').click(function() {
        trId = $(this).parents('tr').attr('id')
        $.ajax({
            url: '/api/tasks/' + trId,
            type: 'DELETE'
        })
        .then(data => {
            $('#'+trId).remove()
        })
        .catch(err => {
            alert('Server error Delete Task')
            console.log(err);
        })
    })
}

// View Detail
function ViewDetail(){
    $('.viewBtn').click(function() {
        trId = $(this).parents('tr').attr('id')
        $.ajax({
            url: '/api/tasks/' + trId,
            type: 'GET'
        })
        .then(data => {
            $('#taskDetail').html(data.taskName)
            $('#dateDetail').html(data.deadLine)

        })
        .catch(err => {
            alert('Server error View Detail')
            console.log(err);
        })
        $('#myModal').modal()

    })
}

// Call Main function
LoadAllData()





