import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, onToggle, onRemove, onToggleInProgress, onDragStart }) {
  const handleDragStart = (e) => {
    console.log('Dragging ID:', todo.id);
    e.dataTransfer.setData('text/plain', todo.id);
    onDragStart?.(todo.id);
  };

  return (
    <div className='todo-item' draggable="true" onDragStart={handleDragStart}>
        <input 
        type='checkbox' 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'todo-completed' : 'todo-pending'}>{todo.name}</span>
        <FontAwesomeIcon icon={faTrash} onClick={() => onRemove(todo.id)}/>
    </div>
  )
}

export default TodoItem