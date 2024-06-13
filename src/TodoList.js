import React, { useState,useEffect } from 'react';
const TodoList = () => {
    const initialTodos = JSON.parse(window.localStorage.getItem('todos') || "[]");
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos)); 
  }, [todos]);
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const updateTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: inputValue } : todo));
    setIsEditing(false);
    setInputValue('');
    setCurrentTodo(null);
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setInputValue(todo.text);
    setCurrentTodo(todo);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && currentTodo) {
      updateTodo(currentTodo.id);
    } else {
      addTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const filteredTodos = () => {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else if (filter === 'incomplete') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  };

  return (
    <div>
      <h1>To-do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update Todo' : 'Add Tasks'}</button>
      </form>
      <ul>
        {filteredTodos().map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.text}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter('')}>All Task</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
    </div>
  );
};

export default TodoList;
