const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//a la ruta inicial
router.get('/', async (req, res) => { //METODO ASINCRONO
  const tasks = await Task.find();//traigo los datos desde la bd

  res.render('index', {//renderizar la vista y le paso las tareas 
    tasks
  });
});
//formulario post 
router.post('/add', async (req, res) => {   //recibo los datos del formulario
  const task = new Task(req.body);    //defino un nuevo objeto
  await task.save();//lo guardo en la bd
  res.redirect('/'); //Despues de guardar me redirecciona a la pagina de incio
});

//form Done
router.get('/done/:id', async (req,res) =>{
  const { id } = req.params;//obtengo el id
  const task = await Task.findById(id);// para buscar la tarea especifica, me devuelve una tarea
  task.status = !task.status;//se cambia al contrario
 await task.save();//metodo de la bd
 res.redirect('/');
  //console.log(task);
  //res.send('received')
});


//form edit
router.get('/edit/:id', async (req,res)=>{
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('edit', {//Renderizar otra vista
    task: task
  });
});


router.post('/edit/:id', async (req,res)=>{
  const { id } = req.params;
 await Task.update({_id: id}, req.body);//lo que tiene que buscar, lo reemplaza por el objeto que viene del front
 res.redirect('/');
});



// form delete
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;//obtengo el id
  await Task.remove({ _id: id }); // con el id que me envia el navegador
  res.redirect('/'); //Despues de borrar me redirecciona a la pagina de incio
});


module.exports = router;