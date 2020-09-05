const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    password: String,
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel

