import React, {useState, useEffect} from 'react'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput';
import MenuList from './MenuList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const addTodo = (todoData) => {
        const newTodo = {
            id: Date.now(),
            ...todoData,
            completed: false,
            inProgress: false
        };
        setTodos([...todos, newTodo]);
        setIsFormOpen(false);
    };
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };
    const toggleInProgress = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, inProgress: !todo.inProgress} : todo 
        ));
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const selectCategory = (category) => {
        if(category === 'All'){
            setSelectedCategory(null);

        }
        else{
            setSelectedCategory(category);
        }
    };
    const selectTodo = (id) => {
        setSelectedTodoId(id);
        setIsSelected(!isSelected);
    };
    const resetSelected = () => {
        setIsSelected(false);
        setSelectedTodoId(null);
    };

    const categories = [...new Set(todos.map(todo => todo.category).filter(Boolean))];
    const filteredTodos = selectedCategory ? todos.filter(todo => todo.category === selectedCategory) : todos ;
    const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

    const handleDrop = (e, inProgress, completed) => {
        e.preventDefault();
        const id = Number(e.dataTransfer.getData('text/plain'));
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, inProgress, completed } : todo
        ));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
  return (
    <div className='main-content'>
        <MenuList
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            categories={categories}
            onSelectedCategory={selectCategory}
            />
        <h1>Task manager</h1>
        <div className='about-todo'>
            {isSelected && (
                <div className='todo-info-div'>
                    <div className='todo-info-head'>
                        <FontAwesomeIcon className='todo-info' icon={faInfoCircle}/>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close-btn"
                            onClick={resetSelected}
                        />
                    </div>
                    <div className='todo-info-content'>
                        <p><strong>Name: </strong>{selectedTodo.name}</p>
                        <p><strong>Category: </strong>{selectedTodo.category}</p>
                        <p><strong>Description: </strong>{selectedTodo.description}</p>

                    </div>
                </div>)}
        </div>
        <div className="todos">
            <div className="todo"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, false, false)}
                >
                <div className='todo-p'><p><strong>Todo</strong></p></div>
                {filteredTodos
                .filter(todo => !todo.inProgress && !todo.completed)
                .map(todo => (
                    <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    onToggle={toggleTodo}
                    onRemove={removeTodo}
                    onToggleInProgress={toggleInProgress}
                    onSelectTodo={selectTodo}
                    />
                ))}
            </div>
            <div className="todo-in-progress"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, true, false)}
                >
                <div className='todo-p'><p><strong>In progress</strong></p></div>
                {filteredTodos.filter(todo => todo.inProgress && !todo.completed).map(todo => (
                    <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    onToggle={toggleTodo}
                    onRemove={removeTodo}
                    onToggleInProgress={toggleInProgress}
                    onSelectTodo={selectTodo}
                    />
                ))}
            </div>
            <div className="todo-done"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, false, true)}>
                <div className='todo-p'><p><strong>Done</strong></p></div>
                {filteredTodos.filter(todo => todo.completed).map(todo => (
                    <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    onToggle={toggleTodo}
                    onRemove={removeTodo}
                    onToggleInProgress={toggleInProgress}
                    onSelectTodo={selectTodo}
                    />
                ))}
            </div>
        </div>
        <div className='add-button-container'>
            <TodoInput onAddTodo={addTodo} isFormOpen={isFormOpen} toggleForm={toggleForm}/>
        </div>
            
    </div>
  )
}

export default TodoList