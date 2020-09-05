// Load All Tasks
function LoadAllData(){
    $.ajax({
        url: '/api/tasks/dashboard',
        type: 'GET'
    })
    .then(data => {
        $('#todoItem').html('')
        for (element of data) {
            let completed = element.completed ? "checked" : ""
            let tr = $(`
                <tr class="${completed}" id="${element._id}">
                    <td><input type='checkbox' class="isChecked" ${completed}></td> 
                    <td><span class="taskName">${element.taskName}</span></td> 
                    <td><span class="deadLine">${(element.deadLine).slice(0,10)}</span></td>
                    <td><button type="button" class="btn btn-info viewBtn">View</button></td>
                    <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
                </tr>`)
            $('#todoItem').append(tr)
        }
        ViewDetail()
        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()    
        CheckCompleted()
    })
    .catch(err => {
        console.log(err);
        alert('Server error LoadAllData')
    })
}

// Add new Task

$('#addBtn').click(() => {
    let taskName = $('#newTaskName').val()
    let deadLine = $('#newDeadLine').val()
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
        let newTr = $(`
            <tr id="${data._id}">
                <td><input type='checkbox' class="isChecked"></td> 
                <td><span class="taskName">${data.taskName}</span></td>
                <td><span class="deadLine">${(data.deadLine).slice(0,10)}</span></td>
                <td><button type="button" class="btn btn-info viewBtn">View</button></td>
                <td><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>
            </tr>`)
        $('#todoItem').append(newTr)
        $('#newTaskName').val('')
        $('#newDeadLine').val('')

        ViewDetail()
        EditTaskEvent()
        EditDeadLineEvent()
        DeleteEvent()
        CheckCompleted()
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
        let textInput = $(`<input type="text">`)
        textInput.appendTo($(this).parent('td')).val(oldText)
        .select()
        .blur(function() {
            let newText = $.trim(this.value)
            if (newText == '') {
                $(this).prev().text(oldText)
            } else {
                $(this).prev().text(newText)
            }    
            
            let trId = $(this).parents('tr').attr('id')
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
        let oldDate = $(this).text()
        // console.log(oldDate);
        $(this).hide()
        let dateInput = $(`<input type="date">`)
        dateInput.appendTo($(this).parent('td'))
        .blur(function() {
            let newDate = dateInput.val()
            if (newDate == '') {
                $(this).prev().text(oldDate)
                newDate = oldDate
            } else {
                $(this).prev().text(newDate)
            }  

            let trId = $(this).parents('tr').attr('id')
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
        let trId = $(this).parents('tr').attr('id')
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
        let trId = $(this).parents('tr').attr('id')
        $.ajax({
            url: '/api/tasks/' + trId,
            type: 'GET'
        })
        .then(data => {
            $('#taskDetail').html("<b>Task: </b> " + data.taskName)
            $('#dateDetail').html("<b>Deadline: </b> " + data.deadLine)

        })
        .catch(err => {
            alert('Server error View Detail')
            console.log(err);
        })
        $('#myModal').modal()

    })
}

// Logout
$('#logoutBtn').click(function() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign('/users/login')
})

// Check completed
function CheckCompleted(){
    $('.isChecked').click(function() {
        let trId = $(this).parents('tr').attr('id')
        let isChecked = $(this).is(':checked')
        $.ajax({
            url: '/api/tasks/' + trId,
            type: 'PUT',
            data: {
                completed: isChecked
            }
        })
        .then(data=>{
            LoadAllData()
        })
        .catch(err => {
            alert('Server error Check Completed')
            console.log(err);
        })
    })
}
// Call Main function
LoadAllData()





