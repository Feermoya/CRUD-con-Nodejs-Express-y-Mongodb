const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

//guarda el esquema y lo usa para guardar datos dentro de una collecion de mongodb
module.exports = mongoose.model('tasks',TaskSchema); //lo exporto para poder usarlo en otros archivos