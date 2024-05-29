import React, { useState } from 'react';
import './index.css';

function SubTasks({ subTasks, setSubTasks, addSubTask }) {
  const updateSubTask = (index, newSubTask) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index] = newSubTask;
    setSubTasks(newSubTasks);
  };

  const removeSubTask = (index) => {
    const newSubTasks = subTasks.filter((_, i) => i !== index);
    setSubTasks(newSubTasks);
  };

  return (
    <div className="subtasks">
      {subTasks.map((subTask, index) => (
        <div key={index} className={`subtask ${subTask.completed ? 'completed' : ''}`}>
          <span onClick={() => updateSubTask(index, { ...subTask, completed: !subTask.completed })}>
            {subTask.text}
          </span>
          <div className="subtask-buttons">
            <button onClick={() => updateSubTask(index, { ...subTask, completed: !subTask.completed })}>
              Завершено
            </button>
            <button onClick={() => removeSubTask(index)}>Удалить</button>
          </div>
        </div>
      ))}
      <input
        type="text"
        placeholder="Добавить подзадачу"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            addSubTask(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

function ToDoItem({ task, updateTask, removeTask }) {
  const [showSubTasks, setShowSubTasks] = useState(false);

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const addSubTask = (subTask) => {
    updateTask({ ...task, subTasks: [...task.subTasks, { text: subTask, completed: false }] });
  };

  const updateSubTasks = (newSubTasks) => {
    updateTask({ ...task, subTasks: newSubTasks });
  };

  const updateMemo = (e) => {
    updateTask({ ...task, memo: e.target.value });
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <span onClick={toggleComplete}>{task.text}</span>
        <div className="task-buttons">
          <button onClick={toggleComplete}>Завершено</button>
          <button onClick={removeTask}>Удалить</button>
          <button onClick={() => setShowSubTasks(!showSubTasks)}>
            {showSubTasks ? 'Скрыть подзадачи' : 'Добавить подзадачи'}
          </button>
        </div>
      </div>
      <textarea
        className="memo"
        placeholder="Добавить описание"
        value={task.memo || ''}
        onChange={updateMemo}
      />
      {showSubTasks && (
        <SubTasks subTasks={task.subTasks} setSubTasks={updateSubTasks} addSubTask={addSubTask} />
      )}
    </div>
  );
}

function ToDoList({ tasks, setTasks }) {
  const updateTask = (index, newTask) => {
    const newTasks = [...tasks];
    newTasks[index] = newTask;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      {tasks.map((task, index) => (
        <ToDoItem
          key={index}
          task={task}
          updateTask={(newTask) => updateTask(index, newTask)}
          removeTask={() => removeTask(index)}
        />
      ))}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false, subTasks: [], memo: '' }]);
      setNewTask('');
    }
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Добавить задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <button onClick={addTask}>Add to Task</button>
      </div>
      <ToDoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
