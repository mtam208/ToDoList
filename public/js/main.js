// =========== Function Declaration ====================
function LoadAllData(){
    $.ajax({
        url: '/api/tasks',
        type: 'GET'
    })
    .then(data => {
        $('#content').html('')
        for (element of data) {
            var tr = $(`
                <tr id="${element._id}">
                    <td><span class="taskName">${element.taskName}</span></td> 
                    <td><span class="deadLine">${(element.deadLine).slice(0,10)}</span></td>
                    <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
                </tr>`)
            $('#content').append(tr)
        }
        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()    

        
        
    })
    .catch(err => {
        console.log(err);
        alert('Server error')
    })
}

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
                alert('Server error')
                console.log(err);
            })
            $(this).prev().show()
            $(this).remove()
        })
    })
}

function EditDeadLineEvent(){
    $('.deadLine').click(function(){
        oldDate = $(this).text()
        console.log(oldDate);
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
                alert('Server error')
                console.log(err);
            })

            $(this).prev().show()
            $(this).remove()
        })
    })
}
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
            alert('Server error')
            console.log(err);
        })
    })
}

// =============== MAIN ========================
LoadAllData()

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
                <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
            </tr>`)
        $('#content').append(newTr)

        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()
    })
    .catch(err => {
        console.log(err);
        alert('Server error')
    })
})



