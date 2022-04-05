const createError = require('http-errors');
const { ObjectId } = require('mongodb');
const {Todo} = require('./models/todos.js')

exports.index = async function (req,res) {
    Todo.find()
     .then( (todos) => res.send(todos))
}

exports.show = function(req,res,next){
    Todo.findOne({ _id: ObjectId(req.params.id)})
    .then((todoitem) => {
        if(!todoitem){
            return (next(createError("No todo with that Id")))
        }
        res.send(todoitem);
    })


}

exports.delete = function(req,res,next){

    
        Todo.deleteOne({_id: ObjectId(req.params.id)})
        .then( (result) => {
            if(result.deletedCount){
                res.send({result:true});
            }
            else {
                return(next(createError(404,"no todo with that id")))
            }
            

           
            })	

    


}

exports.update = function(req,res,next){
    if(!req.body.name){
        return (next(createError(400,"name is required")));
    }

    Todo.findOne({_id: ObjectId(req.params.id)})
    .then( (todo) => {
        if(!todo){
            return (next(createError(404,"no such id")))
        }
        todo.name = req.body.name;
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        todo.save()
            .then( () => res.send({result: true}))
    })

}


exports.create = function (req,res,next){

    if(!req.body.name){
        return (next(createError(400,"name is required")));
    }

    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        compelted: req.body.completed
    })

    todo.save()
        .then( () => res.send({result:true}))
    
	;
}