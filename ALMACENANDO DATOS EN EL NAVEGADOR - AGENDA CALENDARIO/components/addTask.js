import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';


export const addTask = (evento) => {                            /* La funcion addTask, recive un evento (el que genera el formulario) */  
  evento.preventDefault();

  const list = document.querySelector('[data-list]');           /* Captura la lista de tareas */
  const input = document.querySelector('[data-form-input]');    /* Captura al input donde se ingresa los datos de la tarea a realizar  */
  const calendar = document.querySelector('[data-form-date]');  /* Capturas el calendario donde se especifica la fecha y la hora */

  const value = input.value;                                    /* Es la variable, que se le asigna el valor del input donde se ingresan los datos */
  const date = calendar.value;                                  /* Es la variable, que se le asigna el dato de la fecha */
  const dateFormat = moment(date).format('DD/MM/YYYY');         
  /* Esta variable, recive como parametra la fecha ingresada por el usuario y se le indica el formato deseado que se desea guardar.
  Utiliza la biblioteca moment: para darle el formato deseado */

  if (value === '' || date === '') {  /* sai value o date esta vacio, returnara nada. */
    return;
  }

  input.value = '';
  calendar.value = '';

  const complete = false;

  const taskObj = {             /* Se genera una constante, que es un objeto donde se almacenara value, date format, etc*/
    value,
    dateFormat,
    complete,                   /* Tarea completada */
    id: uuid.v4(),              /* Identificador usando libreria uuid */
  };

  list.innerHTML = '';

  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];  
  /* En esta constante se le asigna lo almacenado en el localStorage (el almacenamiento del navegador)
   y lo devuelve en un objeto JSON, el cual por medio de "parse" lo convierte en una string. En caso que retorne null se le asigna un array vacio */

  taskList.push(taskObj); /* A la tasklist por medio de "push, se le agrega el taskObj" */
  localStorage.setItem('tasks', JSON.stringify(taskList));    /* Esto convierte task, en un objeto del tipo JSON */

  displayTasks();
};

export const createTask = ({ value, dateFormat, complete, id }) => {      
  const task = document.createElement('li');
  task.classList.add('card');

  const taskContent = document.createElement('div');

  const check = checkComplete(id);

  if (complete) {                           /* Verifica si las tareas estan completadas */
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  const titleTask = document.createElement('span'); 
  titleTask.classList.add('task');
  titleTask.innerText = value;
  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);

  task.appendChild(taskContent);
  task.appendChild(deleteIcon(id));
  return task;
};
