console.log('TaskFlow CLI cargado...');

import {
  debugPrintTasks,
  runAllTasks,
  seedExampleTasks,
} from './scheduler.mjs';

// 1) Preparamos algunas tareas
seedExampleTasks();

// 2) Mostramos el estado interno del store (a través de la API)
debugPrintTasks();

// 3) Ejecutamos todas las tareas
runAllTasks();
