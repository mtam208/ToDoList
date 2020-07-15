const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/nodemy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema
const taskSchema = new Schema({
    taskName: String,
    deadLine: Date
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = TaskModel

