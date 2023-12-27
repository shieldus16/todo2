// TodoPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = ({ onClose, date }) => {
  const [todoText, setTodoText] = useState('');
  const navigate = useNavigate();

  // 요일
  const daysOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'];
  // 월
  const monthsKorean = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // Date 객체에서 한글 요일과 월을 가져오는 함수
  const getKoreanDateInfo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfWeek = daysOfWeekKorean[date.getDay()];
    const day = date.getDate();
  
    return `${year}년 ${monthsKorean[month]} ${day}일 (${dayOfWeek})`;
  };
  
  const handleSaveTodo = () => {
    // 투두리스트 저장 로직 추가
    console.log(`Saved todo for ${date.toDateString()}: ${todoText}`);
    setTodoText('');
    onClose();
  };

  const handleGoToNextPage = () => {
    // 다음 페이지로 이동
    navigate('/todo-page');
  };

  return (
    <div className="modal-overlay">
      <div className="todo-modal">
        <h2>{getKoreanDateInfo()} To-do List</h2>
        <textarea value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <button onClick={handleSaveTodo}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TodoPage;
