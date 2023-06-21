const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    completed:{
        type: Boolean,
        required: true
    },
    task_name: {
        type:String, 
        required:true
    },
    task_type: {
        type:String, 
        required:true
    },
    date: {
        type: String,
        required: true
    },
});

const TaskTable = mongoose.model(
    'TaskTable', TaskSchema
);

module.exports = TaskTable;