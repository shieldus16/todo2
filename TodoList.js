// TodoList.js
import React from 'react';

const TodoList = ({ userId, todos }) => {
  return (
    <div>
      <h2>{userId}'s To-Do</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.pk}>{todo.fields.todo_content}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
