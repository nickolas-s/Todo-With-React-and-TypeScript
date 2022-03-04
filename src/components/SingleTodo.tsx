/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';
import './styles.css';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [eidtTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((singleTodo) =>
        singleTodo.id === id
          ? { ...singleTodo, isDone: !singleTodo.isDone }
          : singleTodo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((singleTodo) => singleTodo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((singleTodo) =>
        singleTodo.id === id ? { ...singleTodo, todo: eidtTodo } : singleTodo
      )
    );

    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              ref={inputRef}
              className="todos__single--text"
              value={eidtTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <button
              type="button"
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) setEdit(!edit);
              }}
            >
              <AiFillEdit />
            </button>
            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="icon"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
