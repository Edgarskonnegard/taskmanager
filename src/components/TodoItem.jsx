import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, onToggle, onRemove, onToggleInProgress, onDragStart, onSelectTodo }) {
  const handleDragStart = (e) => {
    console.log('Dragging ID:', todo.id);
    e.dataTransfer.setData('text/plain', todo.id);
    onDragStart?.(todo.id);
  };

  return (
    <div className='todo-item' draggable="true" onDragStart={handleDragStart}>
        <FontAwesomeIcon className='todo-info' icon={faInfoCircle} onClick={() => onSelectTodo(todo.id)}/>
        <span className={todo.completed ? 'todo-completed' : 'todo-pending'}>{todo.name}</span>
        <FontAwesomeIcon icon={faTrash} onClick={() => onRemove(todo.id)}/>
    </div>
  )
}

export default TodoItem