console.log('TaskStore module evaluado');

export function createTaskStore() {
  // Estado privado (no importado directamente)
  const tasks = [];
  let lastId = 0;

  function addTask({ label, run }) {
    const task = {
      id: ++lastId,
      label,
      run,
      createdAt: new Date(),
    };

    tasks.push(task);
    return task;
  }

  function getTasks() {
    // Devolvermos una copia superficial para no exponer el array real
    return [...tasks];
  }

  function clear() {
    tasks.length = 0;
    lastId = 0;
  }

  function findById(id) {
    return tasks.find((task) => task.id == id) ?? null;
  }

  return {
    addTask,
    getTasks,
    clear,
    findById,
  };
}
