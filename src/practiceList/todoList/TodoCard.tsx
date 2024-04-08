import { Dispatch } from 'react';
import { Action } from './Todolist';

interface TodoCardProps {
  id: number;
  text: string;
  dispatch: Dispatch<Action>;
}

export default function TodoCard({ id, text, dispatch }: TodoCardProps) {
  return (
    <div key={id}>
      <p>{text}</p>
      <button
        onClick={() => {
          dispatch({ type: 'delete-list', payload: { id } });
        }}
      >
        삭제하기
      </button>
    </div>
  );
}
