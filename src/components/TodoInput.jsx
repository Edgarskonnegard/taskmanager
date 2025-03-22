import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TodoInput({ onAddTodo, isFormOpen, toggleForm}) {
    const [formData, setFormData] = useState({ name: '', category: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name.trim()) {
            onAddTodo(formData);
            setFormData({ name: '', category: '', description: '' });
        }
    };

  return (
    <div>
        {!isFormOpen && (
            <button onClick={toggleForm}>Add Todo</button>
        )}
        {isFormOpen && (
            <form className="todo-form" onSubmit={handleSubmit}>
                <div className='form-rubric'>
                    <h3>New Todo</h3>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="close-btn"
                        onClick={toggleForm}
                    />
                </div>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Todo-namn"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="category"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="description"
                />
                <button type="submit">Submit</button>
            </form>
        )}
    </div>
  )
}

export default TodoInput