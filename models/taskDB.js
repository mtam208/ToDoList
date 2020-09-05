const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema
const taskSchema = new Schema({
    taskName: String,
    deadLine: Date,
    user: String
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = TaskModel

