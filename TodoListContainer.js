// TodoListContainer.js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import axios from 'axios';

const TodoListContainer = () => {
  const [userTodos, setUserTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // 투두 목록 가져오기
    axios.get('http://localhost:8000/api/todo/', {
      params: {
        date: selectedDate.toISOString().split('T')[0], // 선택한 날짜 전달
      },
    })
      .then(response => {
        const todos = response.data;
        // 사용자 아이디별로 투두 목록 그룹화
        const userTodosMap = todos.reduce((acc, todo) => {
          const userId = todo.fields.user;
          if (!acc[userId]) {
            acc[userId] = [];
          }
          acc[userId].push(todo);
          return acc;
        }, {});
        // 배열로 변환하여 상태 설정
        const userTodosArray = Object.entries(userTodosMap).map(([userId, todos]) => ({
          user: userId,
          todos: todos
        }));
        setUserTodos(userTodosArray);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, [selectedDate]);

  return (
    <div>
      <h1>Todo Lists</h1>
      {userTodos.map(userTodo => (
        <TodoList key={userTodo.user} userId={userTodo.user} todos={userTodo.todos} />
      ))}
    </div>
  );
};

export default TodoListContainer;
