const path = require('path');
const express = require('express'); //utilizo express
const app= express();// inicializo express
const morgan = require('morgan');
const mongoose = require('mongoose'); //requiero mongodb


//Conectando base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('Db connected'))   //Para saber si se conecto o no 
    .catch(err => console.log(err));


//importing routes
const indexRoutes = require('./routes/index');

//setting   para que tome el puerto
app.set('port', process.env.PORT || 4200) //Que tome el puerto del sistema operativo
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Entiende los datos que le envia un formulario html



//routes
app.use('/', indexRoutes); //Para usar el enrutador

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});