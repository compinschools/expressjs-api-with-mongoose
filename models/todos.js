const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: String,
    description: String,
    completed: Boolean

})

module.exports.Todo = mongoose.model('Todo',todoSchema,'Todo')