import { useReducer, useState } from 'react';
import TodoCard from './TodoCard';
import './todolist.scss';

// 별코딩 useReducer 클론코딩

interface Todo {
  id: number;
  text: string;
}

interface State {
  count: number;
  todos: Todo[];
}

export type Action =
  | { type: 'add-list'; payload: { text: string } }
  | { type: 'delete-list'; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add-list':
      const text = action.payload.text;
      const newList = {
        id: Date.now(),
        text,
      };
      return {
        ...state,
        count: state.count + 1,
        todos: [...state.todos, newList],
      };
    case 'delete-list':
      return {
        ...state,
        count: state.count - 1,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0,
  todos: [],
};

export default function TodoList() {
  const [text, setText] = useState('');
  const [todoList, dispatch] = useReducer(reducer, initialState);

  const date = new Date();
  console.log('뉴데이트', date);
  console.log('데이트 나우', Date.now());

  return (
    <div className='box'>
      <h2>할 일을 적어보아요</h2>
      <input
        type='text'
        placeholder='내용을 적어주세요'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button
        onClick={() => {
          dispatch({ type: 'add-list', payload: { text } });
        }}
      >
        추가하기
      </button>
      {todoList.todos.map((todo) => {
        return <TodoCard id={todo.id} text={todo.text} dispatch={dispatch} />;
      })}
    </div>
  );
}
